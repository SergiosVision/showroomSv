import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { palceholderData } from 'common/utils/placeholderData'

import { singleWork } from 'app/mainPage/actions'

import Work from '../components/Work'

class WorkContainer extends Component {
  static propTypes = {
    work: PropTypes.object.isRequired
  }

  componentWillMount() {
    const { singleWork, match, work } = this.props
    const findExactItem = palceholderData.find(item => item.id === +match.params.id)

    singleWork(findExactItem)
  }

  render() {
    const { work } = this.props

    return (
      <Work work={work} />
    )
  }
}

const mapStateToProps = state => ({
  work: state.mainPage.work
})

export default connect(
  mapStateToProps, { singleWork }
)(WorkContainer)