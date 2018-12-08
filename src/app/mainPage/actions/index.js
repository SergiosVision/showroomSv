export const GET_WORKS = 'main_page/GET_WORKS'

export const getWorks = works => {
    return {
        type: GET_WORKS,
        payload: works
    }
}