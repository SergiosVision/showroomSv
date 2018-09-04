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
                       <p>{postData.content}</p>
                       <div className="row">
                           <div className="col xs6">
                               <h4>{postData.author}</h4>
                           </div>
                           {
                               !!postData.categories && <div className="col xs6">
                                   <ul>
                                       {
                                           postData.categories.map((item, index) => {
                                               return (
                                                   <li key={index}>{item}</li>
                                               )
                                           })
                                       }
                                   </ul>
                               </div>
                           }
                       </div>
                   </div>

               </div>
            </div>
        );
    }
}

export default Card;