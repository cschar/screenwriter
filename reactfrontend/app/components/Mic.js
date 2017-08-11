import React from 'react';
import axios from 'axios';

import { ReactMic } from 'react-mic';



class AudioMic extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      micID: null,
      // description: 'no descr',  //in props
      // url: null, in props
      blob: null
    }
  }

  componentDidMount() {
    axios.get(this.props.url, { responseType: 'blob' })
      .then(function (response) {

        var micBlob = response.data
        this.setState(function (prevState) {
          return { blob: URL.createObjectURL(micBlob) }
        })
      }.bind(this)
      )
  }

  render() {
    return (<div>
      <audio controls src={this.state.blob} /> {this.props.description}
    </div>)
  }
}


export class RecordedMics extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mics: [],
    }
  }



  componentDidMount() {

    //Todo: pass scroll id from prop
    axios.get('http://localhost:3000/scrolls/' + this.props.scrollID + '/')
      .then(function (response) {
        console.log(response.data);
        var micSet = response.data.mic_set;


        axios.all(
          micSet.map(
            function (micData) {
              this.setState(function (prevState) {
                prevState.mics.push(
                  {
                    id: micData.id,
                    url: micData.file,
                    description: micData.description
                  })

                console.log('prev state');
                console.log(prevState.mics);
                return { mics: prevState.mics }

              })
            }.bind(this))
        ) //all
      }.bind(this));
  }


  render() {
    console.log("mic container render")
    console.log(this.state.mics)
    var recordedMics = this.state.mics.map(function (mic) {
      return (<li key={mic.id}>
          {mic.url}
          {mic.description}

        <AudioMic url={mic.url}
                  description={mic.description} /> 

      </li>)
    }.bind(this));


    return (<div>
      Recorded Mics:
      <ul>
        {recordedMics}
      </ul>
    </div>)
  }
}



export class Mic extends React.Component {
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
    data.append('scroll', this.props.scrollID)
    console.log(data);
    console.log(this.state.description);

    axios.post('http://localhost:3000/mics/', data)
      .then(function (res) {
        console.log('success')
        output.className = 'button';
        output.innerHTML = res.data;
      })
      .catch(function (err) {
        console.log('error in file upload')
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
        <label> Descripton
            <input id='recDescription' type='text'
            value={this.state.description}
            onChange={this.updateDescription} />
        </label> <br />
        <audio controls src={this.state.recordedBlob === null
          ? ''
          : this.state.recordedBlob.blobURL} />
        <button onClick={this.startRecording} type="button">Start</button>
        <button onClick={this.stopRecording} type="button">Stop</button>
        <button onClick={this.saveRecording} >Save</button>
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