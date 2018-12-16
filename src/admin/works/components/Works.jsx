import React, { Component } from 'react'
import { history } from 'store'

import Table from 'common/components/table/Table'
import Column from 'common/components/table/Column'
import Loader from 'common/components/loader/Loader'

import TopLine from 'admin/common/components/outsidePageLayout/TopLine'
import OutsidePageLayout from 'admin/common/components/outsidePageLayout/OutsidePageLayout'
import Button from 'admin/common/components/button/Button'

import styles from '../styles/.styles.sass'

const cx = require('classnames/bind').bind(styles)

class Works extends Component {
  render() {
    const { works } = this.props
    let content

    if (works) {
      content = (
        <React.Fragment>	
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
      content = <Loader absoluteCenter/>
    }
    
    return (
      <React.Fragment>
        <TopLine>
              <div className={cx('buttons-holder')}>
              <Button icon='fa-plus' clickEvent={() => history.push('/dashboard/works/add')}>Add Work</Button>
              </div>
            </TopLine>
        <OutsidePageLayout whitoutTopSpace>{content}</OutsidePageLayout>
      </React.Fragment>
    )
  }

  descriptionRender = work => 
  work.description.length > 15 ? work.description.slice(0, 15) : work.description
}

export default Works