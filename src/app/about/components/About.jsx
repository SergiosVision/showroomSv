import React, { Component } from 'react'

import styles from '../styles/styles.sass'

const cx = require('classnames/bind').bind(styles)

class About extends Component {
  render() {
    return (
      <div className='container'>
        <h1>About</h1>
      </div>
    )
  }
}

export default About