var React = require('react');
var queryString = require('query-string');

var axios = require('axios');
// var Link = require('react-router-dom').Link;
import {Link} from 'react-router-dom'
import TextareaAutosize from 'react-autosize-textarea';

var PropTypes = require('prop-types');


var Audio = require('./Audio.js');
var RecordedMics = require('./Mic.js').RecordedMics;



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

module.exports = { Scroll}
// export Scroll;
// export ScrollContainer;
