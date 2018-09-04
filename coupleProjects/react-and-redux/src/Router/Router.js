import { Switch, Route } from 'react-router-dom';

import Posts from '../Components/Posts/Posts';
import PostForm from '../Components/PostForm/PostForm';

import React, {Component} from 'react';

class Router extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' component={Posts} />
                <Route path='/addPost' component={PostForm} />
            </Switch>
        );
    }
}

export default Router;