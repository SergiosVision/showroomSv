import { POSTS } from '../actions'

const initialState = {
    posts: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case POSTS:
            return {
                ...state,
                posts: action.payload
            }
        default:
            return state
    }
}