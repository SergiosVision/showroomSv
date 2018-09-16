import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { notifyUser } from '../../Actions/NotifyAction';

import Alert from '../Layout/Alert';

class Login extends Component {
    state = {
        email: '',
        password: ''
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    };

    onSubmit = e => {
        e.preventDefault();

        const { firebase, notifyUser } = this.props;
        const { email, password } = this.state;
        const loginData = { email, password };

        firebase.login(loginData)
            .then(notifyUser(null, null))
            .catch(error => notifyUser(error.message, 'error'))

    };

    componentWillMount() {
        const { notifyUser } = this.props;

        notifyUser(null, null)
    }

    render() {
        const { message, messageType } = this.props.notify;

        return (
            <div className='row'>
                <div className="col s6 offset-s3">
                    <div className="card">
                        <div className="card-content">
                            {
                                message &&
                                <Alert message={message} messageType={messageType} />
                            }
                            <span className='card-title center-align'>
                                <span>
                                    <i className="fas fa-lock brown-text darken-2"></i> Login
                                </span>
                            </span>
                            <div>
                                <form onSubmit={this.onSubmit}>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input id="email"
                                                   type="email"
                                                   name='email'
                                                   placeholder='Email'
                                                   required
                                                   value={this.state.email}
                                                   onChange={this.onChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input id="password"
                                                   type="password"
                                                   name='password'
                                                   placeholder='Password'
                                                   required
                                                   value={this.state.password}
                                                   onChange={this.onChange}

                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <button className="btn-small col s12 brown darken-2">Login</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Login.propTypes = {
    firebase: PropTypes.object.isRequired,
    notify: PropTypes.object.isRequired,
    notifyUser: PropTypes.func.isRequired
};

export default compose(
    firebaseConnect(),
    connect((state, props) => ({
        notify: state.notify
    }), { notifyUser })
)(Login);