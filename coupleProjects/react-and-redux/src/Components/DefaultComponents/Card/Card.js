import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Card extends Component {
    render() {
        const { postData, single } = this.props;

        let content;

        if(single) {
            content =
                <div className="card black-text">
                    <div className="card-content">
                        <div className="card-title">
                            <h4>{postData.title}</h4>
                        </div>
                        <p>{postData.content}</p>
                        <div className="row">
                            <div className="col xs6">
                                <span className='grey-text darken-4'>{postData.author}</span>
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

                </div>;
        } else {
            content =
                <Link to={`/${postData.id}`}>
                    <div className="card black-text">
                        <div className="card-content">
                            <div className="card-title">
                                <h4 className='teal-text lighten-1'>{postData.title}</h4>
                            </div>
                            <p>{postData.content}</p>
                            <div className="row">
                                <div className="col xs6">
                                    <span className='grey-text darken-4'>{postData.author}</span>
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
                </Link>;
        }

        return (
            <div className='col s12'>
                {content}
            </div>
        );
    }
}

export default Card;