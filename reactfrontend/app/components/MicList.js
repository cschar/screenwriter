import React from 'react';
import axios from 'axios';

import { ReactMic } from 'react-mic';



//Mini Mic for Recorded Mic Below
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


export class MicList extends React.Component {
  constructor(props) {
    super(props); //scrollID

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


module.exports = MicList