/**
 * Pagelet loader utility for load page components separately, support page staff
 * content caches.
 *
 * TODO: Implements the common promise specification APIs
 *
 * @author Allex Wang (allex.wxn@gmail.com)
 */
define(function(require, exports, module) {
    'use strict';

    var io = require('./request');
    var util = require('../utils/util');
    var Storage = require('./storage');

    var setImmediate = util.setImmediate;
    var noop = util.noop;
    var extend = util.extend;

    var version = 'v1.0.1';
    var pageletDB = Storage.select('__pl__' + version, 'local');

    function loadViewData(url, success, error) {
        console.log(url);
        return io.jsonp(url, function(res) {
            console.log(res)
            var html = typeof res === 'object' ? (res.data || 0).html : res;
            success(html, res);
        }, error)
    }

    function renderView(view, html) {
        view.html(html)
    }

    function loadView(view, options) {
        options = options || {}
        view = $(view)
        console.log("view")
        var url = options.url
          , checksum = String(options.rev || '') // checksum for cache expires check
          , jsList = options.js
          , cssList = options.css
          , cache = options.cache
          , html = options.html
          , loadingClass = options.loadingClass
          , onLoad = options.load || noop // view load, onLoad(html)
          , onError = options.error || noop // load error
          , onComplete = options.complete || noop // page view rendered.

        if (!view.length)
            throw 'Load view by pipe error. view is undefined'

        if (!url && !html)
            throw 'Error: The pagelet settings not valid. both pagelet url ' +
                'and html unavailable.'

        if (loadingClass) {
            view.addClass(loadingClass)
        }

        // Retrieve pagelet data from endpoint.
        var onEnd = function() {
            if (loadingClass) {
                view.removeClass(loadingClass);
            }
            onComplete();
            onEnd = null;
            onLoad = null;
            onError = null;
            onComplete = null;
        }

        var data = cache && pageletDB.get(url);
        console.log(data);
        if (data && data.checksum === checksum) {
            // cache
            html = data.html;
            setImmediate(function() {
                renderView(view, html);
                onLoad(html);
                onEnd();
            })
        } else {
            // online
            console.log("loadViewData")
            loadViewData(url,
                function(html, res) {
                    if (cache) {
                        setImmediate(function() {
                            pageletDB.set(url, { checksum: checksum, html: html });
                        });
                    }
                    renderView(view, html);
                    onLoad(html);
                },
                function(res) { onError(res) }
            ).always(onEnd)
        }
    }

    /**
     * Pipe pagelet with options by DOM attribute data-pl-*
     *
     * @example
     *
     * ```html
     *  <div id="pl-xxx"
     *   data-pl-url="./pl.php?d=2"
     *   data-pl-rev="100000"
     *   data-pl-cache="true"
     *  ></div>
     * ```
     */
    function pipe(elem, options) {
        var $elem = $(elem), options = extend({
            url: $elem.attr('data-pl-url'),
            rev: $elem.attr('data-pl-rev'),
            cache: !!$elem.attr('data-pl-cache')
        }, options);
        return loadView($elem, options);
    }

    module.exports = {
        view: loadView,
        pipe: pipe
    }
});
