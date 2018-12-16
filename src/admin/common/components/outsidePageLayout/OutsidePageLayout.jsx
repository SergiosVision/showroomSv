import React, { Component } from 'react'

import styles from './styles/.styles.sass'

const cx = require('classnames/bind').bind(styles)

class OutsidePageLayout extends Component {
  render() {
    const { whitoutTopSpace } = this.props

    return (
      <div className={cx('content', {'whitout-top-space': whitoutTopSpace})}>
        <div className={cx('container')}>{this.props.children}</div>
      </div>
    )
  }
}

export default OutsidePageLayout