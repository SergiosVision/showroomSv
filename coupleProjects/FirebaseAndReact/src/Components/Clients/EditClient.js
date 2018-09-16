import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase';

import Loader from '../Layout/Loader';
import ReturnButton from '../Layout/ReturnButton/ReturnButton';

class EditClient extends Component {
    constructor(props) {
        super(props);
        this.firstNameInput = React.createRef();
        this.lastNameInput = React.createRef();
        this.emailInput = React.createRef();
        this.phoneInput = React.createRef();
        this.balanceInput = React.createRef();

    }

    onSubmit = e => {
        e.preventDefault();

        const { client, firestore, history } = this.props;

        const updClient = {
            firstName: this.firstNameInput.current.value,
            lastName: this.lastNameInput.current.value,
            email: this.emailInput.current.value,
            phone: this.phoneInput.current.value,
            balance: this.balanceInput.current.value === '' ? 0 : this.balanceInput.current.value,
        };

        firestore.update({ collection: 'clients', doc: client.id }, updClient)
            .then(() => history.push(`/client/${client.id}`))

    };

    render() {
        const { client } = this.props;

        if (client) {
            return (
                <div>
                    <div className="row">
                        <div className="col m6">
                            <ReturnButton link={`/client/${client.id}`} text='Back To Details' />
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-content">
                            <span className='card-title'>Edit Client</span>
                            <div className="card-content">
                                <div className="row">
                                    <form className='col s12' onSubmit={this.onSubmit}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input defaultValue={client.firstName}
                                                       id="firstName"
                                                       name='firstName'
                                                       type="text"
                                                       placeholder='First Name'
                                                       className="validate"
                                                       ref={this.firstNameInput}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input defaultValue={client.lastName}
                                                       id="lastName"
                                                       name='lastName'
                                                       type="text"
                                                       placeholder='Last Name'
                                                       className="validate"
                                                       ref={this.lastNameInput}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input defaultValue={client.email}
                                                       id="email"
                                                       name='email'
                                                       type="email"
                                                       placeholder='Email'
                                                       className="validate"
                                                       ref={this.emailInput}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input defaultValue={client.phone}
                                                       id="phone"
                                                       name='phone'
                                                       type="tel"
                                                       placeholder='Phone'
                                                       className="validate"
                                                       ref={this.phoneInput}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input defaultValue={client.balance}
                                                       id="balance"
                                                       name='balance'
                                                       type="text"
                                                       placeholder='Balance'
                                                       className="validate"
                                                       ref={this.balanceInput}
                                                />
                                            </div>
                                        </div>
                                        <button type='submit' value='Save' className='btn-small brown darken-2'>Save</button>
                                        <Link to={`/client/${client.id}`} className='btn-small brown darken-2' style={{marginLeft: 10 + 'px'}}>Cancel</Link>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return <Loader />
        }
    }
}

EditClient.propTypes = {
    firestore: PropTypes.object.isRequired
};

export default compose(
    firestoreConnect(props => [
        { collection: 'clients', storeAs: 'client', doc: props.match.params.id }
    ]),
    connect(({ firestore: { ordered } }, props) => ({
        client: ordered.client && ordered.client[0]
    }))
)(EditClient);