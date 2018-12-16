import React, { Component } from 'react'

import OutsidePageLayout from 'admin/common/components/outsidePageLayout/OutsidePageLayout'

import styles from '../styles/.styles.sass'

import Location from './Location'

const cx = require('classnames/bind').bind(styles)

class Dashboard extends Component {
  render() {
    const { location } = this.props

    return (
      <OutsidePageLayout>
        <div className='row'>
          <div className='col s6'>
            <Location location={location}/>
          </div>
        </div>
      </OutsidePageLayout>
    )
  }
}

export default Dashboard