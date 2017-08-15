var React = require('react');
var Link = require('react-router-dom').Link;

import store from '../store'
import { connect } from 'react-redux';

var axios = require('axios');

// import GoogleLogin from 'react-google-login';
// import FontAwesome from 'react-fontawesome';
// import ReactLoading from 'react-loading';
import AuthBox from './AuthBox';

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

				
				
			<AuthBox />


			</div>



		)
	}
}

export default connect(mapStateToProps)(Home)
//module.exports = Home