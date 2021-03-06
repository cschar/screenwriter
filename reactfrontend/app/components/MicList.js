import React from 'react';
import {api} from '../api';
import axios from 'axios';
import { ReactMic } from 'react-mic';
import MicPlayer from './MicPlayer';



export class MicList extends React.Component {
  constructor(props) {
    super(props); //scrollID

    this.state = {
      mics: [],
    }
  }



  componentDidMount() {

    //Todo: pass scroll id from prop
    api.axios.get('/scrolls/' + this.props.scrollID + '/')
      .then(function (response) {
        console.log(response.data);
        var micSet = response.data.mic_set;

        //api instance cant do all
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

        <MicPlayer url={mic.url}
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