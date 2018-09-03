import React, { Component } from 'react';
import { Provider } from 'react-redux';

import Posts from './Components/Posts/Posts';
import PostForm from './Components/PostForm/PostForm';

import store from './store';

class App extends Component {
  render() {
    return (
        <Provider store={store}>
            <div className="App">
                <div className="container">
                    <PostForm />
                    <Posts />
                </div>
            </div>
        </Provider>
    );
  }
}

export default App;