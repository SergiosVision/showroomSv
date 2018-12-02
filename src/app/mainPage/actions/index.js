export const WORKS_LOADING = 'main_page/GET_WORKS'

export const loadWorks = works => dispatch => {
    dispatch({
        type: WORKS_LOADING,
        payload: works
    })
}