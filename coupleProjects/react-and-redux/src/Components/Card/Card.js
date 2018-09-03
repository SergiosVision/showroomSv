import React, { Component } from 'react';

class Card extends Component {
    render() {
        const { postData } = this.props;
        return (
            <div className='col s12'>
               <div className="card">
                   <div className="card-content">
                       <div className="card-title">
                           <span>{postData.title}</span>
                       </div>
                       <p>{postData.body}</p>
                   </div>
               </div>
            </div>
        );
    }
}

export default Card;