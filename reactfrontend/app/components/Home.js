var React = require('react');
var Link = require('react-router-dom').Link;

import store from '../store'
import { connect } from 'react-redux';


import GoogleLogin from 'react-google-login';
import Child from './Child'

const responseGoogle = (response) => {
  console.log(response);
  //redux

}

const mapStateToProps = function(store) {
	console.log("mapping state to porops")
	console.log(store.todos)
	console.log(store.myReducer)
	
  return {
    userName: store.myReducer.user
  };
}

class Home extends React.Component {
	constructor(props){
		super(props);

		this.handleTestDispatch = this.handleTestDispatch.bind(this);
	}

	handleTestDispatch() {
		console.log('dispatching');
		store.dispatch({
			type:'ADD_USER',
			text: 'sampleTExt'
		})
	}

	render () {
		return (
			<div className='home-container'>
				<h1> Scroll screenwriter </h1>


	<button className='button' onClick={this.handleTestDispatch}>
		<Child userName={this.props.userName} />

		<h1>dispatch {this.props.userName}</h1> </button>

				<h2> Login </h2>
				<GoogleLogin
    clientId="766018239151-af6g358s6j3n7a5499cb5ac3n7lcn6bh.apps.googleusercontent.com"
    buttonText="Google Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
  />,
				<h3> Scroll screenwriter </h3>
				<Link className='button' to='/scrolls'>
				scrolls
				</Link>

			</div>



		)
	}
}

export default connect(mapStateToProps)(Home)
//module.exports = Home