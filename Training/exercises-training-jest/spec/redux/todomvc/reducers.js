import { ADD_TODO, DELETE_TODO, EDIT_TODO, MARK_TODO, MARK_ALL, CLEAR_MARKED, SET_FILTER, FILTERS } from './constants'

export const todosReducer = (state = [], action) => {
	switch (action.type) {
		case ADD_TODO:
			return [{
				id: (state.length === 0) ? 0 : state[0].id + 1,
				marked: false,
				text: action.text
			}, ...state]

		case DELETE_TODO:
			return state.filter(todo =>
				todo.id !== action.id
			)

		case EDIT_TODO:
			return state.map(todo =>
				todo.id === action.id ?
					{ ...todo, text: action.text } :
					todo
			)

		case MARK_TODO:
			// FIXME: toggle todo given by id
			return state.map(todo =>
				todo.id === action.id ?
					{ ...todo, marked: !todo.marked} :
					todo
			)

		case MARK_ALL:
			// FIXME: mark all (if not all are marked - mark all; if all are marked - unmark all)
			const allAreMarked = state.every(todo => todo.marked)
			return state.map(todo => ({...todo, marked: !allAreMarked}))

		case CLEAR_MARKED:
			// FIXME: remove all todos that are marked
			return state.filter(todo => !todo.marked)

		default:
			return state
	}
}

const initialFilterState = {
	current: FILTERS.ALL
};

export const filterReducer = (state = initialFilterState, action) => {
	switch (action.type) {
		case SET_FILTER:
			return { ...state, current: action.value }
			
		default:
			return state;
	}
};