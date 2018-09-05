import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchSinglePost } from '../../actions/postActions';
import Posts from "../Posts/Posts";

import Loader from '../Loader/Loader';
import Card from '../DefaultComponents/Card/Card';

class SinglePosts extends Component {
    componentWillMount() {
        let id = this.props.match.params.id;
        this.props.fetchSinglePost(id)
    }
    render() {
        const { post, loading } = this.props;
        return (
            <div className="row">
                <h1 className='center'>{
                    loading ? 'Loading...' : post.title
                }</h1>
                {
                    loading ? <Loader /> : <Card postData={post} single={true} />
                }
            </div>
        );
    }
}

Posts.propTypes = {
    fetchSinglePost: PropTypes.func,
    post: PropTypes.object
};

const mapStateToProps = state => ({
    loading: state.posts.loadingSecond,
    post: state.posts.post
});

export default connect(mapStateToProps, {fetchSinglePost})(SinglePosts);