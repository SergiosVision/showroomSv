import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import AppLayout from 'app/appLayout/AppLayout'

import AdminLayout from 'admin/adminLayout/AdminLayout'

class MainLayout extends Component {
  render() {
    return (
        <Switch>
            <Route path='/dashboard' component={AdminLayout}/>
            <Route path='/' component={AppLayout}/>
        </Switch>
    )
  }
}

export default MainLayout