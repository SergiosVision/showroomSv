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

export default class SignInForm extends React.Component<Props> {
    render() {
        const {submitForm, errorMessage, isShowSubmitLoader} = this.props

        return (
            <div className={cx('form', 'mt-75')}>
                <div className='mb-30'>
                    <h3 className='font-big text-lighten-black'>Sign In</h3>
                </div>
                <form onSubmit={submitForm}>
                    <div className={cx('fields-holder')}>
                        <Field name='email' type='email' component={FormInput} label='E-email'/>
                        <Field name='password' type='password' component={FormInput} label='Password'/>
                    </div>
                    {errorMessage && <div className={cx('error')}>{errorMessage}</div>}
                    <div className={cx('forgot-password', 'mt-10 mb-20')}>
                        <Link to='/auth/forgotpassword' className='text-company-green'>Forgot Password ?</Link>
                    </div>
                    <Button type='login' disabled={isShowSubmitLoader}>
                        {isShowSubmitLoader ? 'Loading...' : 'Sign In'}
                    </Button>
                    <div className={cx('bottom-info', 'mt-20')}>
                        <div className={cx('checkBox')}>
                            <label htmlFor='remember' className={cx('text-medium-gray', 'box-wrapper')}>
                                Remember me
                                <input id='remember' type='checkbox'/>
                                <span className={cx('custom-box')}/>
                            </label>
                        </div>
                        <div className={cx('new-in-dizli')}>
                            <span className='text-medium-gray mr-3'>New to Dizli?</span>
                            <Link to='/auth/signupmerch' className='text-company-green'>Sign up here</Link>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}