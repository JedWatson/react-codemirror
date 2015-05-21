'use strict';

var React = require('react');

var Codemirror = React.createClass({
	displayName: 'Codemirror',

	render: function render() {
		return React.createElement(
			'div',
			null,
			'Codemirror Editor Goes Here'
		);
	}

});

module.exports = Codemirror;