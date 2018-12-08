import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getData } from 'firebaseConfig'

import { getSingleWork, clearSingleWork } from '../actions'
import Work from '../components/Work'

class WorkContainer extends Component {
  componentWillMount() {
    const { getSingleWork, match } = this.props
    
    getData('works').then(response => getSingleWork(response.find(item => item.id === match.params.id)))
  }

  componentWillUnmount() {
    this.props.clearSingleWork()
  }

  render() {
    const { work } = this.props

    return (
      <Work work={work} />
    )
  }
}

const mapStateToProps = state => ({
  work: state.singlePage.work
})

export default connect(
  mapStateToProps, { getSingleWork, clearSingleWork }
)(WorkContainer)