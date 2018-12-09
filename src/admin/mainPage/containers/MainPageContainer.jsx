import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getData } from 'firebaseConfig'

import { getWorks } from '../actions'
import MainPage from '../components/MainPage'

export class MainPageContainer extends Component {
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
  works: state.dashboardWorks.works
})

export default connect(mapStateToProps, { getWorks })(MainPageContainer)
