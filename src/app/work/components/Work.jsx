import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/styles.sass'

const cx = require('classnames/bind').bind(styles)

class Work extends Component {
  static propTypes = {
    work: PropTypes.object.isRequired
  }

  render() {
    const { work } = this.props

    return (
      <div className='container'>
        <h1>{work.title}</h1>
        <p>{work.description}</p>
      </div>
    )
  }
}

export default Work