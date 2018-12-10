import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch } from 'react-router-dom'

import { Auth } from 'firebaseConfig'

import { AuthContext } from 'common/providers/authProvider/AuthProvider'
import ProtectedRoute from 'common/components/protectedRoute/ProtectedRoute'
import Success from 'common/components/protectedRoute/Success'
import Fail from 'common/components/protectedRoute/Fail'

import MainPageContainer from 'admin/mainPage/containers/MainPageContainer'
import NewWorkContainer from 'admin/mainPage/containers/NewWorkContainer'
import SigninContainer from 'admin/signin/containers/SigninContainer'

import Header from './header/Header'

class AdminLayout extends Component {
  componentDidMount() {
    window.setTimeout(() => {
        const el = document.querySelector('body')
        el.classList.add('blue-grey', 'darken-3')
    }, 0) 
  }

  render() {
    return (
      <AuthContext.Consumer>
        {({authenticated}) => (
          <React.Fragment>
            {Auth.currentUser && authenticated && <Header/>}
            <Switch>
              <ProtectedRoute exact path={`${this.props.match.path}/`} authenticated={authenticated}>
                <Success><MainPageContainer/></Success>
                <Fail><SigninContainer/></Fail>
              </ProtectedRoute>
              <ProtectedRoute exact path={`${this.props.match.path}/add`} authenticated={authenticated}>
                <Success><NewWorkContainer/></Success>
                <Fail><SigninContainer/></Fail>
              </ProtectedRoute>
            </Switch>
        </React.Fragment>
        )}
      </AuthContext.Consumer>
    )
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  authenticated: state.auth.authenticated,
  loading: state.auth.loading
})

export default connect(mapStateToProps, {
    
})(AdminLayout)