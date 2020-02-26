import { combineReducers, createStore } from "redux"

const EMPLOYEE_REQUEST = 'EMPLOYEE_REQUEST'
const EMPLOYEE_REQUEST_SUCCESS = 'EMPLOYEE_REQUEST_SUCCESS'
const EMPLOYEE_REQUEST_FAILURE = 'EMPLOYEE_REQUEST_FAILURE'

const employeeRequest = (filters) => ({
  type: EMPLOYEE_REQUEST,
  filters
})

const employeeRequestSuccess = (data) => ({
  type: EMPLOYEE_REQUEST_SUCCESS,
  data
})

const employeeRequestFailure = (error) => ({
  type: EMPLOYEE_REQUEST_FAILURE,
  error
})

const initialState = {
  data: undefined,
  loading: false,
  error: undefined
}

const _employeeDataReducer = (state = initialState, action) => {
  switch(action.type){
    case EMPLOYEE_REQUEST:
      return { ...state, loading: true, error: undefined }

    case EMPLOYEE_REQUEST_SUCCESS:
      return { ...state, loading: false, data: action.data }

    case EMPLOYEE_REQUEST_FAILURE:
      return { ...state, loading: false, error: action.error, data: undefined }

    default:
      return state
  }
}

// koniec paździerza
// początek higher-order reducer

// generyczny tylko reducer

const genericDataReducer = (entity) =>
  (state = initialState, action) => {
    switch(action.type){
      case `${entity}_REQUEST`:
        return { ...state, loading: true, error: undefined }

      case `${entity}_REQUEST_SUCCESS`:
        return { ...state, loading: false, data: action.data }

      case `${entity}_REQUEST_FAILURE`:
        return { ...state, loading: false, error: action.error, data: undefined }

      default:
        return state
    }
  }

const employeeDataReducer = genericDataReducer('EMPLOYEE')
const officeDataReducer = genericDataReducer('OFFICE')

export const rootReducer = combineReducers({
  employee: employeeDataReducer,
  office: officeDataReducer
})

dispatch(fetchEmployees())
// dispatch({ type: "EMPLOYEE_REQUEST" })


// generyczne: constanty + akcje + reducer (wszystko)

const genericDataActions = (entity) => {
  const request = (filters) => ({
    type: `${entity}_REQUEST`,
    filters
  })
  
  const requestSuccess = (data) => ({
    type: `${entity}_REQUEST_SUCCESS`,
    data
  })
  
  const requestFailure = (error) => ({
    type: `${entity}_REQUEST_FAILURE`,
    error
  })

  return {
    request,
    requestSuccess,
    requestFailure
  }
}

const _employeeActions = genericDataActions('EMPLOYEE')
dispatch(_employeeActions.requestSuccess([]))



const genericDataHandlers = (entity) => {

  const reducer = (state = initialState, action) => {
    switch(action.type){
      case `${entity}_REQUEST`:
        return { ...state, loading: true, error: undefined }

      case `${entity}_REQUEST_SUCCESS`:
        return { ...state, loading: false, data: action.data }

      case `${entity}_REQUEST_FAILURE`:
        return { ...state, loading: false, error: action.error, data: undefined }

      default:
        return state
    }
  }

  const request = (filters) => ({
    type: `${entity}_REQUEST`,
    filters
  })
  
  const requestSuccess = (data) => ({
    type: `${entity}_REQUEST_SUCCESS`,
    data
  })
  
  const requestFailure = (error) => ({
    type: `${entity}_REQUEST_FAILURE`,
    error
  })

  const actions = {
    request,
    requestSuccess,
    requestFailure
  }

  const requestThunk = () => {}

  return {
    reducer,
    actions
  }
}

const {
  reducer: employeeReducer,
  thunk: requestThunk,
  actions: employeeActions
} = genericDataHandlers('EMPLOYEES')

const store = createStore(employeeReducer)
store.dispatch(employeeActions.request())

export const {
  reducer: officeReducer,
  actions: officeActions
} = genericDataHandlers('OFFICES')
