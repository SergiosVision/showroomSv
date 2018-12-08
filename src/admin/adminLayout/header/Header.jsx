import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import NavLinkComponent from 'common/components/navLink/NavLink'

import styles from './styles/.module.sass'
import { Menu } from './menuData/menuData'

const cx = require('classnames/bind').bind(styles)

class Header extends Component {
  render() {
    return (
      <header className='navbar-fixed'>
        <nav className='grey darken-4'>
          <div className={cx('container nav-wrapper')}>
            <div className='row'>
              <div className='col s4'><Link className={cx('logo')} to='/dashboard'>Dashboard</Link></div>
              <div className='col s4 right'>
                <ul className='right'>
                  {Menu.map((item, index) => <NavLinkComponent path={item.path} label={item.label} key={index}/>)}
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header>
    )
  }
}

export default Header