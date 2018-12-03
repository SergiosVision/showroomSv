import { WORKS_LOADING, SINGLE_WORK } from '../actions'

const initialState = {
    works: [],
    work: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case WORKS_LOADING:
            return {
                ...state,
                works: action.payload
            }
        case SINGLE_WORK:
            return {
                ...state,
                work: action.payload
            }
        default:
            return state
    }
}