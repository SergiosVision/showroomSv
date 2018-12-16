import React, { Component } from 'react'
import styles from './styles/.styles.sass'

const cx = require('classnames/bind').bind(styles)

class CardLayout extends Component {
  render() {
    const { className, children } = this.props

    return <div className={cx('card', className, 'card-layout')}>{children}</div>
  }
}

export default CardLayout