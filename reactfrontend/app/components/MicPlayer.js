
import React from 'react';
import axios from 'axios';


//Mini Mic for Recorded Mic Below
export default class MicPlayer extends React.Component {

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


