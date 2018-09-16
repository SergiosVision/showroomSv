import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase';

import ReturnButton from '../Layout/ReturnButton/ReturnButton';

class AddClient extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        balance: '',
    };

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onSubmit = (e) => {
        e.preventDefault();
        const newClient = this.state;

        const { firestore, history } = this.props;

        if (newClient.balance === '') {
            newClient.balance = 0;
        }

        firestore.add({ collection: 'clients' }, newClient)
            .then(() => history.push('/'))

    };

    render() {
        const { aDisableBalance } = this.props.settings;

        return (
            <div>
                <div className="row">
                    <div className="col m6">
                        <ReturnButton link='/' text='Back To Dashboard' />
                    </div>
                </div>

                <div className="card">
                    <div className="card-content">
                        <span className='card-title'>Add Client</span>
                        <div className="card-content">
                            <div className="row">
                                <form className='col s12' onSubmit={this.onSubmit}>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input onChange={this.onChange}
                                                   value={this.state.firstName}
                                                   id="firstName"
                                                   name='firstName'
                                                   type="text"
                                                   placeholder='First Name'
                                                   className="validate"
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input onChange={this.onChange}
                                                   value={this.state.lastName}
                                                   id="lastName"
                                                   name='lastName'
                                                   type="text"
                                                   placeholder='Last Name'
                                                   className="validate"
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input onChange={this.onChange}
                                                   value={this.state.email}
                                                   id="email"
                                                   name='email'
                                                   type="email"
                                                   placeholder='Email'
                                                   className="validate"
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input onChange={this.onChange}
                                                   value={this.state.phone}
                                                   id="phone"
                                                   name='phone'
                                                   type="tel"
                                                   placeholder='Phone'
                                                   className="validate"
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input onChange={this.onChange}
                                                   value={this.state.balance}
                                                   id="balance"
                                                   name='balance'
                                                   type="text"
                                                   placeholder='Balance'
                                                   className="validate"
                                                   disabled={aDisableBalance}
                                            />
                                        </div>
                                    </div>
                                    <button type='submit' value='Submit' className='btn-small brown darken-2'>Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

AddClient.propTypes = {
    firestore: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired
};

export default compose(
    firestoreConnect(),
    connect((state, props) => ({
        settings: state.settings
    }))
)(AddClient);