import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase';

import MainPage from '../components/MainPage'

export class MainPageContainer extends Component {
  render() {
    const { works } = this.props

    return (
      <MainPage works={works} />
    )
  }
}


export default compose(
  firestoreConnect([{ collection: 'works' }]),
  connect((state, props) => ({
    works: state.firestore.ordered.works
  }))
)(MainPageContainer)
