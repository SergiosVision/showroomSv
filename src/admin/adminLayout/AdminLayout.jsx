import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { history } from 'store'

import { Auth } from 'firebaseConfig'

import { setUser, resetUser, setLoadingUser, resetLoadingUser } from 'common/actions'
import Loader from 'common/components/loader/Loader.tsx'

import MainPageContainer from 'admin/mainPage/containers/MainPageContainer'
import SigninContainer from 'admin/signin/containers/SigninContainer'

import Header from './header/Header'

class AdminLayout extends Component {
  componentWillMount() {
    this.authProtection()
  }

  render() {
    const { authenticated, loading } = this.props

    return (
      <React.Fragment>
        {!loading ? (
            <React.Fragment>
              {authenticated && <Header/>}
              <Switch>
                  <Route exact path={`${this.props.match.path}/`} render={props => 
                    authenticated ? <MainPageContainer {...props}/> : <SigninContainer {...props}/>} />
              </Switch>
            </React.Fragment>) : <Loader absoluteCenter text='Checking access rules'/>}
      </React.Fragment>
    )
  }

  authProtection = () => {
    const { setUser, resetUser, setLoadingUser, resetLoadingUser } = this.props

    setLoadingUser()

    Auth.onAuthStateChanged(user => {
      if (user !== null) {
        setUser(user)

        history.replace('/dashboard')

        resetLoadingUser()
      } else {
        resetUser()

        history.replace('/dashboard')

        resetLoadingUser()
      }
    })
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  authenticated: state.auth.authenticated,
  loading: state.auth.loading
})

export default connect(mapStateToProps, {
    setUser, resetUser,
    setLoadingUser, resetLoadingUser 
})(AdminLayout)