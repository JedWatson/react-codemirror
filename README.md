# Codemirror

The excellent CodeMirror editor as a React.js component.


## Demo & Examples

Live demo: [JedWatson.github.io/react-codemirror](http://JedWatson.github.io/react-codemirror/)

To build the examples locally, run:

```
npm install
npm start
```

Then open [`localhost:8000`](http://localhost:8000) in a browser.


## Installation

The easiest way to use codemirror is to install it from NPM and include it in your own React build process (using [Browserify](http://browserify.org), [Webpack](http://webpack.github.io/), etc).

You can also use the standalone build by including `dist/codemirror.js` in your page. If you use this, make sure you have already included React, and it is available as a global variable.

```
npm install codemirror --save
```


## Usage

```
// TODO: value, onChange example

var Codemirror = require('codemirror');

<Codemirror />
```

### Properties

* `value` `String` the editor value
* `options` `Object (newValue)` options passed to the CodeMirror instance
* `onChange` `Function (newValue)` called when a change is made

### License

MIT. Copyright (c) 2015 Jed Watson.

