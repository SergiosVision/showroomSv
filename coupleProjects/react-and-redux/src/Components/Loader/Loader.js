import React, {Component} from 'react';

class Loader extends Component {
    render() {
        return (
            <div className="progress">
                <div className="indeterminate"></div>
            </div>
        );
    }
}

export default Loader;