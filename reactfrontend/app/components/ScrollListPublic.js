var React = require('react');
var queryString = require('query-string');

var axios = require('axios');
import {Link} from 'react-router-dom'
import TextareaAutosize from 'react-autosize-textarea';

var PropTypes = require('prop-types');


import MicList from './MicList';

import ScrollPreview from './ScrollPreview';

import store from '../store'
import { connect } from 'react-redux';

const mapStateToProps = function(store) {
  return {
    userName: store.myReducer.user,
    daGoogleImage: store.myReducer.userImage,
    daGoogleName: store.myReducer.userName,
    userToken: store.myReducer.userToken
  };
}

class ScrollListPublic extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			scrolls: [],
			HUDText: {text: 'nada',
			          imgSrc: ''}
		}
		this.changeHUD = this.changeHUD.bind(this);
	}

	


	componentDidMount() {
		axios.get('http://localhost:3000/scrolls/')
		.then( (resp) => (this.setState({
			  		scrolls: resp.data.results
			  	}))
			);
	}


	changeHUD(text, imgSrc = '') {
		this.setState(function () {
			return { HUDText: {text: text,
			                   imgSrc: imgSrc}}
		})
	}
	

	render() {
		// console.log(this.state.scrolls)
		var scrolls = this.state.scrolls.map(function (scroll){
			return ( <li key={scroll.id}>
								 <h3> {scroll.id} {scroll.title}
									</h3>
								 
							
			           <ScrollPreview className=''
					           changeHUD={this.changeHUD}
			                   text={scroll.text}
			                   id={scroll.id}/>
			         </li>)
		}.bind(this))

		return (
			<div className='scroll-list-container'>
				
				{/*<div className='HUD'>
					Hud <br/>
					<pre>{this.state.HUDText.text}</pre>
					<img width='200' height='200' src={this.state.HUDText.imgSrc} />
				</div>*/}
				
				
			    
			     <ul>
					{scrolls}
					</ul>
			</div>
			)
	}
}


ScrollListPublic = connect(mapStateToProps)(ScrollListPublic)

module.exports = ScrollListPublic