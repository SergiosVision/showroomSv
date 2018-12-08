import React, { Component } from 'react'
import { connect } from 'react-redux'

import MainPage from '../components/MainPage'

export class MainPageContainer extends Component {
  render() {
    return (
      <MainPage />
    )
  }
}

const mapStateToProps = state => ({
 
})

export default connect(mapStateToProps, { })(MainPageContainer)
