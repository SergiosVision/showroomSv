import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <header>
                <nav className='teal lighten-1'>
                    <div className="container">
                        <div className="nav-wrapper">
                            <Link to='/' className="brand-logo">React-app</Link>
                            <ul id="nav-mobile" className="right hide-on-med-and-down">
                                <li><Link to='/' >Home</Link></li>
                                <li><Link to='/addPost'>Add Post</Link></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        );
    }
}

export default Header;