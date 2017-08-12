var React = require('react');
var queryString = require('query-string');

var axios = require('axios');
import {Link} from 'react-router-dom'
import TextareaAutosize from 'react-autosize-textarea';

var PropTypes = require('prop-types');


import MicList from './MicList';

import {Scroll} from './Scroll';

import store from '../store'
import { connect } from 'react-redux';

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

class MyScrolls extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			scrolls: [],
		}
	}


	componentDidMount() {
		
		//not working  in reducer...
		var token = 'Token ' + this.props.userToken;
    // var token = 'Token ' + this.props.userToken;
    axios.defaults.headers.common['Authorization'] = token;

		axios.get('http://localhost:3000/myscrolls/')
		.then( function(resp){
					console.log('axios myscrolls')
					console.log(resp)

					this.setState({
			  		scrolls: resp.data
			  	})
				}.bind(this))
			.catch( (error) => ( console.log(error)));
	}


	render() {
		// console.log(this.state.scrolls)
		var scrolls = this.state.scrolls.map(function (scroll){
			return ( <li key={scroll.id}>
								 <h3> {scroll.id} </h3>
			           <Scroll className=''
					      
			                   text={scroll.text}
			                   id={scroll.id}/>
			         </li>)
		}.bind(this))

		return (
			<div className='scroll-list-container'>
				<h3>  as {this.props.userName} </h3>
				<h3> token {this.props.userToken} </h3>
			     <ul>
					{scrolls}
					</ul>
			</div>
			)
	}
}

class ScrollContainer extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			scrolls: [],
			HUDText: {text: 'nada',
			          imgSrc: ''}
		}
		this.addScroll = this.addScroll.bind(this);
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
	addScroll() {
		this.setState(function(prevState){
			var scrolls = prevState.scrolls;
			//make server do this (ask for permission, receive id back)
			var newId = 'foo' + Math.random().toString(36).substring(2,7);
			scrolls.push({id: newId, text: ''})
			console.log('Created New scroll w id: ' + newId);
			return {scrolls: scrolls}
		})
		
	}

	render() {
		// console.log(this.state.scrolls)
		var scrolls = this.state.scrolls.map(function (scroll){
			return ( <li key={scroll.id}>
								 <h3> {scroll.id} <Link to={'/scrolls/'+scroll.id}>
									Edit 
								</Link>
								</h3>
								 
							
			           <Scroll className=''
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
				
				<button className='button' onClick={this.addScroll}> Add</button>
			    
			     <ul>
					{scrolls}
					</ul>
			</div>
			)
	}
}


ScrollContainer = connect(mapStateToProps)(ScrollContainer)
MyScrolls = connect(mapStateToProps)(MyScrolls)

module.exports = { ScrollContainer, MyScrolls}
