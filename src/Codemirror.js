const React = require('react');
const ReactDOM = require('react-dom-polyfill')(React);
const findDOMNode = ReactDOM.findDOMNode;
const className = require('classnames');
const debounce = require('lodash.debounce');

function normalizeLineEndings(str) {
	if (!str) return str;
	return str.replace(/\r\n|\r/g, '\n');
}

const CodeMirror = React.createClass({
	propTypes: {
		onChange: React.PropTypes.func,
		onFocusChange: React.PropTypes.func,
		onScroll: React.PropTypes.func,
		options: React.PropTypes.object,
		path: React.PropTypes.string,
		value: React.PropTypes.string,
		className: React.PropTypes.any,
		codeMirrorInstance: React.PropTypes.func,
	},
	getCodeMirrorInstance () {
		return this.props.codeMirrorInstance || require('codemirror');
	},
	getInitialState () {
		return {
			isFocused: false,
		};
	},
	componentDidMount () {
		const textareaNode = findDOMNode(this.refs.textarea);
		const codeMirrorInstance = this.getCodeMirrorInstance();
		this.codeMirror = codeMirrorInstance.fromTextArea(textareaNode, this.props.options);
		this.codeMirror.on('change', this.codemirrorValueChanged);
		this.codeMirror.on('focus', this.focusChanged.bind(this, true));
		this.codeMirror.on('blur', this.focusChanged.bind(this, false));
		this.codeMirror.on('scroll', this.scrollChanged);
		this.codeMirror.setValue(this.props.defaultValue || this.props.value || '');
	},
	componentWillUnmount () {
		// is there a lighter-weight way to remove the cm instance?
		if (this.codeMirror) {
			this.codeMirror.toTextArea();
		}
	},
	componentWillReceiveProps: debounce(function (nextProps) {
		if (this.codeMirror && nextProps.value !== undefined) {
			if (normalizeLineEndings(this.codeMirror.getValue()) != normalizeLineEndings(nextProps.value)) {
				this.codeMirror.setValue(nextProps.value);
			}
		}
		if (typeof nextProps.options === 'object') {
			for (let optionName in nextProps.options) {
				if (nextProps.options.hasOwnProperty(optionName)) {
					this.codeMirror.setOption(optionName, nextProps.options[optionName]);
				}
			}
		}
	}, 0),
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
			isFocused: focused,
		});
		this.props.onFocusChange && this.props.onFocusChange(focused);
	},
	scrollChanged (cm) {
		this.props.onScroll && this.props.onScroll(cm.getScrollInfo());
	},
	codemirrorValueChanged (doc, change) {
		if (this.props.onChange && change.origin != 'setValue') {
			this.props.onChange(doc.getValue());
		}
	},
	render () {
		const editorClassName = className(
			'ReactCodeMirror',
			this.state.isFocused ? 'ReactCodeMirror--focused' : null,
			this.props.className
		);
		return (
			<div className={editorClassName}>
				<textarea ref="textarea" name={this.props.path} defaultValue={this.props.value} autoComplete="off" />
			</div>
		);
	},
});

module.exports = CodeMirror;
