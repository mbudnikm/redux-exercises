// import {} from ''

// REDUCER: (state, action) => state

// HIGHER-ORDER REDUCER
export const multiplyReducer = (subReducer, prop = 'section') => {
  return (state = {}, action) => {
    const propValue = action[prop] ?? 'default' // e.g. shopping, work, etc.

    const stateSlice = state[propValue]
      // { todos: [], filter: { current: "ALL" }}
    const newStateSlice = subReducer(stateSlice, action)
    
    return {
      ...state,
      [propValue]: newStateSlice
    }
  }
}

export const multiplyReducerNoDefaultVersion = (subReducer, prop = 'section') => {
  return (state = {}, action) => {
    // const propValue = action[prop] ?? 'default' // e.g. shopping, work, etc.
    const propValue = action[prop]
    if (!propValue){
      return state
    } else {
      const stateSlice = state[propValue]
        // { todos: [], filter: { current: "ALL" }}
      const newStateSlice = subReducer(stateSlice, action)
      
      return {
        ...state,
        [propValue]: newStateSlice
      }
    }
  }

const exampleMultipliedState_BEFORE = {
  default: {
    todos: [],
    filter: { current: "ALL" }
  },
  shopping: {
    todos: [],
    filter: { current: "ALL" }
  },
  home: {
    todos: [],
    filter: { current: "ALL" }
  },
}

const exampleMultipliedState_AFTER = {
  shopping: {
    todos: [],
    filter: { current: "COMPLETED" }
  },
  home: {
    todos: [],
    filter: { current: "ALL" }
  },
}

