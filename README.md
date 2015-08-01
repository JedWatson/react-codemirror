# Codemirror

The excellent [CodeMirror](https://codemirror.net) editor as a [React.js](http://facebook.github.io/react) component.


## Demo & Examples

Live demo: [JedWatson.github.io/react-codemirror](http://JedWatson.github.io/react-codemirror)

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
var React = require('react'),
	Codemirror = require('react-codemirror');

var App = React.createClass({
	getInitialState: function() {
		return {
			code: "// Code"
		};
	},
	updateCode: function(newCode) {
		this.setState({
			code: newCode
		});
	},
	render: function() {
		var options = {
			lineNumbers: true
		};
		return <Codemirror value={this.state.code} onChange={this.updateCode} options={options} />
	}
});

React.render(<App />, document.getElementById('app'));
```

### Properties

* `value` `String` the editor value
* `options` `Object (newValue)` options passed to the CodeMirror instance
* `onChange` `Function (newValue)` called when a change is made
* `onFocusChange` `Function (focused)` called when the editor is focused or loses focus

See the [CodeMirror API Docs](https://codemirror.net/doc/manual.html#api) for the available options.

### License

MIT. Copyright (c) 2015 Jed Watson.

