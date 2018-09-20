export const SET_ACCESS_TOKEN = 'sign_in_form/SET_ACCESS_TOKEN'

export const setAccessToken = (accessToken: string) => {
    return {
        type: SET_ACCESS_TOKEN,
        payload: accessToken
    }
}