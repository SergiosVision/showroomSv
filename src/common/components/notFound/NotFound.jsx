import React, { Component } from 'react'

import styles from './styles/.styles.sass'

const cx = require('classnames/bind').bind(styles)

class NotFound extends Component {
  render() {
    return (
      <div className={cx('container', 'not-found')}>
          <h1>404</h1>
          <h3>Page Not Found :(</h3>
      </div>
    )
  }
}

export default NotFound