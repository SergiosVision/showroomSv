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
    handleCheckBox: (value: any) => void
}

export default class SignUpMerchantForm extends React.Component<Props> {
    render() {
        const {submitForm, errorMessage, isShowSubmitLoader, handleCheckBox} = this.props

        return (
            <div className={cx('form', 'mt-75')}>
                <div className='mb-30'>
                    <h3 className='font-big text-lighten-black'>Sign Up</h3>
                </div>
                <form onSubmit={submitForm}>
                    <div className={cx('fields-holder')}>
                        <Field name='email' type='email' component={FormInput} label='E-email'/>
                        <Field name='password' type='password' component={FormInput} label='Password'/>
                        <Field name='repeatPassword' type='password' component={FormInput} label='Repeat Password'/>
                    </div>
                    {errorMessage && <div className={cx('error')}>{errorMessage}</div>}
                    <div className={cx('checkBox', 'mt-20')}>
                        <label htmlFor='individualMerchant' className={cx('text-medium-gray', 'box-wrapper')}>
                            Sign Up as Individual Merchant
                            <input id='individualMerchant' onChange={handleCheckBox} type='checkbox'/>
                            <span className={cx('custom-box')}/>
                        </label>
                    </div>
                    <div className={cx('privacy-policy', 'mt-30')}>
                        <span className='text-medium-gray'>
                            By clicking Sign Up you agree to our <br/>
                            <a href='!#' target='_blank' className='text-company-green'>Terms of Service</a>
                            {' '}
                            and
                            {' '} <a href='!#' target='_blank' className='text-company-green'>Privacy Policy</a>
                        </span>
                    </div>
                    <div className='mt-20'>
                        <Button type='login' disabled={isShowSubmitLoader}>
                            {isShowSubmitLoader ? 'Loading...' : 'Sign Up'}
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