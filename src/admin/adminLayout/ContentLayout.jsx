import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { UserIsAuthenticated } from 'Protection'

import styles from './styles/.styles.sass'

import DashboardContainer from 'admin/dashboard/containers/DashboardContainer'
import WorksContainer from 'admin/works/containers/WorksContainer'
import NewWorkContainer from 'admin/works/containers/NewWorkContainer'
import NewsContainer from 'admin/news/containers/NewsContainer'
import AboutContainer from 'admin/about/containers/AboutContainer'
import ContactsContainer from 'admin/contacts/containers/ContactsContainer'

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
                <Route exact path={`${this.props.match.path}/`} component={UserIsAuthenticated(DashboardContainer)}/>
                <Route exact path={`${this.props.match.path}/works/add`} component={UserIsAuthenticated(NewWorkContainer)}/>
                <Route exact path={`${this.props.match.path}/works`} component={UserIsAuthenticated(WorksContainer)}/>
                <Route exact path={`${this.props.match.path}/news`} component={UserIsAuthenticated(NewsContainer)}/>
                <Route exact path={`${this.props.match.path}/about`} component={UserIsAuthenticated(AboutContainer)}/>
                <Route exact path={`${this.props.match.path}/contacts`} component={UserIsAuthenticated(ContactsContainer)}/>
            </Switch>
        </div>
      </div>
    )
  }
}
