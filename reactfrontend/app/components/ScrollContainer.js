var React = require('react');
var queryString = require('query-string');

var axios = require('axios');
import {Link} from 'react-router-dom'
import TextareaAutosize from 'react-autosize-textarea';

var PropTypes = require('prop-types');


var Audio = require('./Audio.js');
var RecordedMics = require('./Mic.js').RecordedMics;

import {Scroll} from './Scroll';



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
								 <h3> {scroll.id} </h3>
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

module.exports = { ScrollContainer}
