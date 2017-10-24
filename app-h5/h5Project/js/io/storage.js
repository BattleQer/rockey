/**
 * Storage - A simple storage helper inspired by the redis api.
 *
 * @author Allex Wang <http://iallex.com>
 *
 * https://github.com/allex/storage
 * Inspired by <https://github.com/aheinze/Storage.js>
 *
 * Usage:
 *
 * ```js
 *  var Storage = require('./storage');
 *  var db = Storage.select('mydb');
 *
 *  db.set('mykey', 1);
 *  db.incr('mykey');
 *  db.get('mykey'); // 2
 *
 *  // Lists
 *  db.rpush('mylist', 'item1');
 *  db.rpush('mylist', 'item2');
 *  db.lpush('mylist', 'item3');
 *  db.get('mylist');  // ['item3', 'item1', 'item2']
 *
 *  // hashes
 *  db.hset('myhash', 'myfield', 1);
 *  db.hmset('myhash', 'myfield-1', 'value-1', 'myfield-2', 'value-2');
 *  db.hkeys('myhash'); // ['myfield', 'myfield-1', 'myfield-2']
 *  db.hvals('myhash'); // [1, 'value-1', 'value-2']
 *  db.hget('myhash', 'myfield'); // 1
 *  db.get('myhash'); // {'myfield':1, 'myfield-1':'value-1', 'myfield-2':'value-2'}
 *
 * ```
 *
 * Implemented methods
 *
 *  set, get, exists, del, type, append, incr, decr,
 *  llen, lpush, rpush, lset, lindex,
 *  hset, hget, hgetall, hexists, hkeys, hvals, hlen, hincrby, hmset, hmget
 *  store, flushdb, destroy
 *
 * Adaptars
 *
 *  memory (default)
 *  -> local - using window.localStorage
 *  -> session - using window.sessionStorage
 *  -> var memory = Storage.select('mydb'), local = Storage.select('mydb', 'local'), session = Storage.select('mydb', 'session');
 */
