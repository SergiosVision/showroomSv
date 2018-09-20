import * as React from 'react'
import { NavLink } from 'react-router-dom'

const cx = require('classnames/bind').bind(require('./styles/LinkItem.scss'))

interface Props {
    icon?: string,
    routePath?: string,
    text?: string
}

export default class LinkItem extends React.Component<Props, {}> {
    render() {
        const { icon, routePath, text } = this.props
        const IconOutput = require(`!svg-react-loader?name=Icon!../icons/${icon}.svg`)

        return (
            <NavLink to={routePath} className={cx('menu-item')}>
                <div className={cx('icon')}>
                    <IconOutput />
                </div>
                <span className={cx('route-name')}>{text}</span>
            </NavLink>
        )
    }
}