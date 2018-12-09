import React, { Component } from 'react'

import { signOut } from 'firebaseConfig'

import Table from 'common/components/table/Table'
import Column from 'common/components/table/Column'

import styles from '../styles/.module.sass'

const cx = require('classnames/bind').bind(styles)

class MainPage extends Component {
  render() {
    const { works } = this.props

    return (
      <div className='container'>
        <div className='row'>
          <Table rowClass={cx('custom-row')}
          source={works}>
            <Column data='title'>Work Name</Column>
            <Column data={this.descriptionRender}>Description</Column>
            <Column data=''>Creation Date</Column>
          </Table>

          <div onClick={this.logOut}>Logout</div>
        </div>
      </div>
    )
  }

  descriptionRender = work => 
  work.description.length > 15 ? work.description.slice(0, 15) : work.description

  logOut = () => {
    signOut()
  }
}

export default MainPage