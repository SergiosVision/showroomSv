import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { lifecycle } from 'recompose';
import { firestoreConnect } from 'react-redux-firebase';
import classnames from 'classnames';

import Loader from '../Layout/Loader';
import ReturnButton from '../Layout/ReturnButton/ReturnButton';

class ClientDetails extends Component {
    state = {
        showBalanceUpdate: false,
        balanceUpdateAmount: ''
    };

    onChange = e => this.setState({[e.target.name]: e.target.value});

    balanceSubmit = e => {
        e.preventDefault();
        const { client, firestore } = this.props;
        const { balanceUpdateAmount } = this.state;

        const clientUpdate = {
            balance: parseFloat(balanceUpdateAmount)
        };

        firestore.update({ collection: 'clients', doc: client.id }, clientUpdate)
            .then(() => this.setState({showBalanceUpdate: false}))
    };

    onDeleteClient = () => {
        const { client, firestore, history } = this.props;

        firestore.delete({ collection: 'clients', doc: client.id })
            .then(history.push('/'))
    };

    render() {
        const { client } = this.props;
        const { eDisableBalance, disableDelete } = this.props.settings;
        const { showBalanceUpdate, balanceUpdateAmount } = this.state;

        let balanceForm;

        if (showBalanceUpdate) {
            balanceForm = (
                <form onSubmit={this.balanceSubmit}>
                    <div className="input-field balance-form-wrapper">
                        <input id="balance"
                               type="text"
                               name='balanceUpdateAmount'
                               placeholder='Add New Balance'
                               value={balanceUpdateAmount}
                               onChange={this.onChange}
                               className='balance-input'
                        />
                        <input type="submit" disabled={balanceUpdateAmount === ''} value='Update' className='btn-small brown darken-2'/>
                    </div>
                </form>
            )
        } else {
            balanceForm = null;
        }

        if (client) {
            return(
                <div>
                    <div className="row">
                        <div className="col s6">
                            <ReturnButton link='/' text='Back To Dashboard' />
                        </div>
                        <div className="col s6">
                            <div className="btn-group right-align">
                                <Link style={{marginRight: 10 + 'px'}} to={`/client/edit/${client.id}`} className='btn-small brown darken-2'>Edit</Link>
                                <button onClick={this.onDeleteClient} disabled={disableDelete} className='btn-small brown darken-2'>Delete</button>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-content">
                            <span className="card-title">
                                {client.firstName} {client.lastName}
                            </span>
                            <div>
                                <div className="row">
                                    <div style={{paddingLeft: 0}} className="col m8 s6">
                                        <h6>Client ID: {' '}
                                            <span className="grey-text lighten-2">
                                                {client.id}
                                            </span>
                                        </h6>
                                    </div>
                                    <div className="col m4 s6">
                                        <h6 className='right-align up-balance'>
                                            Balance: <span className={classnames('up-balance-balance',{
                                            'grey-text lighten-2': client.balance === 0,
                                            'red-text darken-1':  client.balance < 0,
                                            'green-text darken-2': client.balance > 0
                                        })}>${parseFloat(client.balance).toFixed(2)}</span>
                                            <small>
                                                <button style={{marginLeft: 10 + 'px'}}
                                                        className='btn-small brown darken-2'
                                                        disabled={eDisableBalance}
                                                        onClick={() => this.setState({showBalanceUpdate: !this.state.showBalanceUpdate})}>
                                                    <i className="fas fa-pencil-alt"></i>
                                                </button>
                                            </small>
                                        </h6>
                                        {balanceForm}
                                    </div>
                                </div>
                                <hr/>

                                <ul>
                                    <li>Contact Email: {' '}
                                        <a href={`mail:${client.email}`}>{client.email}</a>
                                    </li>
                                    <li>Contact Phone: {' '}
                                        <a href={`tel:${client.phone}`}>{client.phone}</a>
                                    </li>
                                </ul>
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

ClientDetails.propTypes = {
    firestore: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired
};

export default compose(
    firestoreConnect(props => [
        { collection: 'clients', storeAs: 'client', doc: props.match.params.id }
    ]),
    lifecycle({
        componentWillMount() {
            this.props.firestore.get({ collection: 'clients', storeAs: 'client', doc: this.props.match.params.id });
        },
    }),
    connect(({ firestore: { ordered }, settings }, props) => ({
        client: ordered.client && ordered.client[0],
        settings: settings
    }))
)(ClientDetails);