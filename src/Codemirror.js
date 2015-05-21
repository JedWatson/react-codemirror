var CM = require('codemirror');
var React = require('react');

var CodeMirror = React.createClass({
	
	getInitialState: function() {
		return {
			isFocused: false
		};
	},
	
	componentDidMount: function() {
		this.codeMirror = CM.fromTextArea(this.refs.codemirror.getDOMNode(), this.props.options);
		this.codeMirror.on('change', this.codemirrorValueChanged);
		this.codeMirror.on('focus', this.focusChanged.bind(this, true));
		this.codeMirror.on('blur', this.focusChanged.bind(this, false));
		this._currentCodemirrorValue = this.props.value;
	},
	
	componentWillUnmount: function() {
		// todo: is there a lighter-weight way to remove the cm instance?
		if (this.codeMirror) {
			this.codeMirror.toTextArea();
		}
	},
	
	componentWillReceiveProps: function(nextProps) {
		if (this.codeMirror && this._currentCodemirrorValue !== nextProps.value) {
			this.codeMirror.setValue(nextProps.value);
		}
	},

	getCodeMirror: function() {
		return this.codeMirror;
	},
	
	focus: function() {
		if (this.codeMirror) {
			this.codeMirror.focus();
		}
	},
	
	focusChanged: function(focused) {
		this.setState({
			isFocused: focused
		});
	},
	
	codemirrorValueChanged: function(doc, change) {
		var newValue = doc.getValue();
		this._currentCodemirrorValue = newValue;
		this.props.onChange && this.props.onChange(newValue);
	},
	
	render: function() {
		var className = 'ReactCodeMirror';
		if (this.state.isFocused) {
			className += ' ReactCodeMirror--focused';
		}
		return (
			<div className={className}>
				<textarea ref="codemirror" name={this.props.path} value={this.props.value} onChange={this.valueChanged} autoComplete="off" />
			</div>
		);
	}
	
});

module.exports = CodeMirror;
