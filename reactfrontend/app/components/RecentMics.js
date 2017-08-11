import React from 'react';
import axios from 'axios'



class RecentMics extends React.Component {

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
    
  }

  render() {
    return (<div>
      RecentMics
    </div>)
  }
}

module.exports = {RecentMics};

