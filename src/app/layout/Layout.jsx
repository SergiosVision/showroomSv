import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import Header from 'app/layout/header/Header'
import MainPageContainer from 'app/mainPage/containers/MainPageContainer'
import AboutContainer from 'app/about/containers/AboutContainer'

class Layout extends Component {
  render() {
    return (
      <React.Fragment>
        <Header/>
        <Switch>
          <Route exact path='/' component={MainPageContainer}/>
          <Route exact path='/about' component={AboutContainer}/>
        </Switch>
      </React.Fragment>
    )
  }
}

export default Layout