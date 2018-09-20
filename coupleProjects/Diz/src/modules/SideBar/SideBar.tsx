import * as React from 'react'
import {Route, Switch, RouteComponentProps, Link} from 'react-router-dom'

import Navigation from 'modules/SideBar/components/Navigation/Navigation'
import Profile from  'modules/SideBar/components/Profile/Profile'

const Logo = require(`!svg-react-loader?name=Icon!common/img/logo-white.svg`)

const cx = require('classnames/bind').bind(require('./styles/styles.scss'))

interface Props {}

class SideBar extends React.Component<Props & RouteComponentProps<{}>> {

    render() {
        return (
            <div className={cx('sidebar')}>
                <div className={cx('logo')}>
                    <Link to='/'>
                        <Logo />
                    </Link>
                </div>
                <Navigation />
                <Profile />
                <div className={cx('copyright')}>
                    <span className={cx('copyright-text')}>
                        Copyright (c) {new Date().getFullYear()} Dizli.net.
                        <br/>
                        All rights reserved
                    </span>
                </div>
            </div>
        )
    }
}

export default SideBar
