import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import Header from 'app/layout/header/Header'
import MainPageContainer from 'app/mainPage/containers/MainPageContainer'
import WorkContainer from 'app/work/containers/WorkContainer'
import AboutContainer from 'app/about/containers/AboutContainer'
import NewsContainer from 'app/news/containers/NewsContainer'
import ContactsContainer from 'app/contacts/containers/ContactsContainer'

class Layout extends Component {
  render() {
    return (
      <React.Fragment>
        <Header/>
        <Switch>
          <Route exact path='/' component={MainPageContainer}/>
          <Route exact path='/work/:id' component={WorkContainer}/>
          <Route exact path='/about' component={AboutContainer}/>
          <Route exact path='/news' component={NewsContainer}/>
          <Route exact path='/contacts' component={ContactsContainer}/>
        </Switch>
      </React.Fragment>
    )
  }
}

export default Layout