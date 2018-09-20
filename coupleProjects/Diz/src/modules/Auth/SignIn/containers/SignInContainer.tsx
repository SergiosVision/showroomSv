import * as React from 'react'
import {connect, DispatchProp} from 'react-redux'
import {InjectedFormProps, reduxForm} from 'redux-form'
import axios, {AxiosError, AxiosResponse} from 'axios'

import {history} from 'store'
import {State} from 'reducers'

import {
    hideSubmitLoader,
    setSignInError,
    showSubmitLoader
} from '../actions'

import SignInForm from 'modules/Auth/SignIn/components/SignInForm'

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
    setSignInError: (errorMessage: string) => void,
    showSubmitLoader: () => void,
    hideSubmitLoader: () => void,
    // setAccessToken: (accessToken: string) => void
}

class SignInContainer extends React.Component<Props & DispatchProps & DispatchProp<{}>> {
    render() {
        const {handleSubmit, errorMessage, isShowSubmitLoader} = this.props

        return (
            <SignInForm
                submitForm={handleSubmit(this.submitForm)}
                errorMessage={errorMessage}
                isShowSubmitLoader={isShowSubmitLoader}
            />
        )
    }

    private submitForm = (values: FormProps) => {
        const { email, password } = values
        const postData = {
            email: email.trim(),
            password: password.trim()
        }

        this.props.showSubmitLoader()

        axios
            .post(`${process.env.SERVICE_URL}/auth/sign-in`, {postData})
            .then((response: AxiosResponse) => {
                // cookie.save('AccessToken', response.headers.token, {
                //     Expire: 'Session',
                //     path: '/'
                // })
                // this.props.setAccessToken(response.headers.token)
                this.props.hideSubmitLoader()

                history.push('/')
            })
            .catch(
                (error: AxiosError) => {
                    this.props.hideSubmitLoader()
                    this.props.setSignInError(error.response.data.message)
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

    if (!values.password) {
        errors.password = requiredMessage
    }

    return errors
}

const SignInReduxForm = reduxForm({
    form: 'SignIn',
    validate
})(SignInContainer)

const mapStateToProps = (state: State) => {
    return {
        errorMessage: state.signInForm.errorMessage,
        isShowSubmitLoader: state.signInForm.isShowSubmitLoader
    }
}

export default connect(
    mapStateToProps,
    {
        setSignInError,
        showSubmitLoader,
        hideSubmitLoader
    }
)(SignInReduxForm as any)