import { createStore } from 'redux'

import { rootReducer } from '../todomvc/reducers'
import { addTodo, editTodo, deleteTodo, markTodo, markAll, clearMarked, setFilter } from './actions'

// define `multiplyReducer` below:
var prop = 'section'
var multiplyReducer

let store

describe('Multiplied Reducer', () => {
  beforeEach(() => {
    store = createStore(
      multiplyReducer(rootReducer)
    )
  })

  it('should initialize the default key', () => {
    expect(store.getState()).toEqual({
      "default": {
        "filter": "ALL",
        "todos": []
      }
    })
  })

  it(`should group actions and states per each key:
      - milk x1`, () => {
    store.dispatch(addTodo('milk x1', 'shopping'))

    expect(store.getState()).toEqual({
      "default": {
        "filter": "ALL",
        "todos": []
      },
      "shopping": {
        "filter": "ALL",
        "todos": [
          {
            "id": 0,
            "marked": false,
            "text": "milk x1"
          }
        ]
      }
    })
  })

  it(`should group actions and states per each key:
      - milk x1, beer x3, beef`, () => {
    store.dispatch(addTodo('milk x1', 'shopping'))
    store.dispatch(addTodo('beer x3', 'shopping'))
    store.dispatch(addTodo('beef', 'shopping'))

    expect(store.getState()).toEqual({
      "default": {
        "filter": "ALL",
        "todos": []
      },
      "shopping": {
        "filter": "ALL",
        "todos": [
          {
            "id": 2,
            "marked": false,
            "text": "beef"
          },
          {
            "id": 1,
            "marked": false,
            "text": "beer x3"
          },
          {
            "id": 0,
            "marked": false,
            "text": "milk x1"
          }
        ]
      }
    })
  })

  it(`should group actions and states per each key:
      - fix bugs, push to master, release the code, beer x13, weekend!`, () => {
    store.dispatch(addTodo('fix bugs', 'work'))
    store.dispatch(addTodo('push to master', 'work'))
    store.dispatch(addTodo('release the code', 'work'))
    store.dispatch(addTodo('beer x13', 'shopping'))
    store.dispatch(addTodo('weekend!', 'freetime'))

    expect(store.getState()).toEqual({
      "default": {
        "filter": "ALL",
        "todos": []
      },
      "freetime": {
        "filter": "ALL",
        "todos": [
          {
            "id": 0,
            "marked": false,
            "text": "weekend!"
          }
        ]
      },
      "shopping": {
        "filter": "ALL",
        "todos": [
          {
            "id": 0,
            "marked": false,
            "text": "beer x13"
          }
        ]
      },
      "work": {
        "filter": "ALL",
        "todos": [
          {
            "id": 2,
            "marked": false,
            "text": "release the code"
          },
          {
            "id": 1,
            "marked": false,
            "text": "push to master"
          },
          {
            "id": 0,
            "marked": false,
            "text": "fix bugs"
          }
        ]
      }
    })

    store.dispatch(markTodo(0, 'work'))
    store.dispatch(markTodo(1, 'work'))
    store.dispatch(markTodo(2, 'work'))
    store.dispatch(clearMarked('work'))

    expect(store.getState()).toEqual({
      "default": {
        "filter": "ALL",
        "todos": []
      },
      "freetime": {
        "filter": "ALL",
        "todos": [
          {
            "id": 0,
            "marked": false,
            "text": "weekend!"
          }
        ]
      },
      "shopping": {
        "filter": "ALL",
        "todos": [
          {
            "id": 0,
            "marked": false,
            "text": "beer x13"
          }
        ]
      },
      "work": {
        "filter": "ALL",
        "todos": []
      }
    })
  })
})
