import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import {
    setAllowRegistration,
    setDisableBalanceAdd,
    setDisableBalanceEdit,
    setDisableDelete
} from '../../Actions/SettingsAction';

import ReturnButton from '../Layout/ReturnButton/ReturnButton';

class Settings extends Component {

    aDisableBalanceChange = () => {
        const { setDisableBalanceAdd } = this.props;

        setDisableBalanceAdd();
    };

    eDisableBalanceChange = () => {
        const { setDisableBalanceEdit } = this.props;

        setDisableBalanceEdit();
    };

    allowRegistrationChange = () => {
        const { setAllowRegistration } = this.props;

        setAllowRegistration();
    };

    setDisableDeleteChange = () => {
        const { setDisableDelete } = this.props;

        setDisableDelete();
    };

    render() {
        const { settingsDb } = this.props;
        const {
            aDisableBalance,
            eDisableBalance,
            allowRegistration,
            disableDelete
        } = this.props.settings;

        return (
            <div>
                <div className="row">
                    <div className="col s6">
                        <ReturnButton link='/' text='Back To Dashboard' />
                    </div>
                </div>
                <div className="card">
                    <div className="card-content">
                        <span className="card-title">Edit Settings</span>
                        <div className='row'>
                            <form>
                                <p>
                                    <label>
                                        <input type="checkbox"
                                               name='allowRegistration'
                                               className="filled-in"
                                               checked={!!allowRegistration}
                                               onChange={this.allowRegistrationChange}
                                        />
                                        <span className='checkbox-brown'>Allow Registration</span>
                                    </label>
                                </p>
                                <p>
                                    <label>
                                        <input type="checkbox"
                                               name='disbleBalanceOnAdd'
                                               className="filled-in"
                                               checked={!!aDisableBalance}
                                               onChange={this.aDisableBalanceChange}
                                        />
                                        <span>Disable Balance On Add</span>
                                    </label>
                                </p>
                                <p>
                                    <label>
                                        <input type="checkbox"
                                               name='disbleBalanceOnEdit'
                                               className="filled-in"
                                               checked={!!eDisableBalance}
                                               onChange={this.eDisableBalanceChange}
                                        />
                                        <span>Disable Balance On Edit</span>
                                    </label>
                                </p>
                                <p>
                                    <label>
                                        <input type="checkbox"
                                               name='disbleDeleteClient'
                                               className="filled-in"
                                               checked={!!disableDelete}
                                               onChange={this.setDisableDeleteChange}
                                        />
                                        <span>Disable Delete Client</span>
                                    </label>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Settings.propTypes = {
    settings: PropTypes.object.isRequired,
    setDisableBalanceAdd: PropTypes.func.isRequired,
    setDisableBalanceEdit: PropTypes.func.isRequired
};

export default compose(
    firestoreConnect([
        {
            collection: 'settingsDb'
        }
    ]),
    connect(({ firestore: { ordered }, settings, auth }, props) => ({
        auth: auth,
        settings: settings,
        settingsDb: ordered.settingsDb && ordered.settingsDb[0]
    }), {
        setAllowRegistration,
        setDisableBalanceAdd,
        setDisableBalanceEdit,
        setDisableDelete
    })
)(Settings);