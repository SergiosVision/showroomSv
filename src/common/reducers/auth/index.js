import {handleActions} from 'redux-actions'

import {USER} from '../../actions/auth'

const initialState = {
    user: false
}

const handleSetUser = (state = initialState, action) => {
    return {
        ...state,
        user: action.payload
    }
}

export default handleActions({
    [USER]: handleSetUser
}, initialState)