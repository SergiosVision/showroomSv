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
    isModal: boolean,
    closeModal: () => void
}

export default class ResetPasswordForm extends React.Component<Props> {
    render() {
        const {submitForm, errorMessage, isShowSubmitLoader, isModal, closeModal} = this.props
        let content

        if (!isModal) {
            content = (
                <form onSubmit={submitForm}>
                    <div className={cx('fields-holder')}>
                        <Field name='password' type='password' component={FormInput} label='Password'/>
                        <Field name='repeatPassword' type='password' component={FormInput} label='Repeat Password'/>
                    </div>
                    {errorMessage && <div className={cx('error')}>{errorMessage}</div>}
                    <Button type='login' disabled={isShowSubmitLoader} className='mt-20'>
                        {isShowSubmitLoader ? 'Loading...' : 'Reset'}
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
                            <Link to='/auth' className='text-company-green'>Sign up here</Link>
                        </div>
                    </div>
                </form>
            )
        } else {
            content = (
                <form onSubmit={submitForm}>
                    <div className={cx('fields-holder')}>
                        <Field name='password' type='password' component={FormInput} label='Password'/>
                        <Field name='repeatPassword' type='password' component={FormInput} label='Repeat Password'/>
                    </div>
                    {errorMessage && <div className={cx('error')}>{errorMessage}</div>}
                    <div className={cx('bottom-info', 'mt-20')}>
                        <Button type='login' fixedWidth disabled={isShowSubmitLoader}>
                            {isShowSubmitLoader ? 'Loading...' : 'Save'}
                        </Button>
                        <Button onClick={closeModal}
                                disabled={isShowSubmitLoader}
                                className={cx('ml-20')}
                                cancel
                                fixedWidth
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            )
        }

        return (
            <div className={cx('form', !isModal && 'mt-75', isModal && 'form-modal')}>
                <div className='mb-30'>
                    <h3 className='font-big text-lighten-black'>
                        {
                            !isModal ? 'Reset Password' : 'Change Password'
                        }
                    </h3>
                </div>
                {content}
            </div>
        )
    }
}