var React = require('react');
var axios = require('axios');
import MicRecorder from './MicRecorder';
import MicList from './MicList'

import {Link} from 'react-router-dom'
import TextareaAutosize from 'react-autosize-textarea';


/*
Duplicates scroll stuff , 

cause of props not updating when state is changed
*/
class ScrollDetail extends React.Component {

		constructor(props){
		super(props);
		this.state = {
			scroll: null,
			text: 'hey',
			text: props.text,
			id: props.match.params.id,
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
		// this.props.changeHUD(selectionValue)
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

			// this.props.changeHUD(hud.text, hud.imgSrc)
		}
	}

	


	componentDidMount() {
		let url = 'http://localhost:3000/scrolls/' + this.props.match.params.id +'/'
		axios.get(url)
		.then( function(resp){
					console.log('axios scroll detail')
					console.log(resp.data)

					this.setState({
			  		scroll: resp.data,
			  		text: resp.data.text
			  	})
			  	console.log("state")
			  	console.log(this.state)
			  	this.forceUpdate();
			  	// console.log(this.state.scroll.text)
				}.bind(this))
			.catch( (error) => ( console.log(error)));
	}

	render () {

		return (
			<div className='scroll-list-container'>
			<div className='scroll'>
				<MicRecorder scrollID={this.props.match.params.id}/>
				<MicList scrollID={this.props.match.params.id}/>
				<TextareaAutosize id = {this.props.match.params.id} style={{ minHeight: 4}}
				                  //two options: innerREF giving this.textarea OR onChange callback using event target textarea
								  //innerRef={ function(ref){ this.textarea = ref }.bind(this)}
								  value={this.state.text}
								  onKeyUp={this.handleKeyDown.bind(this)}
				                  onChange={this.handleChange} />
			 

				<button className='' onClick={this.handleClick}>
					Click to save 
				</button>
				

			</div>
			</div>
		)
	}
}

module.exports = ScrollDetail;