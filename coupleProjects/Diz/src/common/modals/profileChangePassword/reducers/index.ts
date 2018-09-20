import {handleActions} from 'redux-actions'
import {
    CLOSE_PROFILE_CHANGE_PASSWORD_MODAL,
    OPEN_PROFILE_CHANGE_PASSWORD_MODAL
} from '../actions'

export interface ProfileChangePasswordModalState {
    open: boolean,
    modal: boolean
}

const initialState = <ProfileChangePasswordModalState>{
    open: false,
    modal: false
}

function handleOpenModal(state: ProfileChangePasswordModalState) {
    return {
        ...state,
        open: true,
        modal: true
    }
}

function handleCloseModal(state: ProfileChangePasswordModalState) {
    return {
        ...state,
        open: false,
        modal: false
    }
}

export default handleActions<ProfileChangePasswordModalState>(
    {
        [OPEN_PROFILE_CHANGE_PASSWORD_MODAL]: handleOpenModal,
        [CLOSE_PROFILE_CHANGE_PASSWORD_MODAL]: handleCloseModal
    } as any,
    initialState
)
