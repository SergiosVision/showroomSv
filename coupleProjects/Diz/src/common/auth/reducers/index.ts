import {Action, handleActions} from 'redux-actions'

import { SET_ACCESS_TOKEN } from '../actions'

export interface AuthToken {
    accessToken: string
}

const initialState = <AuthToken> {
    accessToken: '2323523ergergergerg343tgeg'
}

export interface AccessTokenPayload {
    accessToken: string
}

const handleSetAccessToken = (state: AuthToken, action: Action<AccessTokenPayload>) => {
    return {
        ...state,
        accessToken: action.payload.accessToken
    }
}

export default handleActions<AuthToken>(
    {
        [SET_ACCESS_TOKEN]: handleSetAccessToken
    } as any,
    initialState
)