import * as React from 'react'
import {connect, DispatchProp} from 'react-redux'
import {InjectedFormProps, reduxForm} from 'redux-form'
import axios, {AxiosError, AxiosResponse} from 'axios'

import {history} from 'store'
import {State} from 'reducers'

import {
    hideSubmitLoader,
    setResetPasswordError,
    showSubmitLoader
} from '../actions'
import {closeProfileChangePasswordModal} from 'common/modals/profileChangePassword/actions'

import ResetPasswordForm from 'modules/Auth/ResetPassword/components/ResetPasswordForm'

const cookie = require('react-cookies')

interface FormProps {
    password: string,
    repeatPassword: string,
}

interface Props extends InjectedFormProps<FormProps> {
    errorMessage: string,
    isShowSubmitLoader: boolean,
    isModal: boolean
}

interface DispatchProps {
    setResetPasswordError: (errorMessage: string) => void,
    showSubmitLoader: () => void,
    hideSubmitLoader: () => void,
    closeProfileChangePasswordModal: () => void
    // setAccessToken: (accessToken: string) => void
}

class ResetPasswordContainer extends React.Component<Props & DispatchProps & DispatchProp<{}>> {
    render() {
        const {handleSubmit, errorMessage, isShowSubmitLoader, isModal, closeProfileChangePasswordModal} = this.props

        return (
            <ResetPasswordForm
                submitForm={handleSubmit(this.submitForm)}
                errorMessage={errorMessage}
                isShowSubmitLoader={isShowSubmitLoader}
                isModal={isModal}
                closeModal={closeProfileChangePasswordModal}
            />
        )
    }

    private submitForm = (values: FormProps) => {
        const { password } = values
        const postData = {
            token: 'y23h2h35uyg23y5235i2g35y2gu52g3',
            email: 'test@mail.com',
            password: password.trim()
        }

        this.props.showSubmitLoader()

        axios
            .post(`${process.env.SERVICE_URL}/auth/reset-password`, {postData})
            .then((response: AxiosResponse) => {
                // cookie.save('AccessToken', response.headers.token, {
                //     Expire: 'Session',
                //     path: '/'
                // })
                // this.props.setAccessToken(response.headers.token)
                this.props.hideSubmitLoader()

                history.push('/auth')
            })
            .catch(
                (error: AxiosError) => {
                    this.props.hideSubmitLoader()
                    this.props.setResetPasswordError(error.response.data.message)
                }
            )
    }
}

const validate = (values: FormProps) => {
    const errors = {} as any
    const requiredMessage = 'This field is required.'

    if (!values.password) {
        errors.password = requiredMessage
    } else if (values.password !== values.repeatPassword) {
        errors.password = 'Passwords do not match'
    }

    if (!values.repeatPassword) {
        errors.repeatPassword = requiredMessage
    } else if (values.password !== values.repeatPassword) {
        errors.repeatPassword = 'Passwords do not match'
    }

    return errors
}

const ResetPasswordReduxForm = reduxForm({
    form: 'ResetPasswordContainer',
    validate
})(ResetPasswordContainer)

const mapStateToProps = (state: State) => {
    return {
        errorMessage: state.resetPasswordForm.errorMessage,
        isShowSubmitLoader: state.resetPasswordForm.isShowSubmitLoader,
        isModal: state.profileChangePasswordModal.modal
    }
}

export default connect(
    mapStateToProps,
    {
        setResetPasswordError,
        showSubmitLoader,
        hideSubmitLoader,
        closeProfileChangePasswordModal
    }
)(ResetPasswordReduxForm as any)