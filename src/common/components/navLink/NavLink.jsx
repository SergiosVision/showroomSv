import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { history } from 'store'

export default class NavLinkComponent extends Component {
  render() {
    const { label, path } = this.props

    return (
        <li className={this.handleActive(path, history.location)}>
            <NavLink to={path}>{label}</NavLink>
        </li>
    )
  }

  handleActive = (path, location) => location.pathname === path ? 'active' : undefined
}

NavLinkComponent.propTypes = {
    label: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  }