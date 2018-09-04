import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPost } from "../../actions/postActions";


class PostForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            author: ''
        };

        this.changeHandler = this.changeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    changeHandler(e) {
        this.setState({ [e.target.id]: e.target.value })
    }

    submitHandler(e) {
        e.preventDefault();
        const { title, content, author } = this.state;
        const post = {
            title,
            content,
            author
        };

        this.props.createPost(post);
    }

    render() {
        const { title, content, author } = this.state;
        return (
            <div>
                <h1 className='center'>Submit Form</h1>
                <form onSubmit={this.submitHandler}>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="title"
                                   placeholder='Title'
                                   type="text"
                                   className="validate"
                                   value={title}
                                   onChange={this.changeHandler}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="content"
                                   placeholder='Description'
                                   type="text"
                                   className="validate"
                                   value={content}
                                   onChange={this.changeHandler}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="author"
                                   placeholder='Author'
                                   type="text"
                                   className="validate"
                                   value={author}
                                   onChange={this.changeHandler}/>
                        </div>
                    </div>
                    <button className="btn">Submit</button>
                </form>
            </div>
        )
    }
}

PostForm.propTypes = {
    createPost: PropTypes.func.isRequired,
};

export default connect(null, { createPost })(PostForm);