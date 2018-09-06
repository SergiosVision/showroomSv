import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class NoContent extends Component {
    render() {
        const { message, redirect } = this.props;
        return (
            <div className="row">
                <h1 className='center'>{message}</h1>
                {
                    !!redirect && <h3 className='center'>
                        <Link className='teal-text lighten-1' to='/' >Home</Link>
                    </h3>
                }
            </div>
        );
    }
}

export default NoContent;