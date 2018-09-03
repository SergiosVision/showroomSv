import React, { Component } from 'react';
import axios from 'axios';


class PostForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: ''
        };

        this.changeHandler = this.changeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    changeHandler(e) {
        this.setState({ [e.target.id]: e.target.value })
    }

    submitHandler(e) {
        e.preventDefault();
        const { title, description } = this.state;
        const post = {
            title,
            description
        };

        axios.post('https://jsonplaceholder.typicode.com/posts', {
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(post)
        })
            .then(res => res.data)
            .then(data => console.log(data))
    }

    render() {
        const { title, description } = this.state;
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
                            <input id="description"
                                   placeholder='Description'
                                   type="text"
                                   className="validate"
                                   value={description}
                                   onChange={this.changeHandler}/>
                        </div>
                    </div>
                    <button className="btn">Submit</button>
                </form>
            </div>
        )
    }
}

export default PostForm;