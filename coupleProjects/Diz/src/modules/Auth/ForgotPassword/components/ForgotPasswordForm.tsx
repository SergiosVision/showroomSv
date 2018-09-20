import * as React from 'react'

import {Field} from 'redux-form'
import { Link } from 'react-router-dom'
import FormInput from 'common/components/FormInput'
import Button from 'common/components/Button'

const cx = require('classnames/bind').bind(require('../styles/styles.scss'))

interface Props {
    submitForm: (e: React.FormEvent<HTMLFormElement>) => void,
    errorMessage?: string,
    isShowSubmitLoader: boolean,
}

export default class ForgotPasswordForm extends React.Component<Props> {
    render() {
        const {submitForm, errorMessage, isShowSubmitLoader} = this.props

        return (
            <div className={cx('form', 'mt-75')}>
                <div className='mb-30'>
                    <h3 className='font-big text-lighten-black'>Forgot your password?</h3>
                </div>
                <form onSubmit={submitForm}>
                    <div className={cx('fields-holder')}>
                        <Field name='email' type='email' component={FormInput} label='Enter your e-mail'/>
                    </div>
                    {errorMessage && <div className={cx('error')}>{errorMessage}</div>}
                    <div className='mt-20'>
                        <Button type='login' disabled={isShowSubmitLoader}>
                            {isShowSubmitLoader ? 'Loading...' : 'Reset'}
                        </Button>
                        <div className='mt-20'>
                            <span className='text-medium-gray mr-3'>Already a Dizli User?</span>
                            <Link to='/auth' className='text-company-green'>Sign in here</Link>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}