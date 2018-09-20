import {Action, handleActions} from 'redux-actions'
import {ErrorPayload} from 'common/payloads/ErrorActionPayload'
import {
    SHOW_SUBMIT_LOADER,
    HIDE_SUBMIT_LOADER,
    SET_SIGN_UP_MERCHANT_ERROR
} from '../actions'

export interface SignUpMerchantFormState {
    isShowSubmitLoader: boolean,
    errorMessage: string,
}

const initialState = <SignUpMerchantFormState>{
    isShowSubmitLoader: false,
    errorMessage: undefined as string
}

function handleShowSubmitLoader(state: SignUpMerchantFormState) {
    return {...state,
        isShowSubmitLoader: true
    }
}

function handleHideSubmitLoader(state: SignUpMerchantFormState) {
    return {...state,
        isShowSubmitLoader: false
    }
}

function handleError(state: SignUpMerchantFormState, action: Action<ErrorPayload>) {
    return {
        ...state,
        errorMessage: action.payload.error
    }
}

export default handleActions<SignUpMerchantFormState>(
    {
        [SET_SIGN_UP_MERCHANT_ERROR]: handleError,
        [SHOW_SUBMIT_LOADER]: handleShowSubmitLoader,
        [HIDE_SUBMIT_LOADER]: handleHideSubmitLoader
    } as any,
    initialState
)
