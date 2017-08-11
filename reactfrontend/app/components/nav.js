var React = require('react');
// var Link = require('react-router-dom').Link;

var NavLink = require('react-router-dom').NavLink;


function Nav () {
	return (
			<ul className='nav'>
				<li>
			     <NavLink exact activeClassName='active' to='/'>
			   	  	Home
			   	  </NavLink>
			   </li>
			   <li>
			     <NavLink exact activeClassName='active' to='/scrolls'>
			   	  	Continuous
			   	  </NavLink>
			   </li>
			   <li>
			     <NavLink exact activeClassName='active' to='/myscrolls'>
			   	  	my scrolls
			   	  </NavLink>
			   </li>
			   <li>
			   	  <NavLink exact activeClassName='active' to='/recentmics'>
			   	  	RecentMics
			   	  </NavLink>
			   </li>
			   
			</ul>
		)
}


module.exports = Nav;