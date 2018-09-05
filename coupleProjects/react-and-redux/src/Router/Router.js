import { Switch, Route } from 'react-router-dom';

import Posts from '../Components/Posts/Posts';
import PostForm from '../Components/PostForm/PostForm';
import SinglePost from '../Components/SinglePost/SinglePosts';
// import Page404 from '../Components/DefaultComponents/404Page/404Page';

import React, {Component} from 'react';

class Router extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' component={Posts} />
                <Route path='/addPost' component={PostForm} />
                <Route path='/:id' component={SinglePost} />
                {/*<Route path='/*' component={Page404} />*/}
            </Switch>
        );
    }
}

export default Router;