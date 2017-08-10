var React = require('react');
var SoundCloudAudio = require('soundcloud-audio');


var Mic = require('./Mic.js').Mic;
var RecordedMics = require('./Mic.js').RecordedMics;
var SoundCloudBit = require('./SoundCloudBit.js').SoundCloudBit;


class Audio extends React.Component {

	constructor(props){
		super(props);

}

	render() {
		return (
			<div>
				{ /*<SoundCloudBit /> */}
			    <RecordedMics scrollID={this.props.scrollID} />
				<Mic scrollID={this.props.scrollID}/>				
			</div>
			)
	}
}

module.exports = Audio