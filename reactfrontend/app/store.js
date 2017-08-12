import { createStore } from 'redux'

import reducer from './reducers'

// replace w/ https://github.com/rt2zz/redux-persist
const persistedState = localStorage.getItem('reduxState')
 	? JSON.parse(localStorage.getItem('reduxState'))
 	: {}

console.log("loading persistedState as ")
console.log(persistedState)
//provided persistedState as initial argument to createStore
//https://stackoverflow.com/questions/33749759/read-stores-initial-state-in-redux-reducer/33791942#33791942
const store = createStore(
	reducer,
	persistedState
)


store.subscribe(()=>{
  localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})

module.exports = store;
