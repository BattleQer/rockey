/**
 * Http request utility interface, ajax, post, get, jsonp.
 *
 * Support custom events for application-level extensions.
 * Events: [ request, error ]
 *
 * <pre><code>
 *  var io = require('lib/core/1.0.0/io/request');
 *
 *  // Add global listener for app-level tracer event handle.
 *  io.on('error', function(err, res) {
 *    console.log('Err: ', err, res);
 *  });
 *
 *  // Send post request with optional params { foo: 1 }
 *  io.post('path/api/foo.php', {foo: 1}, function(res) {
 *    // handle response
 *  });
 *
 * </code></pre>
 *
 * @module core/io/request
 * @author Allex Wang (allex.wxn@gmail.com)
 */
define(function(require, exports, module) {
    'use strict';

    var $ = require('jquery');
    var util = require('../utils/util');
    var EventEmitter = require('../event/emitter');

    var setImmediate = util.setImmediate;
    var noop = util.noop;
    var extend = util.extend;
    var trim = $.trim;
    var parseJSON = $.parseJSON;

    var bindTry = function(fn, scope, onError) {
        return function(a1, a2) {
            try {
                return fn.apply(scope, arguments);
            } catch (e) { onError && onError(e, a1, a2); }
        }
    };

    var notify = function(type) {
        return exports.emit.apply(exports, arguments)
    };

    // Implements custom events interface
    EventEmitter.applyTo(exports);

    // Send request by parallel count limited with a queue FIFO.
    // @param {ClientRequest} client The client request instance
    // @param {Object} options The request parameter object
    var sendRequest = function() {
        var MAX_PARALLEL_COUNT = 5 // The max parallel size of network request
          , currentCount = 0
          , queue = []
        var next = function() {
            setImmediate(function() {
                --currentCount;
                process();
            });
        }
        var process = function() {
            if (queue.length > 0 && currentCount < MAX_PARALLEL_COUNT) {
                var reqObj = queue.shift(), client = reqObj[0], options = reqObj[1];
                ++currentCount;
                client.always( next );
                $.ajax(options);
            }
        }
        return function( client, conf ) {
            queue.push([client, conf]);
            process();
        }
    }();

    // ClientRequest {{{
    /**
     * Internal constructor for Ajax request management.
     *
     * @extend EventEmitter
     */
    var ClientRequest = function(options) {
        EventEmitter.applyTo(this);
        var defaluts = {
            url: '',
            type: 'GET',
            data: {},
            dataType: 'json',
            timeout: 30 * 1000,
            cache: false
        };
        options = extend(defaluts, options);
        delete options.error;
        delete options.success;
        this._opts = options;
    };
    extend(ClientRequest.prototype, {
        send: function() {
            var self = this
              , originOption = this._opts
              , options = extend({}, originOption)
              , jsonp = options.dataType === 'jsonp';

            // FIXED: jquery should allow cross domain when use jsonp request.
            if (jsonp) {
                options.crossDomain = true;
            }

            options.complete = function(xhr, status) {
                var response
                  , statusCode = +xhr.status
                  , result = xhr.responseJSON
                  , unknownErr = { error: '1',
                                   msg: 'Request error (status: ' + (status || statusCode) + ')' }
                  // TODO: We need to strict the response. Normally jQuery.ajax()
                  //    will throw a status "parsererror" if api response empty or
                  //    malformed response.  eg. (status !== 'parsererror')
                  , isSuccess = (statusCode === 200 || status === 'success')

                if (!jsonp && !result) {
                    result = trim(xhr.responseText);
                    if (result && result.charAt(0) !== '<') { // html
                        try {
                            result = parseJSON(result);
                        } catch (e) {}
                    }
                }

                if (!isSuccess) {
                    result = result || unknownErr;
                }

                response = {
                    data: result,
                    xhr: xhr,
                    origin: originOption,
                    status: statusCode || status
                };

                if (isSuccess) {
                    self.emit('response', null, response);
                } else {
                    self.emit('error', result, response);
                }

                self.emit('end', response);
                self.destroy();
            };

            sendRequest(self, options);

            return self;
        },
        always: function(callback) {
            if (typeof callback === 'function') {
                this.on('end', callback);
            }
            return this;
        },
        destroy: function() {
            this.un();
            this._opts = null;
        }
    });
    // }}}

    // Register a default locker style handler.
    exports.on('request', function(request, sender) {
        sender = sender && $(sender);
        if (sender) {
            var lockerClass = 'disabled';
            sender.addClass(lockerClass).prop('disabled', true);
            request.once('end', function() {
                sender.removeClass(lockerClass).prop('disabled', false);
                sender = null;
            });
        }
    });

    /**
     * A simple jQuery ajax abstract for application extends.
     * For more details info please see <http://api.jquery.com/jquery.ajax/>
     *
     * @param {String} url A string containing the URL to which the request is sent.
     * @param {Object} options A set of key/value pairs that configure the Ajax request.
     *                         All settings are optional.
     * @param {HTMLElement|jQuery} sender jQuery instance or a valid DOM reference.
     */
    exports.ajax = function( url, options, sender ) {
        // shift arguments if url was omitted
        if (typeof url === 'object') {
            sender = options;
            options = url;
            url = undefined;
        }

        options = options || {};

        if (url) options.url = url;

        var request = new ClientRequest(options),
            handleRunnerError = function(e, data) {
                var stack = e.stack && e.stack.split('\n').slice(0, 2).join('\n') || e;
                // extends runtime error with ajax meta info.
                var ex = {stack: stack,
                          origin: options,
                          response: data };
                notify('error', ex, data);
                setImmediate(function() { console.log('%c ' + stack, 'color:#ae0000') }, 1)
            },
            error = bindTry(options.error || noop, null, handleRunnerError),
            success = bindTry(options.success || noop, null, handleRunnerError);

        // Trigger global `request` event, which can do for some pre-request filter.
        if (notify('request', request, sender) === false) {
            return;
        }

        // Toggle sender loading text additonally
        if (sender && (sender = $(sender))) {
            var tmp, lockerText, lockerAttr = 'data-async-lock';

            // break requests if locked
            if (+sender.attr(lockerAttr) === 1)
                return;

            if (lockerText = sender.attr('data-async-text')) {
                tmp = sender.html();
                sender.html(lockerText);
            }

            sender.attr(lockerAttr, 1);
            request.once('response error', function() {
                if (sender) {
                    sender.attr(lockerAttr, 0);
                    if (lockerText)
                        sender.html(tmp);
                    sender = null;
                }
            });
        }

        request.on('error', function(err, res) {
            var ex = {
                code: err.error,
                message: err.msg,
                status: res.status,
                origin: res.origin,
                response: res.data
            };
            // Additonally suspend calling the error callbacks if global error
            // interceptor returns `FALSE`.
            if (notify('error', ex, res) !== false) error(err);
        });

        request.on('response', function(err, res) {
            res = res.data;
            // Suspend the response callbacks if global interceptor returns 'FALSE'
            if (notify('response', res) === false) {
                return;
            }
            if (err) {
                error(err);
                return;
            }
            if ( !res || +(res.error || 0) !== 0 ) {
                error(res);
            } else {
                success(res);
            }
        });

        return request.send();
    };

    $.each([ 'get', 'post', 'jsonp' ], function(i, method) {
        exports[ method ] = function( url, data, callback, error, sender ) {

            // shift arguments if data argument was omitted
            if (typeof data === 'function') {
                sender = sender || error;
                error = callback;
                callback = data;
                data = undefined;
            }

            if (error && typeof error !== 'function') {
                sender = error;
                error = undefined;
            }

            var options = {
                data: data,
                success: callback,
                error: error || callback // Defaluts same with success callback
            };

            if (typeof url === 'string') {
                options.url = url;
            } else {
                // #.jsonp({url: 'foo/path', timeout: 1000}, ... );
                extend(options, url);
            }

            var type = method;
            if (method === 'jsonp') {
                type = 'get';
                options.dataType = 'jsonp';
            }
            options.type = type;

            return exports.ajax(options, sender);
        };
    });

});
