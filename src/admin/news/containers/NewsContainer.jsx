import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'

import News from '../components/News'

export class NewsContainer extends Component {
  render() {
    return <News/>
  }
}

export default NewsContainer
