var React = require('react');
var Link = require('react-router-dom').Link;

import store from '../store'
import { connect } from 'react-redux';

var axios = require('axios');

import GoogleLogin from 'react-google-login';


const responseGoogle = (response) => {
	console.log(response);
	store.dispatch({
			type:'SET_USER_INFO',
			userName: response.profileObj.givenName,
		  userImage: response.profileObj.imageUrl,

		})


	//call server , register user with response.tokenId
	axios.post('http://localhost:3000/client-google-oauth2-login/', {
			'access_token' : response.accessToken
			 
		}).then( (response) => (

			store.dispatch({
				type:'SET_USER_TOKEN',
				userToken: response.data.token
			})

	))
		.catch( (error) => ( console.log(error)))

}

const mapStateToProps = function(store) {
	console.log("mapping state to porops")
	console.log(store.todos)
	console.log(store.myReducer)

  return {
    userName: store.myReducer.user,
    daGoogleImage: store.myReducer.userImage,
    daGoogleName: store.myReducer.userName,
    userToken: store.myReducer.userToken
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

		<h1>dispatch {this.props.userName}</h1>
			{this.props.daGoogleImage}
			{this.props.daGoogleName}
			{this.props.userToken}
    
		 </button>

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