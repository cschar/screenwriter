var React = require('react');
var Link = require('react-router-dom').Link;

import GoogleLogin from 'react-google-login';

const responseGoogle = (response) => {
  console.log(response);
  //redux

}

class Home extends React.Component {
	render () {
		return (
			<div className='home-container'>
				<h1> Scroll screenwriter </h1>
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

module.exports = Home