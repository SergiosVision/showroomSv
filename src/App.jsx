import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import  { store, history }  from 'store'

import Aprovider from 'common/providers/aProvider/Aprovider'
import MainLayout from 'mainLayout/MainLayout'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Aprovider>
          <Router history={history}>
            <div className="App">
              <MainLayout/>
            </div>
          </Router>
        </Aprovider>
      </Provider>
    );
  }
}

export default App;
