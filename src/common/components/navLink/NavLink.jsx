import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { history } from 'store'

import styles from './styles/.styles.sass'

const cx = require('classnames/bind').bind(styles)

class NavLinkComponent extends Component {
  render() {
    const { label, path, icon, className } = this.props

    return (
        <li className={cx(this.handleActive(path, history.location), className, 'link')}>
            <NavLink to={path}>
              {icon && <i className={cx('fas', icon)}></i>}
              {label}
            </NavLink>
        </li>
    )
  }

  handleActive = (path, location) => location.pathname === path ? 'active-link' : undefined
}

export default NavLinkComponent