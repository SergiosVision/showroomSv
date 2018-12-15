import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { UserIsAuthenticated } from 'Protection'

import styles from './styles/.styles.sass'

import WorksContainer from 'admin/works/containers/WorksContainer'
import NewWorkContainer from 'admin/works/containers/NewWorkContainer'

import Sidebar from './sidebar/Sidebar'
import Header from './header/Header'

const cx = require('classnames/bind').bind(styles)

export default class componentName extends Component {
  render() {
    return (
      <div className={cx('wrapper')}>
        <Sidebar/>
        <div className={cx('panel')}>
            <Header/>
            <Switch>
                <Route exact path={`${this.props.match.path}/works`} component={UserIsAuthenticated(WorksContainer)}/>
                <Route exact path={`${this.props.match.path}/add`} component={UserIsAuthenticated(NewWorkContainer)}/>
            </Switch>
        </div>
      </div>
    )
  }
}
