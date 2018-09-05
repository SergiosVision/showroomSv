import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Page404 extends Component {
    render() {
        return (
            <div className='row'>
                <h1>404</h1>
                <h3>Page Not Found :(</h3>
                <h4>
                    <Link to='/'>Return Home</Link>
                </h4>
            </div>
        );
    }
}

export default Page404;