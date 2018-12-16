import React, { Component } from 'react'

import styles from './styles/.styles.sass'

const cx = require('classnames/bind').bind(styles)

class Button extends Component {
  static defaultProps = {
    type: 'button'
  }

  render() {
    const { children, clickEvent, icon, type } = this.props

    return (
      <button type={type} onClick={clickEvent} className={cx('button')}>
        {icon && <i className={cx('fas', icon)}></i>}
        {children}
      </button>
    )
  }
}

export default Button