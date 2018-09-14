import { Switch, Route } from 'react-router-dom';

import Posts from '../Components/Posts/Posts';
import PostForm from '../Components/PostForm/PostForm';
import SinglePost from '../Components/SinglePost/SinglePosts';
import SignIn from '../Components/Login/SignIn';

import React, {Component} from 'react';

class Router extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' component={Posts} />
                <Route path='/addPost' component={PostForm} />
                <Route path='/signin' component={SignIn} />
                <Route path='/:id' component={SinglePost} />
            </Switch>
        );
    }
}

export default Router;