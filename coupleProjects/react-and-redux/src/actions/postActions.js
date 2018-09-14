import { FETCH_POSTS, FETCH_POST, NEW_POST } from "./types";
import { db } from '../config/firebase';

export const fetchPosts = () => (dispatch) => {
    db('posts').DBRO
        .then(res => res.val())
        .then(data => {
            let posts = [];
            for (let key in data) {
                posts.push({
                    id: key,
                    author: data[key].author,
                    categories: data[key].categories,
                    content: data[key].content,
                    title: data[key].title,
                })
            }
            return posts;
        })
        .then(posts => dispatch ({
            type: FETCH_POSTS,
            payload: {
                posts: posts,
                loading: false
            },
        }))
};

export const fetchSinglePost = (postId) => (dispatch) => {
    db('posts').DBRO
        .then(res => res.val())
        .then(data => {
            let posts = [];
            for (let key in data) {
                posts.push({
                    id: key,
                    author: data[key].author,
                    categories: data[key].categories,
                    content: data[key].content,
                    title: data[key].title,
                })
            }
            return posts;
        })
        .then(posts => {
            return posts.find(post => {
                return post.id === postId
            })
        })
        .then(singlePost => dispatch ({
            type: FETCH_POST,
            payload: {
                exactPost: singlePost,
                loading: false
            }
        }))
};

export const createPost = (postData) => dispatch => {
    let key;
    const post = {
        title: postData.title,
        content: postData.content,
        author: postData.author,
    };
    db('posts').DBR.push(post)
        .then(data => {
            key = data.key;
            return key;
        })
        .then(key => {
            let comItems = {
                ...post,
                id: key
            };
            return comItems;
        })
        .then(post => dispatch ({
            type: NEW_POST,
            payload: post
        }))
};