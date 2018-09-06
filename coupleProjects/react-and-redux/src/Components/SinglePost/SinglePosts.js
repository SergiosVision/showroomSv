import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchSinglePost } from '../../actions/postActions';
import Posts from "../Posts/Posts";
import NoContent from '../../Components/NoContent/NoContent';

import Loader from '../Loader/Loader';
import Card from '../DefaultComponents/Card/Card';

class SinglePosts extends Component {
    componentWillMount() {
        const { fetchSinglePost } = this.props;
        let id = this.props.match.params.id;
        fetchSinglePost(id);
    }
    render() {
        const { post, loading } = this.props;
        let content;
        let titleControl;

        if (loading) {
            titleControl = 'Loading...';
            content = <Loader />;
        } else if (post === false) {
            content = <NoContent message='Page Not Found' redirect={true} />
        } else {
            titleControl = post.title;
            content = <Card postData={post} single={true} />;
        }

        return (
            <div className="row">
                <h1 className='center'>
                    {titleControl}
                </h1>
                {content}
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