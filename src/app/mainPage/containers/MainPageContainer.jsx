import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loadWorks } from '../actions'

import MainPage from '../components/MainPage'

export class MainPageContainer extends Component {
  static propTypes = {
    works: PropTypes.array.isRequired
  }

  componentWillMount() {
    const { loadWorks } = this.props
    const palceholderData = [
      {
        id: 1,
        title: 'Work 1',
        description: 'Description 1',
        images: []
      },
      {
        id: 2,
        title: 'Work 2',
        description: 'Description 2',
        images: []
      },
      {
        id: 3,
        title: 'Work 3',
        description: 'Description 3',
        images: []
      },
      {
        id: 4,
        title: 'Work 4',
        description: 'Description 4',
        images: []
      }
    ]

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

export default connect(
  mapStateToProps,
  {
    loadWorks
  }
  )(MainPageContainer)
