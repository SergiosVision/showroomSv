import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ReturnButton extends Component {
    render() {
        const  { link, text } = this.props;

        return (
            <div>
                <Link to={link} className='btn-small brown darken-2'>
                    <i className="fas fa-arrow-circle-left" /> {text}
                </Link>
            </div>
        )
    }
}

export default ReturnButton;