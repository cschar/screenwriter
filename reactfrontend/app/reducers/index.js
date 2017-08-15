import { combineReducers } from 'redux'
//import todos from './todos'
//import visibilityFilter from './visibilityFilter'
// import {api} from '../api'
import axios from 'axios'

const initialState = {
  loading: false,
  upgraded: false,
  user: 'MARY',
  userName: null,
  userImage: '',
  userToken: null,
};

const myReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.loading
      }

    case 'SET_USER_INFO':
      return {
        ...state,
        userName: action.userName,
        userImage: action.userImage
      }
    case 'SET_USER_UPGRADE': 
      return {
        ...state,
        upgraded: action.upgraded
      }     

    case 'SET_USER_TOKEN':
      axios.defaults.headers.common['Authorization'] = 'Token ' + action.userToken;
      return {
        ...state,
        userToken: action.userToken
      }
    case 'DEL_USER_INFO':
      axios.defaults.headers.common['Authorization'] = '';
      return initialState

    default:
      return state
  }
}

const todos = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TODO':
        console.log('add todo');
        console.log(state);
        state.todos.push({
          id: action.id,
          text: action.text,
          completed: false
        });
        return state;

    case 'TOGGLE_TODO':
        console.log("toggle")
      //state.todos = state.todos.map(todo =>
      //  (todo.id === action.id)
      //    ? {...todo, completed: !todo.completed}
      //    : todo
      //)
        return state;
    default:
      return state
  }
}


const todoApp = combineReducers({
  todos,
  myReducer
  //visibilityFilter
})

export default todoApp
