import * as React from 'react'
import {connect, DispatchProp} from 'react-redux'
import {InjectedFormProps, reduxForm} from 'redux-form'
import axios, {AxiosError, AxiosResponse} from 'axios'

import {history} from 'store'
import {State} from 'reducers'

import {
    hideSubmitLoader,
    setForgotPasswordError,
    showSubmitLoader
} from '../actions'

import ForgotPasswordForm from 'modules/Auth/ForgotPassword/components/ForgotPasswordForm'

const cookie = require('react-cookies')

interface FormProps {
    email: string,
    password: string
}

interface Props extends InjectedFormProps<FormProps> {
    errorMessage: string,
    isShowSubmitLoader: boolean,
}

interface DispatchProps {
    setForgotPasswordError: (errorMessage: string) => void,
    showSubmitLoader: () => void,
    hideSubmitLoader: () => void,
    // setAccessToken: (accessToken: string) => void
}

class ForgotPasswordContainer extends React.Component<Props & DispatchProps & DispatchProp<{}>> {
    render() {
        const {handleSubmit, errorMessage, isShowSubmitLoader} = this.props

        return (
            <ForgotPasswordForm
                submitForm={handleSubmit(this.submitForm)}
                errorMessage={errorMessage}
                isShowSubmitLoader={isShowSubmitLoader}
            />
        )
    }

    private submitForm = (values: FormProps) => {
        const { email } = values
        const postData = {
            email: email.trim()
        }

        this.props.showSubmitLoader()

        axios
            .post(`${process.env.SERVICE_URL}/auth/forgot-password`, {postData})
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
                    this.props.setForgotPasswordError(error.response.data.message)
                }
            )
    }
}

const validate = (values: FormProps) => {
    const errors = {} as any
    const requiredMessage = 'This field is required.'

    if (!values.email) {
        errors.email = requiredMessage
    }

    return errors
}

const ForgotPasswordReduxForm = reduxForm({
    form: 'ForgotPassword',
    validate
})(ForgotPasswordContainer)

const mapStateToProps = (state: State) => {
    return {
        errorMessage: state.forgotPasswordForm.errorMessage,
        isShowSubmitLoader: state.forgotPasswordForm.isShowSubmitLoader
    }
}

export default connect(
    mapStateToProps,
    {
        setForgotPasswordError,
        showSubmitLoader,
        hideSubmitLoader
    }
)(ForgotPasswordReduxForm as any)