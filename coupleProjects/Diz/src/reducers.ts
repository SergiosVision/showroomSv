import {combineReducers} from 'redux'
import { reducer as formReducer } from 'redux-form'

import signInFormReducer, { SignInFormState } from './modules/Auth/SignIn/reducers/'
import signInUpMerchantFormReducer, { SignUpMerchantFormState } from './modules/Auth/SignUpMerchant/reducers/'
import signInUpEmployeeFormReducer, { SignUpEmployeeFormState } from './modules/Auth/SignUpEmployee/reducers/'
import forgotPasswordFormReducer, { ForgotPasswordFormState } from './modules/Auth/ForgotPassword/reducers/'
import resetPasswordFormReducer, { ResetPasswordFormState } from './modules/Auth/ResetPassword/reducers/'
import profileReducer, { ProfileUpateState } from './modules/Profile/reducers/form'
import profilePageReducer, { ProfilePageState } from './modules/Profile/reducers/index'
import profileResetPasswordModalReducer, {ProfileChangePasswordModalState} from './common/modals/profileChangePassword/reducers'

export interface State {
    profile: ProfileUpateState,
    profilePage: ProfilePageState,
    resetPasswordForm: ResetPasswordFormState,
    signInForm: SignInFormState,
    signUpMerchantForm: SignUpMerchantFormState,
    signUpEmployeeForm: SignUpEmployeeFormState,
    forgotPasswordForm: ForgotPasswordFormState,
    profileChangePasswordModal: ProfileChangePasswordModalState
}

const appReducer = combineReducers({
    form: formReducer,
    profile: profileReducer,
    profilePage: profilePageReducer,
    resetPasswordForm: resetPasswordFormReducer,
    signInForm: signInFormReducer,
    signUpMerchantForm: signInUpMerchantFormReducer,
    signUpEmployeeForm: signInUpEmployeeFormReducer,
    forgotPasswordForm: forgotPasswordFormReducer,
    profileChangePasswordModal: profileResetPasswordModalReducer
})

export default appReducer
