import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';


import Header from './Components/DefaultComponents/Header/Header';
import Main from './Components/DefaultComponents/Main/Main';
import Footer from './Components/DefaultComponents/Footer/Footer';

import store from './store';

class App extends Component {
  render() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div className="App">
                    <Header />
                    <Main />
                    <Footer />
                </div>
            </BrowserRouter>
        </Provider>
    );
  }
}

export default App;