import React, { Component } from 'react'
import { compose } from 'redux'
import { firebaseConnect } from 'react-redux-firebase'

import styles from './styles/.module.sass'

const cx = require('classnames/bind').bind(styles)

class Header extends Component {
  render() {
    return (
      <nav className={cx('nav')}>
          <div className={cx('wrapper')}>
          <div>Hi, Sergios</div>
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