(function(global) {
    'use strict';

    var slice = [].slice
      , JSON = global.JSON
      , isLocalSeriliazeEnable = !!global.localStorage && !!(JSON && JSON.parse && JSON.stringify)
      , localStorage = global.localStorage || {}
      , sessionStorage = global.sessionStorage || {}
      , decodeJSON = function() { return (decodeJSON = JSON.parse).apply(JSON, arguments) }
      , encodeJSON = function() { return (encodeJSON = JSON.stringify).apply(JSON, arguments) }

    var impl = function() {
        var T = function(ctor) { this.constructor = ctor }
        return function(ctor, prototype) {
            T.prototype = prototype;
            ctor.prototype = new T(ctor);
        }
    }();

    // A task manager like cron by a daemon thread.
    // By Allex Wang <http://gist.github.com/allex/>, MIT Licensed
    var TaskDaemon = (function() {
        var _timer = null
          , _running = false
          , _list = []
          , _mapping = {}
        function process() {
            _running = true;
            var l = _list.length, i = -1, obj;
            while (++i < l) {
                obj = _list[i]
                obj.fn.call(obj.target, i);
            }
        }
        function run() {
            if (!_list.length) {
                stop();
            } else {
                process();
                _timer = setTimeout(run, 60000);
            }
        }
        function stop() {
            if (_running) {
                clearTimeout(_timer);
                _running = false;
                _timer = null;
            }
        }
        function check() {
            if (_running) return;
            run();
        }
        function add(obj, fn) {
            var id = obj.name;
            _mapping[id] = { id: id, target: obj, fn: fn }
            _list.push(_mapping[id]);
            check();
        }
        function remove(obj) {
            var l = _list.length;
            while (l--) {
                if (_list[l].target === obj) {
                    _list.splice(l, 1);
                }
            }
            delete _mapping[obj.name];
            if (!_list.length) {
                stop();
            }
        }
        return {
            add: add,
            remove: remove,
            stop: stop
        }
    }());

    function Store(name, adapter) {
        var self    = this;

        self.name    = name;
        self.adapter = adapter;
        self.data    = adapter.load(name);
        self.expires = {};

        // data cleaner daemon
        TaskDaemon.add(self, function() {
            var time = (new Date()).getTime(), expires = self.expires;
            for (var key in expires) {
                if (expires[key] < time) {
                    delete self.data[key];
                    delete expires[key];
                }
            }
        });
    }

    impl(Store, {

        store: function() {
            this.adapter.store(this.name, this.data);
        },

        toString: function() {
            return encodeJSON(this.data);
        },

        flushdb: function() {
            var self = this;

            this.data    = {};
            this.expires = {};

            setTimeout(function() { self.store(); }, 0); // async saving!?

            return true;
        },

        get: function(key, def) {
            return this.data[key] !== undefined ? this.data[key] : def;
        },

        set: function(key, value) {
            this.data[key] = value;
            this.store();
        },

        setex: function(key, seconds, value) {
            this.set(key, value);
            this.expire(key, seconds);
        },

        expire: function(key, seconds) {
           if (this.data[key]) this.expires[key] = (new Date()).getTime() + (seconds*1000);
        },

        exists: function(key) {
            var no = '__N/A__'
            return this.get(key, no) !== no;
        },

        del: function() {
            var keys    = slice.call(arguments),
                key     = null,
                removed = 0;

            for (var i=0;i<keys.length;i++) {

                key = keys[i];

                if (this.exists(key)) {
                    delete this.data[key];

                    if (this.expires[key]) {
                       delete this.expires[key];
                    }

                    removed++;
                }
            }

            this.store();

            return removed;
        },

        type: function(key) {
            key = this.get(key);

            if (typeof(key) === 'object') {
                return encodeJSON(key)[0] === '[' ? 'list':'set';
            }

            return typeof(key);
        },

        append: function(key, value) {

            value = String(value);

            var current = String(this.get(key, '')),
                newone  = current+value;

            this.set(key, newone);

            return newone.length;
        },

        incr: function(key, by) {

            by = by || 1;

            var current = Number(this.get(key, 0)),
                newone  = current+by;

            this.set(key, newone);

            return newone;
        },

        decr: function(key, by) {
            by = by || 1;
            return this.incr(key, (by * -1));
        },

        /* List methods */

        llen: function(key) {
            return this.get(key, []).length;
        },

        lpush: function(key, value) {
            var list = this.get(key, []),
                ret  = list.unshift(value);

            this.set(key, list);
            return ret;
        },

        rpush: function(key, value) {
            var list = this.get(key, []),
                ret  = list.push(value);

            this.set(key, list);
            return ret;
        },

        lset: function(key, index, value) {
            var list = this.get(key, []);

            if (index < 0) {
                index = list.length - Math.abs(index);
            }

            if (list[index]) {
                list[index] = value;
                this.set(key, list);
                return true;
            }

            return false;
        },

        lindex: function(key, index) {
            var list = this.get(key, []);

            if (index < 0) {
                index = list.length - Math.abs(index);
            }

            return list[index] ? list[index] : null;
        },

        /* Hash methods */

        hset: function(key, field, value) {
            var set = this.get(key, {});

            set[field] = value;
            this.set(key, set);
        },

        hget: function(key, field, def) {
            var set = this.get(key, {});

            return set[field] !== undefined ? set[field] : def;
        },

        hgetall: function(key) {
            return this.get(key, {});
        },

        hexists: function(key, field) {
            var set = this.get(key, {});
            return (set[field] !== undefined);
        },

        hkeys: function(key) {
            var set  = this.get(key, {}),
                keys = [],
                name = null;

            for (name in set) {
                if (set.hasOwnProperty(name)) {
                    keys.push(name);
                }
            }

            return keys;
        },

        hvals: function(key) {
            var set  = this.get(key, {}),
                vals = [],
                name = null;

            for (name in set) {
                if (set.hasOwnProperty(name)) {
                    vals.push(set[name]);
                }
            }

            return vals;
        },

        hlen: function(key) {
            return this.hkeys(key).length;
        },

        hdel: function(key) {

            if (!this.exists(key)) return 0;

            var set     = this.get(key, {}),
                field   = null,
                removed = 0,
                args    = slice.call(arguments);

            for (var i=1;i<args.length;i++) {

                field = args[i];

                if (set[field] !== undefined) {
                    delete set[field];
                    removed++;
                }
            }

            this.set(key, set);

            return removed;
        },

        hincrby: function(key, field, by) {
            by = by || 1;
            var current = Number(this.hget(key, field, 0)),
                newone  = current+by;

            this.hset(key, field, newone);

            return newone;
        },

        hmget: function(key) {
            var set     = this.get(key, {}),
                field   = null,
                values  = [],
                args    = slice.call(arguments);

            for (var i=1;i<args.length;i++) {
                field = args[i];
                values.push(set[field] !== undefined ? set[field]:null);
            }

            return values;
        },

        hmset: function(key) {
            var set     = this.get(key, {}),
                field   = null,
                value   = null,
                args    = slice.call(arguments);

            for (var i=1;i<args.length;i++) {
                field = args[i];
                value = args[(i + 1)] ? args[(i + 1)]:null;
                set[field] = value;
                i = i + 1;
            }

            this.set(key, set);
        },

        destroy: function() {
            TaskDaemon.remove(this);
            this.adapter = null;
            this.data = null;
            this.expires = null;
        }

    });

    var Storage = {

        /**
         * Get a store instance by a specific storage name, The identity name must be unique.
         *
         * @param {String} name The store identity name.
         * @param {String} adapter (Optional) set the storage adapter name, can be `memory`, `local`, `session`
         */
        select: (function() {
            // by Allex Wang
            // Avoid installation the same db instance duplicates
            var cache = {}
            return function(name, adapter) {
                adapter = adapter || 'memory';
                var id = name + '$' + adapter, adapters = this.adapters;
                return cache[id] || ( cache[id] = new Store(name, adapters[adapter] || adapters['memory']) );
            };
        })(),

        adapters: {
            'memory': (function() {
                var dbs = {};
                return {
                    load: function(name) { return dbs[name] || {}; },
                    store: function(name, data) { dbs[name] = data; }
                }
            })(),
            'local': isLocalSeriliazeEnable && {
                load: function(name) {
                    return localStorage['storage/' + name] ? decodeJSON(localStorage['storage/' + name]) : {};
                },
                store: function(name, data) {
                    localStorage['storage/' + name] = encodeJSON(data);
                }
            },
            'session': isLocalSeriliazeEnable && {
                load: function(name) {
                    return sessionStorage['storage/' + name] ? decodeJSON(sessionStorage['storage/' + name]) : {};
                },
                store: function(name, data) {
                    sessionStorage['storage/' + name] = encodeJSON(data);
                }
            }
        }

    };

    // AMD support
    if (typeof define === 'function' && define.amd) {
        define(function () { return Storage; });
    // CommonJS and Node.js module support.
    } else if (typeof exports !== 'undefined') {
        // Support Node.js specific `module.exports` (which can be a function)
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = Storage;
        }
        // But always support CommonJS module 1.1.1 spec (`exports` cannot be a function)
        exports.Storage = Storage;
    } else {
        global.Storage = Storage;
    }

})(this);
