import { handleActions } from 'redux-actions'

import { SINGLE_WORK, SINGLE_WORK_CLEAR } from '../actions'

const initialState = {
    work: undefined
}

const handleGetWork = (state = initialState, action) => {
    return {
        ...state,
        work: action.payload
    }
}

const handleClearWork = (state = initialState) => {
    return {
        ...state,
        work: initialState.work
    }
}

export default handleActions({
    [SINGLE_WORK]: handleGetWork,
    [SINGLE_WORK_CLEAR]: handleClearWork
}, initialState)