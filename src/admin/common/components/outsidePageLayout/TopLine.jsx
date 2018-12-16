import React, { Component } from 'react'

import styles from './styles/.styles.sass'

const cx = require('classnames/bind').bind(styles)

class TopLine extends Component {
  render() {
    const { withContainer } = this.props

    return (
      <div className={cx('top-line')}>
        {withContainer ? <div className={cx('container')}>{this.props.children}</div> : this.props.children}
      </div>
    )
  }
}

export default TopLine