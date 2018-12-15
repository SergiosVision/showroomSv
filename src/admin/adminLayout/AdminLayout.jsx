import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { compose } from 'redux'
import { firebaseConnect } from 'react-redux-firebase'

import { UserIsAuthenticated, UserIsNotAuthenticated } from 'Protection'

import SigninContainer from 'admin/signin/containers/SigninContainer'

import ContentLayout from './ContentLayout'

class AdminLayout extends Component {
  render() {
    return (
      <Switch>
        <Route exact path={`${this.props.match.path}/signin`} component={UserIsNotAuthenticated(SigninContainer)}/>
        <Route path={`${this.props.match.path}`} component={UserIsAuthenticated(ContentLayout)}/>
      </Switch>
    )
  }
}
export default compose(firebaseConnect())(AdminLayout)