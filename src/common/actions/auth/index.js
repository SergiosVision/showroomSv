export const USER = 'USER'

export const setUser = user => {
    return {
        type: USER,
        payload: user
    }
}