/**
 * Resource loader, dynamic load js or css.
 * copied from http://git.iallex.com/allex/clib.git/io/loader.js
 *
 * @author Allex Wang (allex.wxn@gmail.com)
 */
define(function(require, exports, module) {
    'use strict';

    var document = window.document;
    var head = document.head || document.getElementsByTagName('head')[0] || document.documentElement;
    var noop = function () {};

    function mix(r, s) {
        for (var k in s) {
            r[k] = s[k];
        }
        return r;
    }

    // simple bind shim implements
    function bind(fn, scope) {
        return fn.bind ? fn.bind(scope) : function() { return fn.apply(scope, arguments); }
    }

    /**
     * Creates and returns an HTML element with the specified name and attributes.
     * @private
     */
    function createNode(name, attrs) {
        var node = document.createElement(name), attr;
        for (attr in attrs) {
            if (attrs.hasOwnProperty(attr)) {
                node.setAttribute(attr, attrs[attr]);
            }
        }
        return node;
    }

    /**
     * Dynamically load script by the specific url string.
     *
     * @method script
     * @param {String} url The script path string.
     * @param {Function} callback (Optional) callback function.
     * @param {Object} scope (Optional) scope callback context.
     * @param {Object} options (Optional) set the script attributes map.
     */
    exports.script = function(url, fn, scope, options) {// {{{
        // fix options.
        if (typeof options === 'string') {
            options = {'charset': options};
        }
        options = mix({'async': 'true', 'src': url}, options);

        var node = createNode('script', options), callback = typeof fn === 'function' ? (scope ? bind(fn, scope) : fn) : noop;

        // Attach handlers for all browsers
        node.onload = node.onreadystatechange = function() {
            if (!node.readyState || /loaded|complete/.test(node.readyState)) {
                node.onload = node.onreadystatechange = null;
                if (head && node.parentNode) {
                    head.removeChild(node);
                }
                node = undefined;
                callback();
            }
        };

        head.insertBefore(node, head.firstChild);
    };// }}}

    /**
     * Load css file.
     * @param {String} url The css url.
     * @param {Function} callback (Optional) callback call when style loaded.
     * @param {Object} scope (Operation) context.
     */
    exports.css = function() {// {{{

        var isWebKit = /AppleWebKit\/([^\s]*)/.test(navigator.userAgent);

        function styleOnload(node, callback) {
            // for IE6-9 and Opera
            if (node.attachEvent) {
                node.attachEvent('onload', callback);
                // NOTICE:
                // 1. "onload" will be fired in IE6-9 when the file is 404, but in
                // this situation, Opera does nothing, so fallback to timeout.
                // 2. "onerror" doesn't fire in any browsers!
            }
            // polling for Firefox, Chrome, Safari
            else {
                setTimeout(function() {
                    poll(node, callback);
                }, 0); // for cache
            }
        }

        function poll(node, callback) {
            if (callback.isCalled) {
                return;
            }
            var isLoaded = false;
            if (isWebKit) {
                if (node['sheet']) {
                    isLoaded = true;
                }
            }
            // for Firefox
            else if (node['sheet']) {
                try {
                    if (node['sheet'].cssRules) {
                        isLoaded = true;
                    }
                } catch (ex) {
                    // NS_ERROR_DOM_SECURITY_ERR
                    if (ex.code === 1000 || ex.code === 18) {
                        isLoaded = true;
                    }
                }
            }

            if (isLoaded) {
                // give time to render.
                setTimeout(callback, 1);
            }
            else {
                setTimeout(function() {
                    poll(node, callback);
                }, 1);
            }
        }

        function loadStyle(url, fn, scope) {
            var node = document.createElement('link'), cb = fn;
            if (cb) {
                if (scope) {
                    cb = bind(fn, scope);
                }
                styleOnload(node, cb);
            }
            node.rel = 'stylesheet';
            node.href = url;
            head.appendChild(node); // keep order
            return node;
        }

        return loadStyle;
    }();// }}}

});
