import React, {Component} from 'react';
import Router from '../../../Router/Router';

class Main extends Component {
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