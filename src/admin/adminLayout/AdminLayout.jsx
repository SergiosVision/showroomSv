import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import MainPage from 'admin/mainPage/containers/MainPageContainer'

import Header from './header/Header'

class AdminLayout extends Component {
  render() {
    return (
      <React.Fragment>
        <Header/>
        <Switch>
            <Route exact path={`${this.props.match.path}/`} component={MainPage}/>
        </Switch>
      </React.Fragment>
    )
  }
}

export default AdminLayout