var React = require('react');

class Child extends React.Component {
    render () {
		return (
			<div>
                {this.props.userName}
                a child
                </div>)
    }
}

module.exports = Child;
