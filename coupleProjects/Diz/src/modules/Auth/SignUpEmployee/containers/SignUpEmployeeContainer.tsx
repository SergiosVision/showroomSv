import * as React from 'react'
import {connect, DispatchProp} from 'react-redux'
import {InjectedFormProps, reduxForm} from 'redux-form'
import axios, {AxiosError, AxiosResponse} from 'axios'

import {history} from 'store'
import {State} from 'reducers'

import {
    hideSubmitLoader,
    setSignUpEmployeeError,
    showSubmitLoader
} from '../actions'

import SignUpEmployeeForm from 'modules/Auth/SignUpEmployee/components/SignUpEmployeeForm'

const cookie = require('react-cookies')

interface FormProps {
    password: string,
    repeatPassword: string,
}

interface Props extends InjectedFormProps<FormProps> {
    errorMessage: string,
    isShowSubmitLoader: boolean,
}

interface DispatchProps {
    setSignUpEmployeeError: (errorMessage: string) => void,
    showSubmitLoader: () => void,
    hideSubmitLoader: () => void,
    // setAccessToken: (accessToken: string) => void
}

class SignUpEmployeeContainer extends React.Component<Props & DispatchProps & DispatchProp<{}>> {
    render() {
        const {handleSubmit, errorMessage, isShowSubmitLoader} = this.props

        return (
            <SignUpEmployeeForm
                submitForm={handleSubmit(this.submitForm)}
                errorMessage={errorMessage}
                isShowSubmitLoader={isShowSubmitLoader}
            />
        )
    }

    private submitForm = (values: FormProps) => {
        const { password } = values
        const postData = {
            token: 'y23h2h35uyg23y5235i2g35y2gu52g3',
            password: password.trim()
        }

        this.props.showSubmitLoader()

        axios
            .post(`${process.env.SERVICE_URL}/auth/sign-up/employee`, {postData})
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
                    this.props.setSignUpEmployeeError(error.response.data.message)
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

const SignUpEmployeeReduxForm = reduxForm({
    form: 'SignUpEmployeeContainer',
    validate
})(SignUpEmployeeContainer)

const mapStateToProps = (state: State) => {
    return {
        errorMessage: state.signUpEmployeeForm.errorMessage,
        isShowSubmitLoader: state.signUpEmployeeForm.isShowSubmitLoader
    }
}

export default connect(
    mapStateToProps,
    {
        setSignUpEmployeeError,
        showSubmitLoader,
        hideSubmitLoader
    }
)(SignUpEmployeeReduxForm as any)