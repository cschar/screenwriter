import { combineReducers } from 'redux'
//import todos from './todos'
//import visibilityFilter from './visibilityFilter'
var axios = require('axios');


const initialState = {
  isLoading: false,
  user: 'MARY',
  userName: '',
  userImage: '',
  userToken: '',
};

const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_USER':
        console.log('add_user action:');
        console.log(action)
        console.log(state);

        return {
        ...state,
        user: action.text
      }
    case 'SET_USER_INFO':
      return {
        ...state,
        userName: action.userName,
        userImage: action.userImage
      }
    case 'SET_USER_TOKEN':
    var token = 'Token ' + action.userToken;
    // var token = 'Token ' + this.props.userToken;
    axios.defaults.headers.common['Authorization'] = token;
      return {
        ...state,
        userToken: action.userToken
      }
    case 'DEL_USER_INFO':
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
