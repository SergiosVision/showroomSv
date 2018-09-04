import React, {Component} from 'react';

class NoContent extends Component {
    render() {
        const { word } = this.props;
        return (
            <div className="row">
                <h1 className='center'>No {word} yet. :(</h1>
            </div>
        );
    }
}

export default NoContent;