import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

import styles from './styles/.module.sass'

import NavLinkComponent from 'admin/common/components/navLink/NavLink'

import { Menu } from './data'

const cx = require('classnames/bind').bind(styles)

class Sidebar extends Component {
  render() {
    return (
      <div className={cx('sidebar', 'z-depth-2')}>
          <div className={cx('sidebar-wrapper')}>
            <div className={cx('logo')}>
              <Link to='/dashboard'>SV Admin</Link>
            </div>
            <ul className={cx('navigation')}>
              {Menu.map((item, index) => <NavLinkComponent path={item.path} className={cx('link-item')}
                 label={item.label} icon={item.icon} key={index}/>)}
            </ul>
          </div>
      </div>
    )
  }
}

export default withRouter(Sidebar)