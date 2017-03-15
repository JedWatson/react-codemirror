const React = require('react');
const ReactDOM = require('react-dom');
const findDOMNode = ReactDOM.findDOMNode;
const className = require('classnames');
const debounce = require('lodash.debounce');

function normalizeLineEndings (str) {
	if (!str) return str;
	return str.replace(/\r\n|\r/g, '\n');
}

function isEqual(thing1, thing2) {
	if (thing1 === thing2) {
		return true;
	} else if (Number.isNaN(thing1) && Number.isNaN(thing2)) {
		return true;
	} else if (Array.isArray(thing1) && Array.isArray(thing2)) {
		return arraysEqual(thing1, thing2);
	} else if (typeof(thing1) === 'object' && typeof(thing2) === 'object') {
		return objectsEqual(thing1, thing2);
	} else {
		return false;
	}
}

function arraysEqual(array1, array2) {
	if (array1.length !== array2.length) {
		return false;
	} else {
		return array1.every(function(item, index) {
			return isEqual(array1[index], array2[index]);
		});
	}
}

function objectsEqual(obj1, obj2) {
	if (obj1.constructor !== obj2.constructor) {
		return false;
	}
	const obj1Keys = Object.keys(obj1);
	const obj2Keys = Object.keys(obj2);
	if (!arraysEqual(obj1Keys.sort(), obj2Keys.sort())) {
		return false;
	}
	return obj1Keys.every(function(key) {
		return isEqual(obj1[key], obj2[key]);
	});
}

const CodeMirror = React.createClass({
	propTypes: {
		className: React.PropTypes.any,
		codeMirrorInstance: React.PropTypes.func,
		defaultValue: React.PropTypes.string,
		onChange: React.PropTypes.func,
		onFocusChange: React.PropTypes.func,
		onScroll: React.PropTypes.func,
		options: React.PropTypes.object,
		path: React.PropTypes.string,
		value: React.PropTypes.string,
		preserveScrollPosition: React.PropTypes.bool,
	},
	getDefaultProps () {
		return {
			preserveScrollPosition: false,
		};
	},
	getCodeMirrorInstance () {
		return this.props.codeMirrorInstance || require('codemirror');
	},
	getInitialState () {
		return {
			isFocused: false,
		};
	},
	componentWillMount () {
		this.componentWillReceiveProps = debounce(this.componentWillReceiveProps, 0);
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
	componentWillReceiveProps: function (nextProps) {
		if (this.codeMirror && nextProps.value !== undefined && normalizeLineEndings(this.codeMirror.getValue()) !== normalizeLineEndings(nextProps.value)) {
			if (this.props.preserveScrollPosition) {
				var prevScrollPosition = this.codeMirror.getScrollInfo();
				this.codeMirror.setValue(nextProps.value);
				this.codeMirror.scrollTo(prevScrollPosition.left, prevScrollPosition.top);
			} else {
				this.codeMirror.setValue(nextProps.value);
			}
		}
		if (typeof nextProps.options === 'object') {
			for (let optionName in nextProps.options) {
				if (nextProps.options.hasOwnProperty(optionName)) {
					this.setOptionIfChanged(optionName, nextProps.options[optionName]);
				}
			}
		}
	},
	setOptionIfChanged (optionName, newValue) {
		const oldValue = this.codeMirror.getOption(optionName);
		if (!isEqual(oldValue, newValue)) {
			this.codeMirror.setOption(optionName, newValue);
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
			isFocused: focused,
		});
		this.props.onFocusChange && this.props.onFocusChange(focused);
	},
	scrollChanged (cm) {
		this.props.onScroll && this.props.onScroll(cm.getScrollInfo());
	},
	codemirrorValueChanged (doc, change) {
		if (this.props.onChange && change.origin !== 'setValue') {
			this.props.onChange(doc.getValue(), change);
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
