import * as React from 'react'

const cx = require('classnames/bind').bind(require('./styles/button.scss'))

interface Props {
    type?: string,
    className?: string
    onClick?: () => void
    disabled?: boolean
    cancel?: boolean,
    fixedWidth?: boolean,
    id?: string
}

export default class Button extends React.Component<Props, {}> {
    render() {
        const { onClick, className, type, cancel, fixedWidth, id} = this.props

        return (
            <button type={type} id={id} className={cx('button', className, {cancel, fixedWidth})} onClick={onClick}>
                {this.props.children}
            </button>
        )
    }
}
