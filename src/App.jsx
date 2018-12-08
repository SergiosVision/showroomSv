import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import  { store, history }  from 'store'

import MainLayout from 'mainLayout/MainLayout'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <div className="App">
            <MainLayout/>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
