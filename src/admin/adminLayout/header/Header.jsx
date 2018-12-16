import React, { Component } from 'react'
import { compose } from 'redux'
import { firebaseConnect } from 'react-redux-firebase'
import { history } from 'store'

import { toPageName } from './data'
import styles from './styles/.module.sass'

const cx = require('classnames/bind').bind(styles)

class Header extends Component {
  render() {
    return (
      <nav className={cx('nav')}>
          <div className={cx('wrapper')}>
            <div className={cx('left-side')}>
              <div className={cx('page-name', 'side-item')}>{toPageName(history.location.pathname)}</div>
              <div className={cx('side-item')}>Hi, Sergios</div>
            </div>
            <ul>
              <li onClick={this.logOut} className={cx('logout')}>Logout</li>
            </ul>
          </div>
      </nav>
    )
  }

  logOut = () => this.props.firebase.logout()
}

export default compose(firebaseConnect())(Header)