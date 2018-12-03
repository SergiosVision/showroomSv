import React, { Component } from 'react'
import styles from '../styles/styles.sass'

const cx = require('classnames/bind').bind(styles)

class News extends Component {
  render() {
    return (
      <div className='container'>
        <h1>News</h1>
      </div>
    )
  }
}

export default News