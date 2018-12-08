import React, { Component } from 'react'

import styles from '../styles/styles.sass'

const cx = require('classnames/bind').bind(styles)

class Work extends Component {
  render() {
    const { work } = this.props

    return (
      <div className='container'>
        {work ? (<div>
                  <h1>{work.title}</h1>
                  <p>{work.description}</p>
                </div>): <div>Loading...</div>}
      </div>
    )
  }
}

export default Work