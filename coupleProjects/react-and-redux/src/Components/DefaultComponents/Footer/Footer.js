import React, {Component} from 'react';
import { Link } from  'react-router-dom';

class Footer extends Component {
    render() {
        return (
            <footer className="page-footer teal lighten-1">
                <div className="container">
                    <div className="row">
                        <div className="col l4 offset-l2 s12">
                            <h5 className="white-text">Links</h5>
                            <ul>
                                <li><Link className="grey-text text-lighten-3" to='/'>Home</Link></li>
                                <li><Link className="grey-text text-lighten-3" to="/addPost">Add Post</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="footer-copyright">
                    <div className="container">
                        © {new Date().getFullYear()} SergiosVision
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;