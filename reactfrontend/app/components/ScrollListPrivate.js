var React = require('react');
var queryString = require('query-string');

import {api} from '../api';
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

class ScrollListPrivate extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			scrolls: [],
		}

		this.addScroll = this.addScroll.bind(this);
	}

	addScroll() {
		api.axios.post('/myscrolls/')
		.then( function(response){
			this.setState(function(prevState){
				var scrolls = prevState.scrolls;
				scrolls.push(response.data)
				return {scrolls: scrolls}
			})

		}.bind(this))
		.catch( (error) => ( console.log(error)))



		
		
	}


	componentDidMount() {
		api.axios.get('/myscrolls/')
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
								 <h3> {scroll.id} 
								  <Link to={'/scrolls/'+scroll.id}>
									Edit 
								  </Link>
								 {scroll.title}


								</h3> 
			           <ScrollPreview className=''
					      
			                   text={scroll.text}
			                   id={scroll.id}/>
			         </li>)
		}.bind(this))

		var header = null;
		if(!this.props.userToken){
			return (<div className='scroll-list-container'>
					<h2> Requires Login </h2>
				</div>
				)
		}

		return (
			<div className='scroll-list-container'>
				<button className='button' onClick={this.addScroll}> Add</button>
			     <ul>
					{scrolls}
					</ul>
			</div>
			)
	}
}


ScrollListPrivate = connect(mapStateToProps)(ScrollListPrivate)

module.exports = ScrollListPrivate
