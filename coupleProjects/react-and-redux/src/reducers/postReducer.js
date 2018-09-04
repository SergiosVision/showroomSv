import { FETCH_POSTS, NEW_POST } from "../actions/types";

const initialState = {
  items: [],
  item: {},
  loading: true
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_POSTS:
            return {
                ...state,
                items: action.payload.posts,
                loading: action.payload.loading
            };
        case NEW_POST:
            return {
                ...state,
                item: action.payload
            };
        default:
            return state;

    }
}