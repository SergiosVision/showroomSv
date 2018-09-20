import * as React from 'react'
import {connect} from 'react-redux'

import {State} from 'reducers'
import Modal from 'common/components/Modal'

import {closeProfileChangePasswordModal} from '../actions'
import ResetPasswordContainer from 'modules/Auth/ResetPassword/containers/ResetPasswordContainer'
import {setResetPasswordError} from 'modules/Auth/ResetPassword/actions'

interface Props {
    showModal: boolean,
}

interface DispatchProps {
    closeProfileChangePasswordModal: () => void,
    setResetPasswordError: (errorMessage: string) => void,
}

class ProfileChangePasswordModalContainer extends React.Component<Props & DispatchProps> {
    render() {
        const {showModal} = this.props

        return (
            <Modal open={showModal} handleClose={this.handleCloseModal}>
                <ResetPasswordContainer/>
            </Modal>
        )
    }

    private handleCloseModal = () => {
        this.props.setResetPasswordError('')
        this.props.closeProfileChangePasswordModal()
    }
}

const mapStateToProps = (state: State) => {
    return {
        showModal: state.profileChangePasswordModal.open
    }
}

export default connect<Props, DispatchProps>(
    mapStateToProps,
    {closeProfileChangePasswordModal, setResetPasswordError}
)(ProfileChangePasswordModalContainer)
