var React = require('react');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;


import Nav  from './Nav';
import Home from './Home';

import RecentMics from './RecentMics';
import ScrollListPublic from './ScrollListPublic';
import ScrollListPrivate from './ScrollListPrivate';
import ScrollDetail from './ScrollDetail';


class App extends React.Component {
	render(){
		return (
			<Router>
			<div className='container'>
			  <Nav/>
			  <Switch>
			    <Route exact path='/' component={Home} />
			    <Route exact path='/scrolls' component={ScrollListPublic} />
			    <Route exact path='/scrolls/:id' component={ScrollDetail} />
			    <Route path='/myscrolls' component={ScrollListPrivate} />
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


