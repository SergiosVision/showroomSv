export const OPEN_PROFILE_CHANGE_PASSWORD_MODAL = 'profile_change_password_modal/OPEN'

export function openProfileChangePasswordModal() {
    return {
        type: OPEN_PROFILE_CHANGE_PASSWORD_MODAL
    }
}

export const CLOSE_PROFILE_CHANGE_PASSWORD_MODAL = 'profile_change_password_modal/CLOSE'

export function closeProfileChangePasswordModal() {
    return {
        type: CLOSE_PROFILE_CHANGE_PASSWORD_MODAL
    }
}
