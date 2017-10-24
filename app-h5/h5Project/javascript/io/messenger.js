/**
 * Messenger v1.0.2, a common cross-document communicate two-way solution.
 * @author Allex Wang (allex.wxn@gmail.com)
 *
 * GistID: 0afcce95a794fdd589f3
 * GistURL: https://gist.github.com/allex/0afcce95a794fdd589f3
 *
 * Usage:
 *
 *  ```js
 *  var Messenger = requie('lib/core/1.0.0/io/messenger');
 *  
 *  // client.js
 *  var messageChannel = new Messenger('channel/test');
 *  messageChannel.on('startProgram', function(response) {
 *    console.log('Program starting ... ', response.data);
 *  });
 *
 *  // server.js
 *  var messageChannel = new Messenger('channel/test')
 *
 *  // add target window, is the client page window object
 *  .addTarget(clientWindow)
 *
 *  // send broadcast
 *  .sendMessage('startProgram', { data: 'Message come from server page.' });
 *
 *  ```
 */
(function( root, name, factory ) {
  if ( typeof define === 'function' && define.amd ) {
    define( factory );
  } else {
    // Browser globals (root is window)
    root[name] = factory();
  }
}(this, 'Messenger', function() {
  'use strict';

  var win = window, document = win.document, navigator = win.navigator;
  var hasOwn = Object.prototype.hasOwnProperty;
  var supportPostMessage = 'postMessage' in win, w3cEvent = 'addEventListener' in document;
  var JSON = win.JSON || 0;

  var EVENT_MESSAGE_CALL = '__mc__';
  var jsonBoundary = '<__\u0003JSON\u0003__>';

  var isPlainObject = function(obj) {
    var key;
    if (!obj || typeof obj !== 'object' || obj.nodeType || obj.window === obj) {
      return false;
    }
    try {
      if (obj.constructor && !hasOwn.call(obj, 'constructor') && !hasOwn.call(obj.constructor.prototype, 'isPrototypeOf')) {
        return false;
      }
    } catch (e) {
      return false;
    }
    for (key in obj) {}
    return key === undefined || hasOwn.call(obj, key);
  };

  // Serializes a simple object to a JSON formatted string.
  var jsonEncode = JSON.stringify || function stringify(obj) {
    var t = typeof obj;
    if (t !== 'object' || obj === null) {
      // simple data type
      if (t === 'string') obj = '"' + obj + '"';

      return String(obj);
    } else {
      // recurse array or object
      var n, v, json = [], arr = (obj && obj.constructor == Array);

      for (n in obj) {
        v = obj[n];
        t = typeof v;
        if (obj.hasOwnProperty(n)) {
          if (t === 'string') {
            v = '"' + v + '"';
          } else if (t === 'object' && v !== null){
            v = stringify(v);
          }

          json.push((arr ? '' : '"' + n + '":') + String(v));
        }
      }

      return (arr ? '[' : '{') + String(json) + (arr ? ']' : '}');
    }
  };

  var jsonDecode = JSON.parse || function(s) {
    return (0, win.eval)('(' + s + ')');
  };

  // bind implements
  var bind = function(fn, scope) {
    if (fn.bind) return fn.bind(scope);
    else {
      return function() { fn.apply(scope, arguments); }
    }
  };

  var extend = function(r, s) {
    for (var k in s) {
      if (s.hasOwnProperty(k)) r[k] = s[k];
    }
    return r;
  };

  // Internal constructor for Messenger target model.
  function Target(channelId, target) {
    var errMsg = '';
    if (arguments.length < 2) {
      errMsg = 'target and channelId are both requied';
    } else if (typeof target !== 'object') {
      errMsg = 'target must be window object';
    } else if (typeof channelId !== 'string') {
      errMsg = 'target channelId must be string type';
    }
    if (errMsg) {
      throw 'TargetError: ' + errMsg;
    }
    this._channelId = channelId;
    this.target = target;
  }

  // Post message to current targe
  Target.prototype.send = supportPostMessage ?
    function(msg) {
      this.target.postMessage(this._channelId + msg, '*');
    } :
    // for IE 6/7
    function(msg) {
      var channelId = this._channelId, targetFunc = navigator[channelId];
      if (typeof targetFunc === 'function') {
        try {
          targetFunc(channelId + msg, win);
        } catch (e) {}
      } else {
        throw 'Target (channel="' + channelId + '") callback function is not defined';
      }
    };

  // Channel pools
  var _channelPool = {};

  /**
   * Messenger constructor for safely enables cross-origin communication.
   * @constructor Messenger
   */
  function Messenger(channelId) {
    if (arguments.length > 1) { // Adaptor v1.0.1 with constructor params (name, channelId)
      channelId = arguments[1];
    }

    var channelId = channelId || '$';
    if (_channelPool[channelId]) {
      throw 'DuplicateError: a channel with id "' + channelId + '" is already exists.'
    }
    _channelPool[channelId] = 1;

    this._attached = false;
    this._targets = [];
    this.handleMessage = bind(this.handleMessage, this);
    this._channelId = channelId;
    this._listeners = {};
  }

  extend(Messenger.prototype, {
    // message seed
    _mId: 0,

    /**
     * Setup cross messager event listener.
     */
    _initMessenger: function() {
      var self = this, handleMessage;
      if (self._attached) {
        return;
      }
      self._attached = true;
      handleMessage = self.handleMessage;
      if (supportPostMessage) {
        if (w3cEvent) {
          win.addEventListener('message', handleMessage, false);
        } else {
          win.attachEvent('onmessage', handleMessage);
        }
      } else {
        navigator[self._channelId] = handleMessage; // for IE 6/7
      }
    },

    /**
     * Add a message target object, actually is a window object.    *
     *
     * @method addTarget
     *
     * @param {Window} target A window object to attaches.
     */
    addTarget: function(target) {
      var targets = this._targets, l = targets.length;
      while (l--) {
        if (targets[l][0] === target) return this;
      }
      targets.push([target, new Target(this._channelId, target)]);
      return this
    },

    /**
     * Remove a specific target from current messenger clients.
     *
     * @param {Window|String} target The target to remove.
     */
    removeTarget: function(target) {
      var targets = this._targets, l = targets.length;
      while (l--) {
        if (targets[l][0] === target)
          targets.splice(l, 1);
      }
      return this
    },

    /**
     * Handle the channel message sent by CROSS messenger.
     *
     * @method handleMessage
     */
    handleMessage: function(e) {
      var self = this;
      if (!e) return;

      var message = e, type, msgObj, target, source, evtObj, channelId = this._channelId;
      if (typeof e === 'object') {
        message = e.data;
      }
      if (message.indexOf(channelId) !== 0) {
        return;
      }

      message = message.substring(channelId.length); // Unpack the message packets
      if (message.indexOf(jsonBoundary) === 0) {
        try {
          msgObj = jsonDecode(message.substring(jsonBoundary.length));
        } catch (e) {
          setTimeout(function() { console.error(e, message); }, 1);
        }
      } else {
        msgObj = {type: '*', data: message};
      }

      if (type = (msgObj && msgObj.type)) {
        source = e.source;
        evtObj = {
          target: e.target,
          source: source,
          send: function(args) {
            self.addTarget(source);
            self.send(EVENT_MESSAGE_CALL + channelId + '_' + msgObj.mId, args);
            self.removeTarget(source);
          }
        };
        self.emit(type, msgObj.data, evtObj);
      }
    },

    /**
     * Register a generic message listener, actually listen to `*` event.
     *
     * @method listen
     */
    listen: function(type, fn) {
      if (fn === undefined) {
        fn = type;
        type = '*';
      }
      this.on(type, fn);
      return this
    },

    /**
     * Detach all message listeners
     *
     * @method clear
     */
    clear: function() {
      this._listeners = {};
      return this
    },

    /**
     * Send a cross message, optional with message callback.
     *
     * @method sendMessage
     * @param {String} type The specific message type.
     * @param {Mixed} data The message data to send with.
     * @param {Fuction} callback (Optional) callback to be called when the event
     * handler dispatched.
     */
    sendMessage: function(type, data, callback) {
      if (typeof data === 'function') {
        callback = data;
        data = undefined;
      }
      if (typeof data === 'object' && !isPlainObject(data)) {
        throw 'The CORSS message data not a valid plain object.';
      }

      var mId = ++this._mId, channelId = this._channelId;
      var targets = this._targets, msgObj = {type: type, data: data, mId: mId};

      if (typeof callback === 'function') {
        this.on(EVENT_MESSAGE_CALL + channelId + '_' + mId, function(data) {
          callback({type: type, data: data, mId: mId});
        });
      }

      data = jsonBoundary + jsonEncode(msgObj);
      var l = targets.length;
      while (l--) targets[l][1].send(data);

      return this
    },

    /**
     * Alias sendMessage, supports generic message w/o message type.
     *
     * @method send
     */
    send: function(type, data, callback) {
      if (data === undefined) { // generic message w/o message types
        data = type;
        type = '*';
      }
      return this.sendMessage(type, data, callback);
    },

    /**
     * Registers event listeners. Will probably rip this out and use YUI custom
     * events at some point. For now, it's good enough.
     *
     * @method on
     */
    on: function(type, fn) {
      this._initMessenger();

      if (!this._listeners[type]) {
        this._listeners[type] = [];
      }

      if (typeof fn === 'function') {
        this._listeners[type].push(fn);
      }

      return this;
    },

    /**
     * Trigger the specific message with optional data.
     *
     * @method emit
     */
    emit: function(type) {
      var listeners = this._listeners[type];
      if (listeners) {
        for (var n = 0, len = listeners.length, args = Array.prototype.slice.call(arguments, 1); n < len; n++) {
          listeners[n].apply(this, args);
        }
      }
      return this
    },

    /**
     * Api for destroy the messenger instance.
     */
    destroy: function() {
      if (supportPostMessage) {
        var handleMessage = this.handleMessage;
        if (w3cEvent) {
          win.removeEventListener('message', handleMessage);
        } else {
          win.detachEvent('onmessage', handleMessage);
        }
      } else {
        delete navigator[this._channelId];
      }
      this.clear();
      this._targets.length = 0;
      delete _channelPool[this._channelId];
    }

  });

  return Messenger;
}));

//  vim: set fdm=marker ts=2 sw=2 sts=2 tw=85 et :
