import React, { Component } from 'react'
import { history } from 'store'

import Button from 'admin/common/components/button/Button'

import styles from './styles/.styles.sass'

const cx = require('classnames/bind').bind(styles)

class ButtonsHolderLayout extends Component {
  render() {
    const { back, children } = this.props

    return (
      <div className={cx('buttons-holder', {'two-sides-active': back})}>
        {back && back.path && <div className={cx('right-side')}>
            <Button icon='fa-backspace' clickEvent={() => history.push(back.path)}>{back.text}</Button>
        </div>}
        <div className={cx('left-side')}>{children}</div>
      </div>
    )
  }
}

export default ButtonsHolderLayout