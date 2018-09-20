import * as React from 'react'

import {BaseFieldProps, WrappedFieldProps} from 'redux-form'

const cx = require('classnames/bind').bind(require('./styles/formInput.scss'))

const FormInput = (props: BaseFieldProps & WrappedFieldProps & React.InputHTMLAttributes<HTMLFormElement>) => {
    const { label } = props

    return (
        <div className={cx('input-group')}>
            <label htmlFor={label.toLowerCase()}>{label}</label>
            <input className={cx('input')}
                   {...props.input}
                   type={ props.type }
                   id={label.toLowerCase()}
                   maxLength={ props.maxLength }
                   disabled={ props.disabled }
            />
            {props.meta.touched && ((props.meta.error && <div className={cx('error')}>{props.meta.error}</div>))}
        </div>
    )
}

export default FormInput
