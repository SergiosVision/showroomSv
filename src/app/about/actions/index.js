export const POSTS = 'POSTS/GET'

export const getPosts = (posts) => dispatch => {
    dispatch({
        type: POSTS,
        payload: posts
    })
}