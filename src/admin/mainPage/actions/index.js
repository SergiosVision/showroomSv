export const GET_WORKS = 'dashboard/GET_WORKS'

export const getWorks = works  => {
    return {
        type: GET_WORKS,
        payload: works
    }
}