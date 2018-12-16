import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'

import Contacts from '../components/Contacts'

export class ContactsContainer extends Component {
  render() {
    return <Contacts/>
  }
}

export default ContactsContainer
