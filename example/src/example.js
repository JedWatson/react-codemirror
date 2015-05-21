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
