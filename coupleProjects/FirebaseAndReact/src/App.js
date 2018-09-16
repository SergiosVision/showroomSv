import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Store/index';

import './App.css';

import AppNavBar from './Components/Layout/AppNavBar';
import DashBoard from './Components/Layout/DashBoard';
import AddClient from './Components/Clients/AddClient';
import ClientDetails from './Components/Clients/ClientDetails';
import EditClient from './Components/Clients/EditClient';
import Login from './Components/Auth/Login';
import Registration from './Components/Auth/Registration';
import Settings from './Components/Settings/Settings';
import Profile from './Components/Profile/Profile';


import { UserIsAuthenticated, UserIsNotAuthenticated } from './Helpers/AuthGuard';

class App extends Component {
  render() {
    return (
     <Provider store={store}>
         <Router>
             <div className="App">
                 <AppNavBar />
                 <div className="container">
                     <Switch>
                         <Route exact path='/' component={UserIsAuthenticated(DashBoard)}></Route>
                         <Route exact path='/profile' component={UserIsAuthenticated(Profile)}></Route>
                         <Route exact path='/client/add' component={UserIsAuthenticated(AddClient)}></Route>
                         <Route exact path='/client/edit/:id' component={UserIsAuthenticated(EditClient)}></Route>
                         <Route exact path='/client/:id' component={UserIsAuthenticated(ClientDetails)}></Route>
                         <Route exact path='/settings' component={UserIsAuthenticated(Settings)}></Route>
                         <Route exact path='/login' component={UserIsNotAuthenticated(Login)}></Route>
                         <Route exact path='/signup' component={UserIsNotAuthenticated(Registration)}></Route>
                     </Switch>
                 </div>
             </div>
         </Router>
     </Provider>
    );
  }
}

export default App;
