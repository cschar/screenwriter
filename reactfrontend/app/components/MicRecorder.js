import React from 'react';
import {api} from '../api';

import { ReactMic } from 'react-mic';



export default class MicRecorder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      record: false,
      description: '',
      recordedBlob: null
    }

    this.startRecording = this.startRecording.bind(this);
    this.stopRecording = this.stopRecording.bind(this);
    this.saveRecording = this.saveRecording.bind(this);
    this.updateDescription = this.updateDescription.bind(this);

  }

  updateDescription(event) {
    var value = event.target.value;
    this.setState({
      description: value
    })
  }

  startRecording() {
    console.log('start')
    this.setState({
      record: true
    });
  }

  stopRecording() {
    console.log('stop')
    this.setState({
      record: false
    });
  }

  saveRecording() {
    var output = document.getElementById('output');
    console.log(output)
    console.log('saving with value' + this.state.description)
    var data = new FormData();
    
    
    data.append('file', this.state.recordedBlob.blob);
    data.append('description', this.state.description)
    
    data.append('scroll', this.props.scrollID.toString())
    
    console.log(data);
    console.log('posting to server')

    api.axios.post('/mics/', data)
      .then(function (res) {
        console.log('success')
        output.className = 'button';
        output.innerHTML = res.data;
      })
      .catch(function (err) {
        console.log('error in file upload')
        alert("upgraded account required")
        output.className = '';
        output.innerHTML = err.message;
      });
  }

  onStop(recordedBlob) {
    this.setState(function () {
      return { recordedBlob: recordedBlob }
    })
    console.log('recordedBlob is: ', recordedBlob);
  }

  render() {
    return (
      <div style={styles.content}>
        <div id="output"> </div>
        <ReactMic
          record={this.state.record}
          className="sound-wave"
          onStop={this.onStop.bind(this)}
          strokeColor="#000000"
          backgroundColor="#FF4081" />
        <p> blob is: {this.state.recordedBlob === null
          ? 'none'
          : this.state.recordedBlob.blobURL} </p>
        <label> Recording Descripton
            <input id='recDescription' type='text'
            value={this.state.description}
            onChange={this.updateDescription} />
        </label> <br />
        <audio controls src={this.state.recordedBlob === null
          ? ''
          : this.state.recordedBlob.blobURL} />
        <button onClick={this.startRecording} type="button">Start</button>
        <button onClick={this.stopRecording} type="button">Stop</button>
        <button onClick={this.saveRecording} disabled={!this.props.upgraded}>Save Mic</button>
        <label> { this.props.upgraded ? '' : 'Upgrade account to save mic' } </label>
      </div>
    );
  }
}

var styles = {
  content: {
    textAlign: 'center',
    fontSize: '20px',
    backgroundColor: '#9a9',
    margin: '2px',
    flex: 'column'
  }

}