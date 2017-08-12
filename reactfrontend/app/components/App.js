var React = require('react');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;


var Nav = require('./nav.js');

import Home from './Home';
import {ScrollList} from './ScrollList';
import {RecentMics} from './RecentMics';
import {ScrollContainer, MyScrolls} from './ScrollContainer';
import ScrollDetail from './ScrollDetail';


class App extends React.Component {
	render(){
		return (
			<Router>
			<div className='container'>
			  <Nav/>
			  <Switch>
			    <Route exact path='/' component={Home} />
			    <Route exact path='/scrolls' component={ScrollContainer} />
			    <Route exact path='/scrolls/:id' component={ScrollDetail} />
			    <Route path="/tacos" component={Tacos}/>
			    <Route path='/myscrolls' component={MyScrolls} />
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

// when the url matches `/tacos` this component renders
const Tacos  = ({ match }) => (
  // here's a nested div
  <div>
    {/* here's a nested Route,
        match.url helps us make a relative path */}
    <Route
      path={match.url + '/carnitas'}
      component={RecentMics}
    />
  </div>
)

module.exports = App;


