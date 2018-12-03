import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './styles/.module.sass'

const cx = require('classnames/bind').bind(styles)

class WorkPreviewCard extends Component {
  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired
  }
  
  render() {
    const { className, title, handleClick } = this.props

    return (
      <div className={cx(className, 'holder')} onClick={handleClick}>
        <div className={cx('card grey darken-4 z-depth-1', 'custom')}>
          <div className={cx('title')}>
            <span>{title}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default WorkPreviewCard