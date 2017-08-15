var React = require('react');
var queryString = require('query-string');

// var Link = require('react-router-dom').Link;
import {Link} from 'react-router-dom'
import TextareaAutosize from 'react-autosize-textarea';

var PropTypes = require('prop-types');

import MicList from './MicList'


class ScrollPreview extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			text: props.text,
			id: props.id,
			oldCursorPosition: 0

		}
		// this.changeHUD = props.changeHUD;

	}


	render() {
		return (
			<div className='scroll'>
				<MicList scrollID={this.props.id}/>
				<TextareaAutosize id = {this.props.id} style={{ minHeight: 4}}
				                  
								  value={this.state.text}
								   />
			 

				

			</div>
		)
	}
}

ScrollPreview.defaultProps = {
  text: `sherri my dear
			it has been so Loading

			1. the way up the rabbit react-router-dom

			2. The way down the rabbit hole`,
  speed: 300
};

module.exports = ScrollPreview

