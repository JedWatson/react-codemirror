var React = require('react');
var Codemirror = require('react-codemirror');

var App = React.createClass({
	getInitialState: function() {
		return {
			code: "# Heading\n\nSome **bold** and _italic_ text\nBy [Jed Watson](https://github.com/JedWatson)"
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
