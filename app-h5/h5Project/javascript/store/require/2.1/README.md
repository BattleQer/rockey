## Docs

### AMD Definiation and Usage

`$ cat path/foo.js`

```js
define(function(require, exports, module) {
  'use strict';

});

// require(['path/foo'], function() {});
```

### AMD Plugins

* CSS

```js
var css = require('css!path/foo.css');
```

* Text

```js
var strHtml = require('text!path/foo.html');
console.log(strHtml);
```

For text `CROSSable` in A+ browsers, please configure `app.js` with `useXhr` manually:

```js
require.config({
  ...

  config: {
    text: {
      useXhr: true
    }
  },

  ...
});
```

And make sure configured webserver with http request header contains:

```text
Access-Control-Allow-Origin: *
```

