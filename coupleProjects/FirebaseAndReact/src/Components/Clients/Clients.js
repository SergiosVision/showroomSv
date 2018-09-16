import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { lifecycle } from 'recompose';
import { firestoreConnect } from 'react-redux-firebase';

import Loader from '../Layout/Loader';

class Clients extends Component {
    state = {
        totalOwd: null
    };

    static getDerivedStateFromProps(props, state) {
        const { clients } = props;

        if (clients) {
            const total = clients.reduce((total, client) => {
                return total + parseFloat(client.balance.toString());
            }, 0);

            return { totalOwd: total }
        }

        return null;
    }

    render() {
        const { clients } = this.props;
        const  { totalOwd } = this.state;

        if (clients) {
            return (
                <div>
                    <div className="row">
                        <div className="col m6">
                            <h2><i className="fas fa-users" />Clients</h2>
                        </div>
                        <div className="col m6">
                            <h5 className='right-align grey-text lighten-2'>
                                Total Owed:{' '}
                                <span className='blue-text darken-1'>
                                    ${parseFloat(totalOwd).toFixed(2)}
                                </span>
                            </h5>
                        </div>
                    </div>
                    <table>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Balance</th>
                            <th />
                        </tr>
                        </thead>
                        <tbody>
                        {
                            clients.map(client => {
                                return (<tr key={client.id}>
                                    <td>{client.firstName} {client.lastName}</td>
                                    <td>{client.email}</td>
                                    <td>${parseFloat(client.balance).toFixed(2)}</td>
                                    <td>
                                        <Link to={`/client/${client.id}`} className='btn-small brown darken-2'>
                                            <i className="fas fa-arrow-circle-right" /> Details
                                        </Link>
                                    </td>
                                </tr>)
                            })
                        }
                        </tbody>
                    </table>
                </div>
            )
        } else {
            return <Loader />
        }
    }
}

Clients.propTypes = {
    firestore: PropTypes.object.isRequired,
    clients: PropTypes.array
};

export default compose(
    firestoreConnect([{ collection: 'clients' }]),
    lifecycle({
        componentWillMount() {
            this.props.firestore.get({ collection: 'clients'});
        }
    }),
    connect((state, props) => ({
        clients: state.firestore.ordered.clients
    }))
)(Clients);