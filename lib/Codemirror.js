'use strict';

var React = require('react');
var className = require('classnames');
var debounce = require('lodash.debounce');

var CodeMirror = React.createClass({
	displayName: 'CodeMirror',

	propTypes: {
		onChange: React.PropTypes.func,
		onFocusChange: React.PropTypes.func,
		onScroll: React.PropTypes.func,
		options: React.PropTypes.object,
		path: React.PropTypes.string,
		value: React.PropTypes.string,
		className: React.PropTypes.any,
		codeMirrorInstance: React.PropTypes.func,
		debounceWaitTime: React.PropTypes.number
	},
	getCodeMirrorInstance: function getCodeMirrorInstance() {
		return this.props.codeMirrorInstance || require('codemirror');
	},
	getInitialState: function getInitialState() {
		return {
			isFocused: false
		};
	},
	componentWillUnmount: function componentWillUnmount() {
		var _this = this;

		this.handleUpdate = debounce(function (nextProps) {
			if (_this.codeMirror && nextProps.value !== undefined && _this.codeMirror.getValue() != nextProps.value) {
				_this.codeMirror.setValue(nextProps.value);
			}
			if (typeof nextProps.options === 'object') {
				for (var optionName in nextProps.options) {
					if (nextProps.options.hasOwnProperty(optionName)) {
						_this.codeMirror.setOption(optionName, nextProps.options[optionName]);
					}
				}
			}
		}, debounceWaitTime || 0);
	},
	componentDidMount: function componentDidMount() {
		var textareaNode = this.refs.textarea;
		var codeMirrorInstance = this.getCodeMirrorInstance();
		this.codeMirror = codeMirrorInstance.fromTextArea(textareaNode, this.props.options);
		this.codeMirror.on('change', this.codemirrorValueChanged);
		this.codeMirror.on('focus', this.focusChanged.bind(this, true));
		this.codeMirror.on('blur', this.focusChanged.bind(this, false));
		this.codeMirror.on('scroll', this.scrollChanged);
		this.codeMirror.setValue(this.props.defaultValue || this.props.value || '');
	},
	componentWillUnmount: function componentWillUnmount() {
		// is there a lighter-weight way to remove the cm instance?
		if (this.codeMirror) {
			this.codeMirror.toTextArea();
		}
	},
	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		this.handleUpdate(nextProps);
	},
	getCodeMirror: function getCodeMirror() {
		return this.codeMirror;
	},
	focus: function focus() {
		if (this.codeMirror) {
			this.codeMirror.focus();
		}
	},
	focusChanged: function focusChanged(focused) {
		this.setState({
			isFocused: focused
		});
		this.props.onFocusChange && this.props.onFocusChange(focused);
	},
	scrollChanged: function scrollChanged(cm) {
		this.props.onScroll && this.props.onScroll(cm.getScrollInfo());
	},
	codemirrorValueChanged: function codemirrorValueChanged(doc, change) {
		if (this.props.onChange && change.origin != 'setValue') {
			this.props.onChange(doc.getValue());
		}
	},
	render: function render() {
		var editorClassName = className('ReactCodeMirror', this.state.isFocused ? 'ReactCodeMirror--focused' : null, this.props.className);
		return React.createElement(
			'div',
			{ className: editorClassName },
			React.createElement('textarea', { ref: 'textarea', name: this.props.path, defaultValue: this.props.value, autoComplete: 'off' })
		);
	}
});

module.exports = CodeMirror;