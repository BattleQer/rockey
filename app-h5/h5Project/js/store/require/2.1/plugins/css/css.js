/*
 * RequireJS css! loader plugin v0.0.1
 *
 * @author Allex Wang (allex.wxn@gmail.com)
 * MIT
 *
 * Usage: require(['css!./style.css']);
 *
 * Tested and working in (up to latest versions as of March 2013):
 * Android
 * iOS 6
 * IE 6 - 10
 * Chome 3 - 26
 * Firefox 3.5 - 19
 * Opera 10 - 12
 *
 * browserling.com used for virtual testing environment
 */

define(['module'], function(module) {
  'use strict';

  var cssAPI, fs, Cc, Ci, xpcIsWindows
    , masterConfig = (module.config && module.config()) || {}
    , hasLocation = typeof location !== 'undefined' && location.href
    , $config

  /**
   * Parses a resource name into its component parts. Resource names
   * look like: module/name.ext!strip, where the !strip part is
   * optional.
   * @param {String} name the resource name
   * @returns {Object} with properties "name", "ext" and "strip"
   * where strip is a boolean.
   */
  function parseName(name) {
    var modName, ext, temp,
        strip = false,
        index = name.lastIndexOf("."),
        isRelative = name.indexOf('./') === 0 ||
                     name.indexOf('../') === 0;

    if (index !== -1 && (!isRelative || index > 1)) {
      modName = name.substring(0, index);
      ext = name.substring(index + 1);
    } else {
      modName = name;
    }

    temp = ext || modName;
    index = temp.indexOf("!");
    if (index !== -1) {
      //Pull off the strip arg.
      strip = temp.substring(index + 1) === "strip";
      temp = temp.substring(0, index);
      if (ext) {
        ext = temp;
      } else {
        modName = temp;
      }
    }

    return {
        name: modName,
        ext: ext,
        strip: strip
    };
  }

  //>>excludeStart('excludeOnSave', pragmas.excludeOnSave)

  //when adding to the link buffer, paths are normalised to the baseUrl
  //when removing from the link buffer, paths are normalised to the output file path
  function escape(content) {
    return content.replace(/(["'\\])/g, '\\$1')
      .replace(/[\f]/g, "\\f")
      .replace(/[\b]/g, "\\b")
      .replace(/[\n]/g, "\\n")
      .replace(/[\t]/g, "\\t")
      .replace(/[\r]/g, "\\r")
      .replace(/[\u2028]/g, "\\u2028")
      .replace(/[\u2029]/g, "\\u2029");
  }

  function compress(css) {
    return css;
  }

  var writeCSSFn= "function(c){var d=document,a='appendChild',i='styleSheet',s=d.createElement('style');s.type='text/css';d.getElementsByTagName('head')[0][a](s);s[i]?s[i].cssText=c:s[a](d.createTextNode(c));return s}";

  // Write Css module definition
  var writeCSSDefinition = "define('__writecss', function(){return " + writeCSSFn + "});";

  var cssBuffer = {};
  var layerBuffer = [];
  var writeCSSForLayer = true;

  var saveFile = function() {};

  //>>excludeEnd('excludeOnSave')

  cssAPI = {

    finishLoad: function (name, content, onLoad) {
      if (masterConfig.isBuild) {
        cssBuffer[name] = content;
      }
      onLoad(content);
    }

    , load: function(name, req, onLoad, config) {
      // store to internal config
      $config = $config || config;

      // Do not bother with the work if a build and text will
      // not be inlined.
      if (config && config.isBuild && !config.inlineText) {
        onLoad();
        return;
      }

      masterConfig.isBuild = config && config.isBuild;

      var parsed = parseName(name),
          nonStripName = parsed.name +
              (parsed.ext ? '.' + parsed.ext : ''),
          url = req.toUrl(nonStripName);

      // Do not load if it is an empty: url
      if (url.indexOf('empty:') === 0) {
        onLoad();
        return;
      }

      cssAPI.get(url, function (content) {
        cssAPI.finishLoad(name, content, onLoad);
      }, function (err) {
        if (onLoad.error) {
          onLoad.error(err);
        }
      });
    }

    //>>excludeStart('excludeOnSave', pragmas.excludeOnSave)
    , write: function (pluginName, moduleName, write, config) {
      config = config || $config;

      var cssModule, content = cssBuffer[moduleName];
      if (!content)
        return;

      layerBuffer.push(content);

      if (config.buildCSS !== false) {
        if (config.writeCSSModule && content) {
          if (writeCSSForLayer) {
            writeCSSForLayer = false;
            write(writeCSSDefinition);
          }
          cssModule = 'define(["__writecss"],function(out){return out("'+ escape(compress(content)) +'");})';
        }
        else {
          cssModule = 'define(function(){})';
        }
        write.asModule(pluginName + '!' + moduleName, cssModule);
      }
    }
    , writeFile: function (pluginName, moduleName, req, write, config) {
      var parsed = parseName(moduleName),
          extPart = parsed.ext ? '.' + parsed.ext : '',
          nonStripName = parsed.name + extPart,
          //Use a '.js' file name so that it indicates it is a
          //script that can be loaded across domains.
          fileName = req.toUrl(parsed.name + extPart) + '.js';

      //Leverage own load() method to load plugin value, but only
      //write out values that do not have the strip argument,
      //to avoid any potential issues with ! in file names.
      cssAPI.load(nonStripName, req, function (value) {
        //Use own write() method to construct full module value.
        //But need to create shell that translates writeFile's
        //write() to the right interface.
        var textWrite = function (contents) {
          return write(fileName, contents);
        };
        textWrite.asModule = function (moduleName, contents) {
          return write.asModule(moduleName, fileName, contents);
        };

        cssAPI.write(pluginName, nonStripName, textWrite, config);
      }, config);
    }
    , onLayerEnd: function(write, data) {
      var config = $config, styles;
      if (config.buildCSS !== false && !config.writeCSSModule) {
        styles = config.IESelectorLimit ? layerBuffer : [layerBuffer.join('')];
        for (var i = 0; i < styles.length; i++) {
          if (styles[i])
            write(
              "(" + writeCSSFn + "('" + escape(compress(styles[i])) + "'));\n"
            );
        }
      }
      //clear layer buffer for next layer
      layerBuffer = [];
      writeCSSForLayer = true;
    }
    //>>excludeEnd('excludeOnSave')

  }

  // cssAPI.get(url, callback, errback) {{{

  if (hasLocation) {
    var document = window.document
      , head = document.getElementsByTagName('head')[0]
      , engine = window.navigator.userAgent.match(/Trident\/([^ ;]*)|AppleWebKit\/([^ ;]*)|Opera\/([^ ;]*)|rv\:([^ ;]*)(.*?)Gecko\/([^ ;]*)|MSIE\s([^ ;]*)|AndroidWebKit\/([^ ;]*)/) || 0

      // use <style> @import load method (IE < 9, Firefox < 18)
      , useImportLoad = false
        // set to false for explicit <link> load checking when onload doesn't work perfectly (webkit)
      , useOnload = true

    // trident / msie
    if (engine[1] || engine[7])
      useImportLoad = parseInt(engine[1]) < 6 || parseInt(engine[7]) <= 9;
    // webkit
    else if (engine[2] || engine[8])
      useOnload = false;
    // gecko
    else if (engine[4])
      useImportLoad = parseInt(engine[4]) < 18;

    var ieCnt = 0, ieLoads = [], ieCurCallback, curStyle, curSheet;

    // <style> @import load method
    var createStyle = function () {
      curStyle = document.createElement('style');
      head.appendChild(curStyle);
      curSheet = curStyle.styleSheet || curStyle.sheet;
    };
    var createIeLoad = function(url) {
      curSheet.addImport(url);
      curStyle.onload = function(){ processIeLoad() };

      ieCnt++;
      if (ieCnt == 31) {
        createStyle();
        ieCnt = 0;
      }
    };
    var processIeLoad = function() {
      ieCurCallback();

      var nextLoad = ieLoads.shift();

      if (!nextLoad) {
        ieCurCallback = null;
        return;
      }

      ieCurCallback = nextLoad[1];
      createIeLoad(nextLoad[0]);
    };
    var importLoad = function(url, callback) {
      if (!curSheet || !curSheet.addImport)
        createStyle();

      if (curSheet && curSheet.addImport) {
        // old IE
        if (ieCurCallback) {
          ieLoads.push([url, callback]);
        }
        else {
          createIeLoad(url);
          ieCurCallback = callback;
        }
      }
      else {
        // old Firefox
        curStyle.textContent = '@import "' + url + '";';

        var loadInterval = setInterval(function() {
          try {
            curStyle.sheet.cssRules;
            clearInterval(loadInterval);
            callback();
          } catch(e) {}
        }, 10);
      }
    };
    // <link> load method
    var linkLoad = function(url, callback) {
      var link = document.createElement('link');
      link.type = 'text/css';
      link.rel = 'stylesheet';
      if (useOnload)
        link.onload = function() {
          link.onload = function() {};
          // for style dimensions queries, a short delay can still be necessary
          setTimeout(callback, 7);
        }
      else
        var loadInterval = setInterval(function() {
          for (var i = 0, styleSheets = document.styleSheets; i < styleSheets.length; i++) {
            var sheet = document.styleSheets[i];
            if (sheet.href == link.href) {
              clearInterval(loadInterval);
              return callback();
            }
          }
        }, 10);
      link.href = url;
      head.appendChild(link);
    };

    cssAPI.get = function(url, callback, errback) {
      (useImportLoad ? importLoad : linkLoad)(url, callback);
    };
  }

  //>>excludeStart('excludeOnSave', pragmas.excludeOnSave)
  if (masterConfig.env === 'node' || (!masterConfig.env &&
        typeof process !== "undefined" &&
        process.versions &&
        !!process.versions.node &&
        !process.versions['node-webkit'] &&
        !process.versions['atom-shell'])) {

    // Using special require.nodeRequire, something added by r.js.
    fs = require.nodeRequire('fs');

    saveFile = function(path, data) {
      fs.writeFileSync(path, data, 'utf8');
    }

    cssAPI.get = function (url, callback, errback) {
      try {
        var file = fs.readFileSync(url, 'utf8');
        //Remove BOM (Byte Mark Order) from utf8 files if it is there.
        if (file[0] === '\uFEFF') {
          file = file.substring(1);
        }
        callback(file);
      } catch (e) {
        errback && errback(e);
      }
    };

  } else if (masterConfig.env === 'rhino' || (!masterConfig.env &&
        typeof Packages !== 'undefined' && typeof java !== 'undefined')) {
    throw new Error('Not implement yet.')
  }
  //>>excludeEnd('excludeOnSave')

  // }}}

  return cssAPI;
});
