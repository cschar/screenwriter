var React = require('react');
var ReactDOM = require('react-dom');

var PropTypes = require('prop-types');
//valid because  in webpack:
// { test: /\.css$/, use: [ 'style-loader', 'css-loader' ]}
require('./index.css'); 

var App = require('./components/App.js');
// state
// lifecycle event
// UI

ReactDOM.render( <App/>, document.getElementById('app'))