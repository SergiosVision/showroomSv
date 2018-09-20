import {BaseFieldProps, WrappedFieldProps} from 'redux-form'
import * as React from 'react'

const cx = require('classnames/bind').bind(require('./styles/formError.scss'))

export const FormFieldError = (props: BaseFieldProps & WrappedFieldProps & React.InputHTMLAttributes<HTMLFormElement>) => {
    return (
        <div className={cx('error')}>
            {props.meta.touched && ((props.meta.error && <div className={cx('error')}>{props.meta.error}</div>))}
        </div>
    )
}

export const FormGeneralError = (props: {errorMessage?: string}) => {
    const {errorMessage} = props

    return errorMessage ? <div className={cx('error')}>{errorMessage}</div> : null
}
