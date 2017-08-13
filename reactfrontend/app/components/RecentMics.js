import React from 'react';
import axios from 'axios'

import MicPlayer from './MicPlayer';


class RecentMics extends React.Component {

  constructor(props) {
    super(props);

    this.state = {mics: []}
  }

  componentDidMount() {
    axios.get('http://localhost:3000/mics/')
      .then(function (response) {
        console.log(response)

        this.setState(function (prevState) {
                
                return { mics: response.data }

              })

      }.bind(this));
  }

  render() {    

    var mics = this.state.mics.map(function (mic){
      return (<li key={mic.id}>
          {mic.file}
          {mic.description}

        <MicPlayer url={mic.file}
                  description={mic.description} /> 

      </li>)
    }.bind(this))

    return (
      <div >
        <h3>  RecentMics </h3>
           <ul>
          {mics}
          </ul>
      </div>
      )
  }
}

module.exports = {RecentMics};

