import React, {Component} from 'react';
import Router from '../../../Router/Router';

class Main extends Component {
    componentWillUpdate() {
        window.scrollTo(0, 0);
    }
    render() {
        return (
            <main>
                <div className="container">
                    <Router />
                </div>
            </main>
        );
    }
}

export default Main;