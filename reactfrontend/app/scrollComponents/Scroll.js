var React = require('react');
var queryString = require('query-string');

var axios = require('axios');
// var Link = require('react-router-dom').Link;
import {Link} from 'react-router-dom'
import TextareaAutosize from 'react-autosize-textarea';

var PropTypes = require('prop-types');


var Audio = require('./Audio.js');
var RecordedMics = require('./Mic.js').RecordedMics;


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
				
				<div className='HUD'>
					Hud <br/>
					<pre>{this.state.HUDText.text}</pre>
					<img width='200' height='200' src={this.state.HUDText.imgSrc} />
				</div>
				
				<button className='button' onClick={this.addScroll}> Add</button>
			     <ul>
					{scrolls[1]}
					</ul>
			</div>
			)
	}
}
////////////Only showed 1 scroll!!!^^^^^^^^^


//Gets tricky
//child component of container, but have to have sibling nodes
//update this hud with new text...... time for redux!
// class Hud extends React.Component {
// 	constructor(props) {
// 		super(props);

// 	}

// 	render() {
		
// 	}
// }


class Scroll extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			text: props.text,
			id: props.id,
			oldCursorPosition: 0

		}
		// this.changeHUD = props.changeHUD;

		this.handleClick = this.handleClick.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.scantextForWidgetCode = this.scanTextForWidgetCode.bind(this);
	}

	handleClick() {
		console.log('click')
		axios.patch('http://localhost:3000/scrolls/'+this.state.id+'/', {
			'text' : this.state.text,
			// 'id': this.state.id
		}).then( (response) => (console.log(response)))
		.catch( (error) => ( console.log(error)))
	}

	handleChange(event) {
		var value = event.target.value;
		this.setState(function(prevState){
			return {text: value}
		})
		var textarea = event.target;
		console.log(event.target)
		console.log(event.target.selectionStart)
		var start = textarea.selectionStart;
		var end = start + 5;
		// if (textarea.selectionStart !== textarea.selectionEnd){
		// 	console.log("tried to select stuff")
		// }
		// event.target.setSelectionRange(start, end)
		
		var selectionValue = event.target.value.slice(start, end)
		console.log(selectionValue)
	}
	handleKeyDown(event){
		
		console.log('keypress')
		// this.handleChange(event)
		var textarea = event.target;
		var start = textarea.selectionStart;
		var end = start + 30;
		var selectionValue = event.target.value.slice(start, end)
		console.log(selectionValue)
		
		// console.log(this.props)
		this.props.changeHUD(selectionValue)
		this.scanTextForWidgetCode(selectionValue)
	}

	scanTextForWidgetCode(text){
		console.log('scanning')
		//get es6 to work then use destructuring to get named groups
		//http://stackoverflow.com/a/37280770/5198805
		var frame_match = text.match(/\[frame (\d)+[ ]?\]/);
		if ( frame_match ){
			var hud = { text: frame_match[0],
			imgSrc: 
	"http://localhost:3000/frames/" + frame_match[1] + ".png" 
					}

			this.props.changeHUD(hud.text, hud.imgSrc)
		}
	}

	render() {
		return (
			<div className='scroll'>
				<Audio scrollID={this.props.id}/>
				<TextareaAutosize id = {this.props.id} style={{ minHeight: 4}}
				                  //two options: innerREF giving this.textarea OR onChange callback using event target textarea
								  //innerRef={ function(ref){ this.textarea = ref }.bind(this)}
								  value={this.state.text}
								  onKeyUp={this.handleKeyDown.bind(this)}
				                  onChange={this.handleChange} />
			 

				<button className='' onClick={this.handleClick}>
					Click to save 
				</button>
				

			</div>
		)
	}
}

Scroll.defaultProps = {
  text: `sherri my dear
			it has been so Loading

			1. the way up the rabbit react-router-dom

			2. The way down the rabbit hole`,
  speed: 300
};

module.exports = { Scroll, ScrollContainer}
// export Scroll;
// export ScrollContainer;
