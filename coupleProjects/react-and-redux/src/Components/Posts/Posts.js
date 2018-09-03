import React, { Component } from 'react';
import axios from 'axios';

import Loader from '../../Components/Loader/Loader';
import Card from '../../Components/Card/Card';

class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
    }
    componentWillMount() {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(res => res.data.splice(0, 10))
            .then(data => this.setState({ posts: data }))
    }
    render() {
        const { posts } = this.state;
        const postItems = posts.length ? (
            posts.map(post => {
                return <Card key={post.id} postData={post} />
            })
        ) : (
            <Loader />
        );
        return (
            <div>
                <h1 className='center'>Posts</h1>
                <div className="row">
                    {postItems}
                </div>
            </div>
        );
    }
}

export default Posts;