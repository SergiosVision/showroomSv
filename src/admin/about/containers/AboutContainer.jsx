import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'

import About from '../components/About'

export class AboutContainer extends Component {
  render() {
    return <About/>
  }
}

export default AboutContainer
