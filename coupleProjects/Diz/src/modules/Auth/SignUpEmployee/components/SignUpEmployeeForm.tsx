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

export default class SignUpEmployeeForm extends React.Component<Props> {
    state = {
        firstName: 'Gabi',
        lastName: 'White'
    }
    render() {
        const {submitForm, errorMessage, isShowSubmitLoader} = this.props
        const { firstName, lastName } = this.state

        return (
            <div className={cx('form', 'mt-20')}>
                <div className={cx('sign-up-header', 'mb-20')}>
                    <span className='font-small'>
                        Hello <b>{firstName} {lastName}</b>, you have been invited to join John Snow team. Create an account to log in to your new dashboard.
                    </span>
                </div>
                <div className='mb-30'>
                    <h3 className='font-big text-lighten-black'>Sign Up</h3>
                </div>
                <form onSubmit={submitForm}>
                    <div className={cx('fields-holder')}>
                        <Field name='password' type='password' component={FormInput} label='Password'/>
                        <Field name='repeatPassword' type='password' component={FormInput} label='Repeat Password'/>
                    </div>
                    {errorMessage && <div className={cx('error')}>{errorMessage}</div>}
                    <div className={cx('privacy-policy', 'mt-20')}>
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