import React from 'react';
import { connect } from 'react-redux';
import {api} from '../api';
import MicPlayer from './MicPlayer';



class RecentMics extends React.Component {

  constructor(props) {
    super(props);

    this.state = {mics: []}
  }

  componentDidMount() {
  if(this.props.userToken){
    api.axios.get('/mics/')
      .then(function (response) {
        console.log(response)

        this.setState(function (prevState) {
                
                return { mics: response.data }

              })

      }.bind(this));
    }
  }

  render() {    

    if(!this.props.userToken){
      return (<div className='scroll-list-container'>
          <h2> Requires Login </h2>
        </div>
        )
    }

    var mics = this.state.mics.map(function (mic){
      return (<li key={mic.id}>
          {mic.file}
          {mic.description}

        <MicPlayer url={mic.file}
                  description={mic.description} /> 

      </li>)
    }.bind(this))

    return (
      <div className='recentMicContainer'>
        <h3>  RecentMics </h3>
           <ul>
          {mics}
          </ul>
      </div>
      )
  }
}

const mapStateToProps = function(store) {
  return {
    userToken: store.myReducer.userToken
  };
}

export default connect(mapStateToProps)(RecentMics)


