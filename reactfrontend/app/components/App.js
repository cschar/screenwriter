var React = require('react');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;

var Popular = require('./popular.js');
var Nav = require('./nav.js');
var Home = require('./Home.js');
var Battle = require('./Battle.js');
var Results = require('./Results.js');
// var Scroll = require('./Scroll.js');

import {ScrollContainer} from '../scrollComponents/Scroll';


class App extends React.Component {
	render(){
		return (
			<Router>
			<div className='container'>
			  <Nav/>
			  <Switch>
			    <Route exact path='/' component={ScrollContainer} />
          <Route path='/popular' component={Popular} />
          <Route exact path='/home' component={Home} />
          <Route exact path='/battle' component={Battle} />
					<Route path='/battle/results' component={Results} />
          <Route render={function () {
          	return <p> Not Found </p>
          }} />
        </Switch>
			</div>

			</Router>
			
			
		)
	}
}

module.exports = App;


