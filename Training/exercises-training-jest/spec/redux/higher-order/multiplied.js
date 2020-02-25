import {} from ''

// REDUCER: (state, action) => state

// define 'multiply Reducer' below:

export const multiplyReducer = (subReducer, prop = 'section') => {
    return (state={}, action) => {
        const propValue = action[prop] ?? 'default'
        const stateSlice = state[propValue] // { todos: [], filter: {current: "ALL"}}
        const newStateSlice = subReducer(stateSlice, action)

        return {
            ...state,
            [propValue]: newStateSlice
        }
    }
}