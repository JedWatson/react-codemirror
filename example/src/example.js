var React = require('react');
var Codemirror = require('react-codemirror');

var App = React.createClass({
	getInitialState () {
		return {
			code: '# Heading\n\nSome **bold** and _italic_ text\nBy [Jed Watson](https://github.com/JedWatson)'
		};
	},
	updateCode (newCode) {
		this.setState({
			code: newCode
		});
	},
	render () {
		var options = {
			lineNumbers: true
		};
		return <Codemirror value={this.state.code} onChange={this.updateCode} options={options} />;
	}
});

React.render(<App />, document.getElementById('app'));
