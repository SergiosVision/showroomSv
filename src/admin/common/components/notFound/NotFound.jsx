import React, { Component } from 'react'

import styles from './styles/.styles.sass'

import OutsidePageLayout from 'admin/common/components/outsidePageLayout/OutsidePageLayout'

const cx = require('classnames/bind').bind(styles)

class NotFound extends Component {
  render() {
    return (
      <OutsidePageLayout className={cx('not-found-second')}>
          <h1>404</h1>
          <h3>Page Not Found :(</h3>
      </OutsidePageLayout>
    )
  }
}

export default NotFound