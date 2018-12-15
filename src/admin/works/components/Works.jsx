import React, { Component } from 'react'
import { history } from 'store'

import Table from 'common/components/table/Table'
import Column from 'common/components/table/Column'

import styles from '../styles/.styles.sass'

const cx = require('classnames/bind').bind(styles)

class Works extends Component {
  render() {
    const { works } = this.props
    let content

    if (works) {
      content = (
        <React.Fragment>
          <div className={cx('row', 'buttons-holder')}>
            <div className={cx('add')}>
              <button onClick={() => history.push('/dashboard/add')} className='btn blue-grey darken-3 z-depth-1'>Add Work</button>
            </div>
          </div>
          <div className='row'>
              <Table rowClass={cx('custom-row')}
                source={works}>
                <Column data='title'>Work Name</Column>
                <Column data={this.descriptionRender}>Description</Column>
                <Column data='creation_date'>Creation Date</Column>
              </Table>
          </div>
        </React.Fragment>
      )
    } else {
      content = <div>Loading...</div>
    }
    

    return (
      <div className='container'>
        {content}
      </div>
    )
  }

  descriptionRender = work => 
  work.description.length > 15 ? work.description.slice(0, 15) : work.description
}

export default Works