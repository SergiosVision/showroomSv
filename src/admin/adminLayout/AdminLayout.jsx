import React, { Component } from 'react'
import { connect } from 'react-redux'
import { history } from 'store'
import { Switch, Route, Redirect } from 'react-router-dom'

import {FbContext} from 'common/providers/aProvider/Aprovider'

import MainPageContainer from 'admin/mainPage/containers/MainPageContainer'
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
      <FbContext.Consumer>
        {({isUserSignedIn}) => {
          console.log(isUserSignedIn)
          if (isUserSignedIn) {
            return (
              <React.Fragment>
                <Header/>
                <Switch>
                    <Route exact path={`${this.props.match.path}/`} component={MainPageContainer}/>
                </Switch>
              </React.Fragment>
            )
          }
          return <SigninContainer/>
        }}
      </FbContext.Consumer>
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