import React, { Component } from 'react'

import styles from './styles/.module.sass'

const cx = require('classnames/bind').bind(styles)

export default class FormInput extends Component {
    static defaultProps = {
        placeholder: 'Placeholder',
        type: 'text'
    }
    
    render() {
        const { input, placeholder, type } = this.props

        return (
            <div className='input-field col s12'>
                <input
                    {...input}
                    placeholder={placeholder}
                    type={type}
                />
            </div>
        )
    }
}
