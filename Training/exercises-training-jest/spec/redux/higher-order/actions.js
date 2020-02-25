import { ADD_TODO, DELETE_TODO, EDIT_TODO, MARK_TODO, MARK_ALL, CLEAR_MARKED, SET_FILTER } from '../todomvc/constants'

export const addTodo = (text, section = 'default') => ({
	type: ADD_TODO,
  text,
  section
})

export const deleteTodo = (id, section = 'default') => ({
	type: DELETE_TODO,
  id,
  section
})

export const editTodo = (id, text, section = 'default') => ({
	type: EDIT_TODO,
	id,
  text,
  section
})

export const markTodo = (id, section = 'default') => ({
	type: MARK_TODO,
	id,
  section
})

export const markAll = (section = 'default') => ({
	type: MARK_ALL,
  section
})

export const clearMarked = (section = 'default') => ({
	type: CLEAR_MARKED,
  section
})

export const setFilter = (filter, section = 'default') => ({
	type: SET_FILTER,
	filter,
  section
})
