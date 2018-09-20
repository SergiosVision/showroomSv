import * as React from 'react'
import {Route, Switch, RouteComponentProps, Link} from 'react-router-dom'

const cx = require('classnames/bind').bind(require('./styles/styles.scss'))

import LinkItem from 'common/components/LinkItem'

interface Props {}

class SideBar extends React.Component<Props> {

    render() {
        const navItems = [
            {singlePath: 'orders'},
            {singlePath: 'planing'},
            {singlePath: 'reports'},
            {singlePath: 'customers'},
            {singlePath: 'drivers'},
            {singlePath: 'fleet'},
            {singlePath: 'history'},
            {singlePath: 'settings'}
        ]

        return (
            <nav>
                <ul>
                    {
                        navItems.map((item , index) => {
                              return (
                                  <li key={index}>
                                      <LinkItem icon={item.singlePath} routePath={`/${item.singlePath}`} text={item.singlePath} />
                                  </li>
                              )
                        })
                    }
                </ul>
            </nav>
        )
    }
}

export default SideBar
