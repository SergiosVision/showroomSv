import { FETCH_POSTS, NEW_POST } from "./types";
import { getCollection } from '../config/firebase';

export const fetchPosts = () => dispatch => {
    getCollection('posts').dataBaseOnce
        .then(res => res.val())
        .then(data => {
            let array = [];
            for (let key in data) {
                array.push({
                    id: key,
                    author: data[key].author,
                    categories: data[key].categories,
                    content: data[key].content,
                    title: data[key].title,
                })
            }
            return array;
        })
        .then(posts => dispatch ({
            type: FETCH_POSTS,
            payload: posts
        }))
};

export const createPost = (postData) => dispatch => {
    let key;
    const post = {
        title: postData.title,
        content: postData.content,
        author: postData.author,
        categories: ''
    };
    getCollection('posts').dataBase.push(post)
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