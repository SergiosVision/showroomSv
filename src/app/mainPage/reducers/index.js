import { handleActions } from 'redux-actions'

import { GET_WORKS } from '../actions'

const initialState = {
    works: undefined
}

const handleGetWorks = (state = initialState, action) => {
    return {
        ...state,
        works: action.payload
    }
}

export default handleActions({
    [GET_WORKS]: handleGetWorks
}, initialState)