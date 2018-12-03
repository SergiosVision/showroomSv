import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loadWorks } from '../actions'
import { palceholderData } from 'common/utils/placeholderData'

import MainPage from '../components/MainPage'

export class MainPageContainer extends Component {
  static propTypes = {
    works: PropTypes.array.isRequired
  }

  componentWillMount() {
    const { loadWorks } = this.props

    loadWorks(palceholderData)
  }

  render() {
    const { works } = this.props

    return (
      <MainPage works={works} />
    )
  }
}

const mapStateToProps = state => ({
  works: state.mainPage.works
})

export default connect(mapStateToProps, { loadWorks })(MainPageContainer)
