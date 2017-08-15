var React = require('react');
var Link = require('react-router-dom').Link;

import store from '../store'
import { connect } from 'react-redux';


// import GoogleLogin from 'react-google-login';
// import FontAwesome from 'react-fontawesome';
// import ReactLoading from 'react-loading';
import AuthBox from './AuthBox';

import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';



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