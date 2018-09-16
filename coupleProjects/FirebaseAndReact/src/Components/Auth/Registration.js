import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect, firestoreConnect } from 'react-redux-firebase';
import { notifyUser } from '../../Actions/NotifyAction';

import Alert from "../Layout/Alert";

class Registration extends Component {
    state = {
        email: '',
        phoneNumber: '',
        password: ''
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    };

    onSubmit = e => {
        e.preventDefault();

        const { firebase, notifyUser } = this.props;
        const { email, password } = this.state;
        const registrationData = { email, password };

        firebase.createUser(registrationData)
            .then((data) => {
                const  { firestore } = this.props;
                const currentUser = firebase.auth().currentUser.uid;
                const addProfileFields = {
                    firstName: null,
                    lastName: null,
                    photoURL: null,
                    phoneNumber: null
                };

                firestore.update({collection: 'users', doc: currentUser}, addProfileFields)
                    .catch(error => console.log(error));

                notifyUser(null, null);
            })
            .catch(error => notifyUser(error.message, 'error'))

    };

    componentWillMount() {
        const { notifyUser, history } = this.props;
        const { allowRegistration } = this.props.settings;

        if (!allowRegistration) {
            history.push('/');
        }

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
                                    <i className="fas fa-user-plus brown-text darken-2"></i> Registration
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
                                        <button className="btn-small brown darken-2 col s12">Register</button>
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

Registration.propTypes = {
    firebase: PropTypes.object.isRequired,
    firestore: PropTypes.object.isRequired,
    notify: PropTypes.object.isRequired,
    notifyUser: PropTypes.func.isRequired,
    settings: PropTypes.object.isRequired
};

export default compose(
    firebaseConnect(),
    firestoreConnect(),
    connect((state, props) => ({
        notify: state.notify,
        settings: state.settings,
    }), { notifyUser })
)(Registration);