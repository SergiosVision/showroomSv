import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import MainPageContainer from 'app/mainPage/containers/MainPageContainer'
import WorkContainer from 'app/work/containers/WorkContainer'
import AboutContainer from 'app/about/containers/AboutContainer'
import NewsContainer from 'app/news/containers/NewsContainer'
import ContactsContainer from 'app/contacts/containers/ContactsContainer'

import NotFound from 'common/components/notFound/NotFound'

import Header from './header/Header'

class AppLayout extends Component {
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
          <Route component={NotFound}/>
        </Switch>
      </React.Fragment>
    )
  }
}

export default AppLayout