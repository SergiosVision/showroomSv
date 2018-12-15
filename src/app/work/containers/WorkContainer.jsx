import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'

import Work from '../components/Work'

class WorkContainer extends Component {
  render() {
    const { work } = this.props

    return (
      <Work work={work} />
    )
  }
}

export default compose(
  firestoreConnect(props => [
      { collection: 'works', storeAs: 'work', doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered }}) => ({
      work: ordered.work && ordered.work[0]
  }))
)(WorkContainer);