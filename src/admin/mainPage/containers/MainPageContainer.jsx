import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import MainPage from '../components/MainPage'

export class MainPageContainer extends Component {
  static propTypes = {
    
  }

  render() {
    return (
      <MainPage />
    )
  }
}

const mapStateToProps = state => ({
 
})

export default connect(mapStateToProps, { })(MainPageContainer)
