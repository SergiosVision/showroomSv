import { FETCH_POSTS, NEW_POST } from "./types";
import axios from 'axios';

export const fetchPosts = () => dispatch => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(res => res.data.splice(0, 10))
        .then(posts => dispatch({
            type: FETCH_POSTS,
            payload: posts
        }))
};

export const createPost = (postData) => dispatch => {
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(postData),
    })
        .then(res => res.json())
        .then(post => dispatch({
            type: NEW_POST,
            payload: post
        }));

    // axios.post('https://jsonplaceholder.typicode.com/posts', {
    //     headers: {
    //         'content-type': 'application/json'
    //     },
    //     body: JSON.stringify(postData),
    // })
    //     .then(res => res.data)
    //     .then(post => dispatch({
    //         type: NEW_POST,
    //         payload: post
    //     }))
};