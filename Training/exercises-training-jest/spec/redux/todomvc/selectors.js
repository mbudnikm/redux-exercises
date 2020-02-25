// implement selector functions
// you can write them as simple functions, but it's advised to use `reselect` npm package

import { FILTERS } from "./constants"

// tips:
// - don't copy filter values, use `constants` file (DRY)
// - use https://github.com/reactjs/reselect 

export const getTodosCount = (state) => state.todos.length

export const getActiveTodos = (state) => state.todos.filter(todo => !todo.marked)

export const getCompletedTodos = (state) => state.todos.filter(todo => todo.marked)

export const getVisibleTodos = (state) => {
    switch(state.filter.current) {
        case FILTERS.COMPLETED:
            return getCompletedTodos(state)
        case FILTERS.ACTIVE:
            return getActiveTodos(state)
        case FILTERS.ALL:
            return state.todos
        default:
            return state.todos
    }

    // solution (2)
    /* const fnMap = {
        [FILTERS.ALL]: () => true,
        [FILTERS.COMPLETED]: todo => todo.marked,
        [FILTERS.ACTIVE]: todo => !todo.marked
    } 

    export const getVisibleTodos = (state) => 
        state.todos.filter(fnMap[state.filter.current]) */
}
