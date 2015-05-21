var React = require('react'),
	Codemirror = require('react-codemirror');

var App = React.createClass({
	render: function() {
		return (
			<div>
				<Codemirror />
			</div>
		)
	}
});

React.render(<App />, document.getElementById('app'));
