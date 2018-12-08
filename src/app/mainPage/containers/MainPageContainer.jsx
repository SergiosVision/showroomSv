import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getData } from 'firebaseConfig'

import { getWorks } from '../actions'
import MainPage from '../components/MainPage'

export class MainPageContainer extends Component {
  static propTypes = {
    works: PropTypes.array.isRequired
  }

  componentWillMount() {
    const { getWorks } = this.props

    getData('works').then(resposne => getWorks(resposne))
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

export default connect(mapStateToProps, { getWorks })(MainPageContainer)
