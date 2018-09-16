import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux'
import { connect } from 'react-redux'
import {firebaseConnect, firestoreConnect} from 'react-redux-firebase';

import placeHolderImg from '../../Images/Placeholder.png';

class AppNavBar extends Component {
    state = {
        isAuthenticated: false
    };

    static getDerivedStateFromProps(props, state) {
        const { auth } = props;

        if (auth.uid) {
            return { isAuthenticated: true }
        } else {
            return { isAuthenticated: false }
        }
    }

    onLogOutClick = e => {
        e.preventDefault();

        const { firebase } = this.props;

        firebase.logout();
    };

    render() {
        const { isAuthenticated } = this.state;
        const { allowRegistration } = this.props.settings;


        return (
            <nav className='brown darken-2'>
                <div className="container">
                    <div className="nav-wrapper">
                        <Link to='/' className="brand-logo">ClientPanel</Link>
                        {
                            isAuthenticated &&
                            <ul className="right hide-on-med-and-down">
                                <li>
                                    <NavLink to='/profile'>
                                        <i className="fas fa-users-cog"></i>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/settings'>
                                        <i className="fas fa-cog"></i>
                                    </NavLink>
                                </li>
                                <li onClick={this.onLogOutClick}>
                                    <a href="!#"><i className="fas fa-sign-out-alt"></i></a>
                                </li>
                            </ul>
                        }
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            {
                                isAuthenticated &&
                                <li>
                                    <NavLink to='/'>
                                        <i className="fas fa-columns"></i>
                                    </NavLink>
                                </li>
                            }
                            {
                                allowRegistration && !isAuthenticated &&
                                    <li>
                                        <Link to='/signup'>
                                            Registration
                                        </Link>
                                    </li>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

AppNavBar.propTypes = {
    firebase: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired
};

export default compose(
    firebaseConnect(),
    connect((state, props) => ({
        auth: state.firebase.auth,
        settings: state.settings,
    }))
)(AppNavBar);