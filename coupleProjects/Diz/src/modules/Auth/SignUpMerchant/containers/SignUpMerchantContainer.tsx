import * as React from 'react'
import {connect, DispatchProp} from 'react-redux'
import {InjectedFormProps, reduxForm} from 'redux-form'
import axios, {AxiosError, AxiosResponse} from 'axios'

import {history} from 'store'
import {State} from 'reducers'

import {
    hideSubmitLoader,
    setSignUpMerchantError,
    showSubmitLoader
} from '../actions'

import SignUpMerchantForm from 'modules/Auth/SignUpMerchant/components/SignUpMerchantForm'

const cookie = require('react-cookies')

interface FormProps {
    email: string,
    password: string,
    repeatPassword: string,
    is_individual: boolean
}

interface Props extends InjectedFormProps<FormProps> {
    errorMessage: string,
    isShowSubmitLoader: boolean,
}

interface DispatchProps {
    setSignUpMerchantError: (errorMessage: string) => void,
    showSubmitLoader: () => void,
    hideSubmitLoader: () => void,
    // setAccessToken: (accessToken: string) => void
}

class SignUpMerchantContainer extends React.Component<Props & DispatchProps & DispatchProp<{}>> {
    state = {
        individualMerchant: false
    }

    render() {
        const {handleSubmit, errorMessage, isShowSubmitLoader} = this.props

        return (
            <SignUpMerchantForm
                submitForm={handleSubmit(this.submitForm)}
                errorMessage={errorMessage}
                isShowSubmitLoader={isShowSubmitLoader}
                handleCheckBox={this.handleCheckBoxChange}
            />
        )
    }

    private submitForm = (values: FormProps) => {
        const { individualMerchant } = this.state
        const { email, password } = values
        const postData = {
            email: email.trim(),
            password: password.trim(),
            is_individual: individualMerchant
        }

        this.props.showSubmitLoader()

        axios
            .post(`${process.env.SERVICE_URL}/auth/sign-up/merchant`, {postData})
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
                    this.props.setSignUpMerchantError(error.response.data.message)
                }
            )
    }

    private handleCheckBoxChange = (e: any) => {
        this.setState({
            individualMerchant: e.target.checked
        })
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

const SignUpMerchantReduxForm = reduxForm({
    form: 'SignUpMerchantContainer',
    validate
})(SignUpMerchantContainer)

const mapStateToProps = (state: State) => {
    return {
        errorMessage: state.signUpMerchantForm.errorMessage,
        isShowSubmitLoader: state.signUpMerchantForm.isShowSubmitLoader
    }
}

export default connect(
    mapStateToProps,
    {
        setSignUpMerchantError,
        showSubmitLoader,
        hideSubmitLoader
    }
)(SignUpMerchantReduxForm as any)