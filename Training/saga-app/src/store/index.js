import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'

import { delay, takeEvery, takeLatest } from 'redux-saga/effects'

function* januszowaSaga() {
    var c = 0
    while(true){
        yield delay(1000)
        console.log(`elo elo ${c++}`)
    }
}

const initialState = {}

export const rootReducer = (state = initialState, action) => state

export const getStore = () => {
    const sagaMiddleware = createSagaMiddleware()

    const middlewares = [thunk, sagaMiddleware]

    const store = createStore(rootReducer, 
        composeWithDevTools(
            applyMiddleware(...middlewares)
        )
    )

    sagaMiddleware.run(januszowaSaga)

    return store
}