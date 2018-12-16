import React, { Component } from 'react'
import { history } from 'store'

import Loader from 'common/components/loader/Loader'

import TopLine from 'admin/common/components/outsidePageLayout/TopLine'
import OutsidePageLayout from 'admin/common/components/outsidePageLayout/OutsidePageLayout'
import Button from 'admin/common/components/button/Button'

import styles from '../styles/.styles.sass'

const cx = require('classnames/bind').bind(styles)

class About extends Component {
  render() {
    return (
      <React.Fragment>
        <TopLine>
          <div className={cx('buttons-holder')}>
            <Button icon='fa-plus'>Add About</Button>
          </div>
        </TopLine>
        <OutsidePageLayout whitoutTopSpace></OutsidePageLayout>
      </React.Fragment>
    )
  }
}

export default About