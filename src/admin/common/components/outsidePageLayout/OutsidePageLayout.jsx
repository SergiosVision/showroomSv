import React, { Component } from 'react'

import styles from './styles/.styles.sass'

const cx = require('classnames/bind').bind(styles)

class OutsidePageLayout extends Component {
  render() {
    const { whitoutTopSpace, className } = this.props

    return (
      <div className={cx('content', {'whitout-top-space': whitoutTopSpace}, className)}>
        <div className={cx('container')}>{this.props.children}</div>
      </div>
    )
  }
}

export default OutsidePageLayout