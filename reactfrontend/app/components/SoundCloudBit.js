var React = require('react');
var SoundCloudAudio = require('soundcloud-audio');
var sc_client_id = process.env.SOUNDCLOUD_APP_ID;



export class SoundCloudBit extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			scPlayer: null
		}

		this.playSoundCloud = this.playSoundCloud.bind(this);
	}

		playSoundCloud() {
		this.state.scPlayer.resolve(
			'https://soundcloud.com/djangodjango/first-light',
			 function (track) {
			    // do smth with track object
			    // e.g. display data in a view etc.
			    //console.log(track); 

			    // once track is loaded it can be played
			    this.state.scPlayer.play();

			    // stop playing track and keep silence
			    // scPlayer.pause();
			}.bind(this));
	}

		componentDidMount() {
		// create new instance of audio
		//console.log(sc_client_id);
		var scPlayer = new SoundCloudAudio(sc_client_id);
		this.setState(function (){
			return {scPlayer: scPlayer}
		})
	}

	render() {
		return (
			<div className='scContainer'>
					<button onClick={this.playSoundCloud}>
						play soundcloud
					</button>
					<button onClick={function(e) {
						this.state.scPlayer.pause();
					}.bind(this)}>
						pause soundcloud
					</button>
			</div>
			)
	}
}

