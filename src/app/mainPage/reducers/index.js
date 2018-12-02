import { WORKS_LOADING } from '../actions'

const initialState = {
    works: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case WORKS_LOADING:
            return {
                ...state,
                works: action.payload
            }
        default:
            return state
    }
}