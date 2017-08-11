
//valid because  in webpack:
// { test: /\.css$/, use: [ 'style-loader', 'css-loader' ]}
require('./index.css'); 

// state
// lifecycle event
// UI
import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
//import App from './components/TODOApp'
import store from './store'

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
