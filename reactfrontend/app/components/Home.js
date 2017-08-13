var React = require('react');
var Link = require('react-router-dom').Link;

import store from '../store'
import { connect } from 'react-redux';

var axios = require('axios');

import GoogleLogin from 'react-google-login';
// import FontAwesome from 'react-fontawesome';
import ReactLoading from 'react-loading';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';

 
 //make this a crazy component with clipart style images
 //kandinsky stuff
const Loader = () => (
	   <div>
	   <h2>Loading</h2>
    <ReactLoading type={'balls'} color={'#adf'} height='267' width='175' />
    </div>
);
 

const logout = () => {
	store.dispatch({
				type:'DEL_USER_INFO',
				userToken: response.data.token
			})
}

const responseGoogle = (response) => {
	console.log(response);
	store.dispatch({
			type:'SET_LOADING',
			loading: true
		})
	store.dispatch({
			type:'SET_USER_INFO',
			userName: response.profileObj.givenName,
		  userImage: response.profileObj.imageUrl,

		})



	//call server , register user with response.tokenId
	axios.post('http://localhost:3000/client-google-oauth2-login/', {
			'access_token' : response.accessToken
			 
		}).then( function(response){


			//stop loading
			store.dispatch({
				type:'SET_USER_TOKEN',
				userToken: response.data.token
			})
			store.dispatch({
			type:'SET_LOADING',
			loading: false
		})

	})
		.catch( (error) => ( console.log(error)))

}

const mapStateToProps = function(store) {

  return {
  	loading: store.myReducer.loading,
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
			text: '==='
		})

	}

	render () {

		//AUTH BUTTON
		var auth_button;
		if (!this.props.userToken){
			auth_button = (<div><h2> Login </h2>
				<GoogleLogin
    clientId="766018239151-af6g358s6j3n7a5499cb5ac3n7lcn6bh.apps.googleusercontent.com"
    
    onSuccess={responseGoogle}
    onFailure={responseGoogle}>
   Google Login </GoogleLogin>
				
		
   </div>)
		 }else{
		 		auth_button = ( <div>
		 				<Button onClick={function (){
		 					console.log('click')
		 					store.dispatch({
		 						type: 'DEL_USER_INFO'
		 					})
		 				}}

		 				> <h2>logout </h2> </Button>
		 			</div>
		 			)
		 }
		
			//LOADER
		 let loading = null;
		 if (this.props.loading){
		  loading = (
		 <div className='loading-container'>
				 Loading 
				<div className='loader'></div>
		 </div>)
		  return loading;
		  }


		return (
			<div className='home-container'>
				
				<div className='auth-box'>

				</div>

				<h1> Scroll screenwriter </h1>


				<div> <img src={this.props.daGoogleImage} /> </div>
	<button className='button' onClick={this.handleTestDispatch}>

		<h1>dispatch {this.props.userName}</h1>
			{this.props.daGoogleImage}
			{this.props.daGoogleName}
			{this.props.userToken}
    
		 </button>
				{auth_button}


			</div>



		)
	}
}

export default connect(mapStateToProps)(Home)
//module.exports = Home