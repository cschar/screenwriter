import React from 'react'
import PropTypes from 'prop-types'
import Todo from './Todo'

const TodoList = ({ todos, onTodoClick }) => (
  <div>
      <h1> {todos.user}</h1>
  </div>
)


export default TodoList
