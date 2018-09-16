import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const Alert = props => {
    const { message, messageType } = props;
    return(
        <div className={classnames('card',{
            'green darken-2': messageType === 'success',
            'red darken-1': messageType === 'error',
        })}>
            <div className="card-content">
                <h5 className='white-text'>{message}</h5>
            </div>
        </div>
    )
};

Alert.propTypes = {
    message: PropTypes.string.isRequired,
    messageType: PropTypes.string.isRequired
};

export default Alert;