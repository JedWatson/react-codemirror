var CM = require('codemirror');
var React = require('react');
var className = require('classnames');

var CodeMirror = React.createClass({

	propTypes: {
		onChange: React.PropTypes.func,
		onFocusChange: React.PropTypes.func,
		options: React.PropTypes.object,
		path: React.PropTypes.string,
		value: React.PropTypes.string,
		className: React.PropTypes.any,
	},

	getInitialState () {
		return {
			isFocused: false
		};
	},

	componentDidMount () {
		var textareaNode = this.refs.textarea.getDOMNode();
		this.codeMirror = CM.fromTextArea(textareaNode, this.props.options);
		this.codeMirror.on('change', this.codemirrorValueChanged);
		this.codeMirror.on('focus', this.focusChanged.bind(this, true));
		this.codeMirror.on('blur', this.focusChanged.bind(this, false));
		this._currentCodemirrorValue = this.props.value;
		this.codeMirror.setValue(this.props.value);
	},

	componentWillUnmount () {
		// todo: is there a lighter-weight way to remove the cm instance?
		if (this.codeMirror) {
			this.codeMirror.toTextArea();
		}
	},

	componentWillReceiveProps (nextProps) {
		if (this.codeMirror && this._currentCodemirrorValue !== nextProps.value) {
			this.codeMirror.setValue(nextProps.value);
		}
		if (typeof nextProps.options === 'object') {
			for (var optionName in nextProps.options) {
				if (nextProps.options.hasOwnProperty(optionName)) {
					this.codeMirror.setOption(optionName, nextProps.options[optionName]);
				}
			}
		}
	},

	getCodeMirror () {
		return this.codeMirror;
	},

	focus () {
		if (this.codeMirror) {
			this.codeMirror.focus();
		}
	},

	focusChanged (focused) {
		this.setState({
			isFocused: focused
		});
		this.props.onFocusChange && this.props.onFocusChange(focused);
	},

	codemirrorValueChanged (doc, change) {
		var newValue = doc.getValue();
		this._currentCodemirrorValue = newValue;
		this.props.onChange && this.props.onChange(newValue);
	},

	render () {
		var editorClassName = className(
			'ReactCodeMirror',
			this.state.isFocused ? 'ReactCodeMirror--focused' : null,
			this.props.className
		);

		return (
			<div className={editorClassName}>
				<textarea ref="textarea" name={this.props.path} defaultValue={''} autoComplete="off" />
			</div>
		);
	}

});

module.exports = CodeMirror;
