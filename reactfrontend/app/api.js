var axios = require('axios');

import store from './store'
import config from './config'

//singleton https://k94n.com/es6-modules-single-instance-pattern
class API {
	constructor(){
		console.log('api initialized using')
		var token = 'Token ' + store.getState().myReducer.userToken
		console.log(token)

		this.axios = axios.create({
		  baseURL: config.hostname,
		});
		this.axios.defaults.headers.common['Authorization'] = token;
	}


}
export let api = new API();