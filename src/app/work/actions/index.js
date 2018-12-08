export const SINGLE_WORK = 'main_page/SINGLE_WORK'

export const getSingleWork = work => {
    return {
        type: SINGLE_WORK,
        payload: work
    }
}

export const SINGLE_WORK_CLEAR = 'main_page/SINGLE_WORK_CLEAR'

export const clearSingleWork = () => {
    return {
        type: SINGLE_WORK
    }
}