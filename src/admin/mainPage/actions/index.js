export const WORKS_LOADING = 'main_page/GET_WORKS'

export const loadWorks = works => dispatch => {
    dispatch({
        type: WORKS_LOADING,
        payload: works
    })
}

export const SINGLE_WORK = 'main_page/SINGLE_WORK'

export const singleWork = work => dispatch => {
    dispatch({
        type: SINGLE_WORK,
        payload: work
    })
}