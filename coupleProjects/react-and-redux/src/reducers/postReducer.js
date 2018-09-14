import { FETCH_POSTS, FETCH_POST, NEW_POST } from "../actions/types";

const initialState = {
  items: [],
  item: {},
  post: {},
  loading: true,
  loadingSecond: true
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_POSTS:
            return {
                ...state,
                items: action.payload.posts,
                loading: action.payload.loading
            };
        case FETCH_POST:
            return {
                ...state,
                post: action.payload.exactPost,
                loadingSecond: action.payload.loading
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