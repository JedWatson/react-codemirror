var React = require('react');
var Codemirror = require('react-codemirror');

var App = React.createClass({
	getInitialState () {
		return {
			readOnly: false,
			code: '# Heading\n\nSome **bold** and _italic_ text\nBy [Jed Watson](https://github.com/JedWatson)'
		};
	},
	updateCode (newCode) {
		this.setState({
			code: newCode
		});
	},
	toggleReadOnly () {
		this.setState({
			readOnly: !this.state.readOnly
		}, () => this.refs.editor.focus());
	},
	render () {
		var options = {
			lineNumbers: true,
			readOnly: this.state.readOnly
		};
		return (
			<div>
				<Codemirror ref="editor" value={this.state.code} onChange={this.updateCode} options={options} />
				<div style={{ marginTop: 10 }}>
					<button onClick={this.toggleReadOnly}>Toggle read-only mode (currently {this.state.readOnly ? 'on' : 'off'})</button>
				</div>
			</div>
		);
	}
});

React.render(<App />, document.getElementById('app'));
