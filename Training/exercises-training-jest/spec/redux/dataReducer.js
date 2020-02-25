import { combineReducers } from "redux"

const EMPLOYEE_REQUEST = 'EMPLOYEE_REQUEST'
const EMPLOYEE_REQUEST_SUCCESS = 'EMPLOYEE_REQUEST_SUCCESS'
const EMPLOYEE_REQUEST_FAILURE = 'EMPLOYEE_REQUEST_FAILURE'

const employeeRequest = (filters) => ({
    type: EMPLOYEE_REQUEST,
    filters
})

const employeeRequestSuccess = (filters) => ({
    type: EMPLOYEE_REQUEST_SUCCESS,
    data
})

const employeeRequestFailure = (filters) => ({
    type: EMPLOYEE_REQUEST_FAILURE,
    error
})

const initialState = {
    data: undefined,
    loading: false,
    error: undefined
}

const employeeDataReducer = (state = initialState, action) => {
    switch(action.type) {
        case EMPLOYEE_REQUEST:
            return {...state, loading: true, error: undefined}
        case EMPLOYEE_REQUEST_SUCCESS:
            return {...state, loading: false, data: action.data}
        case EMPLOYEE_REQUEST_FAILURE:
            return {...state, loading: false, error: action.error, data: undefined}
        default:
            state
    }
}

// start of higher-order reducer

const genericDataReducer = (entity) => 
    (state = initialState, action) => {
        switch(action.type) {
            case `${entity}_REQUEST`:
                return {...state, loading: true, error: undefined}
            case `${entity}_REQUEST_SUCCESS`:
                return {...state, loading: false, data: action.data}
            case `${entity}_REQUEST_FAILURE`:
                return {...state, loading: false, error: action.error, data: undefined}
            default:
                state
        }
    }

const employeeDataReducer = genericDataReducer('EMPLOYEE')
const officeDataReducer = genericDataReducer('OFFICE')

export const rootReducer = combineReducers({
    employee: employeeDataReducer,
    office: officeDataReducer
})