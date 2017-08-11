var React = require('react');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;


var Nav = require('./nav.js');

import Home from './Home';
import {ScrollList} from './ScrollList';
import {RecentMics} from './RecentMics';
import {ScrollContainer} from './ScrollContainer';


class App extends React.Component {
	render(){
		return (
			<Router>
			<div className='container'>
			  <Nav/>
			  <Switch>
			    <Route exact path='/' component={Home} />
			    <Route path='/scrolls' component={ScrollContainer} />
          <Route path='/recentmics' component={RecentMics} />
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


