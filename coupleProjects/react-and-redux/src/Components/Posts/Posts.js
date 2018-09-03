import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts } from "../../actions/postActions";

import Loader from '../../Components/Loader/Loader';
import Card from '../../Components/Card/Card';

class Posts extends Component {
    componentWillMount() {
        this.props.fetchPosts();
    }
    componentWillReceiveProps(nextProps) {
        const { posts } = this.props;
        if (nextProps.newPost) {
            posts.unshift(nextProps.newPost);
        }
    }
    render() {
        const { posts } = this.props;
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

Posts.propTypes = {
    fetchPosts: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired,
    newPost: PropTypes.object
};

const mapStateToProps = state => ({
    posts: state.posts.items,
    newPost: state.posts.item
});

export default connect(mapStateToProps, { fetchPosts })(Posts);