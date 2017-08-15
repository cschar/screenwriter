var React = require('react');
var Link = require('react-router-dom').Link;

import store from '../store'
import { connect } from 'react-redux';

var axios = require('axios');

import GoogleLogin from 'react-google-login';
import Button from 'react-bootstrap/lib/Button';

const mapStateToProps = function(store) {

  return {
  	upgraded: store.myReducer.upgraded,
  	loading: store.myReducer.loading,
    userName: store.myReducer.user,
    googleImage: store.myReducer.userImage,
    googleName: store.myReducer.userName,
    userToken: store.myReducer.userToken
  };
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


			store.dispatch({
				type:'SET_USER_TOKEN',
				userToken: response.data.token
			})
			store.dispatch({
				type:'SET_USER_UPGRADE',
				upgraded: response.data.upgraded
			})
			store.dispatch({
			type:'SET_LOADING',
			loading: false
		})

	})
		.catch( (error) => ( console.log(error)))

}

class AuthBox extends React.Component {
	  constructor(props) {
    super(props);
    this.state = {
      upgradeCode: '',
      upgradeMsg: '',
    }

    this.onCodeInput = this.onCodeInput.bind(this);
  }

  onCodeInput(event) {
    var value = event.target.value;
    this.setState({
      upgradeCode: value
    })
  }

	render(){
		var auth_button;
if (!this.props.userToken){
			auth_button = (
				<div><h2> Login </h2>
				<GoogleLogin
    clientId="766018239151-af6g358s6j3n7a5499cb5ac3n7lcn6bh.apps.googleusercontent.com"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}>
   Google Login </GoogleLogin>
				
   			</div>)
		 }else{

		 	if (!this.props.upgraded){
		 	var upgradeWidget = (
		 			<label> Code: 
            <input id='upgradeCode' type='text'
            value={this.state.upgradeCode}
            onChange={this.onCodeInput} />
         
         <Button onClick={function(event){
         	console.log(this.props);
         	var token = 'Token ' + this.props.userToken;
    			axios.defaults.headers.common['Authorization'] = token;
      		axios.post('http://localhost:3000/upgrade-account/',
      		 {'upgradeCode': this.state.upgradeCode})
		      .then(function (res) {
		        console.log(res)
		        store.dispatch({
							type:'SET_USER_UPGRADE',
							upgraded: true
						})

		      }).catch(function(err){
		      	this.setState({'upgradeMsg': 'not accepted'})
		      }.bind(this))
         }.bind(this)}> Upgrade Account </Button>
         </label> 

		 		)
		 }else{
		 	var upgradeWidget = (
		 		<div> <h1> Upgraded Account </h1>
		 		You can now save audio</div>
		 		)
		 }

		 	auth_button = (
		 		 <div className='home-container'>
		 		 <div> <img src={this.props.googleImage} /> </div>
		 		 	<button className='button' onClick={this.handleTestDispatch}>

		<h1>dispatch {this.props.googleName}</h1>
			{this.props.googleImage}
			
			{this.props.userToken}
    
		 </button>
		 		 {/*<div> <img src={this.props.googleImage} /> </div>*/}
		 		 <br/>
		 		 { upgradeWidget}

		 		 <br />

		 				<Button onClick={function (){
		 					console.log('click')
		 					store.dispatch({
		 						type: 'DEL_USER_INFO'
		 					})
		 				}}>
		 				 <h2>logout </h2>
		 				 </Button>
		 			</div>
		 			)
		 }
		 	return(
		 		<div>
				{auth_button}
				</div>
			)
	} //render
}


export default connect(mapStateToProps)(AuthBox)

