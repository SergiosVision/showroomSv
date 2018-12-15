import React, { Component } from 'react'

import styles from './styles/.module.sass'

const cx = require('classnames/bind').bind(styles)

export default class FormInput extends Component {
    static defaultProps = {
        placeholder: 'Placeholder',
        type: 'text'
    }
    
    render() {
        const { input, placeholder, type, meta } = this.props

        return (
            <div className={cx('input-field col s12', 'custom')}>
                    <input
                        {...input}
                        placeholder={placeholder}
                        type={type}
                    />
                    {meta.touched && ((meta.error && <div className={cx('error-message')}>{meta.error}</div>))}
                </div>
        )
    }
}
