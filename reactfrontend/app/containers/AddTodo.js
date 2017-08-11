import React from 'react'
import { connect } from 'react-redux'
import { addTodo, addUser } from '../actions'

let AddTodo = ({ dispatch }) => {
  let input

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        if (!input.value.trim()) {
          return
        }
        dispatch(addUser(input.value))
        input.value = ''
      }}>
        <input ref={node => {
          input = node
        }} />
        <button type="submit">
          Add USER
        </button>
      </form>

    </div>
  )
}
AddTodo = connect()(AddTodo)

export default AddTodo
