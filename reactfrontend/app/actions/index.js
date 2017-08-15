let nextTodoId = 0
export const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
})



export const setUserInfo = (userName, userImage) => ({
  type: 'SET_USER_INFO',
  userName: userName,
  userImage: userImage
})

export const setUserToken = (userToken) => ({
  type: 'SET_USER_TOKEN',
  userToken: userToken
})

export const setVisibilityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id
})
