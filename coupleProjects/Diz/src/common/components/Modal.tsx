import * as React from 'react'

const ReactModal = require('react-modal')
const cx = require('classnames/bind').bind(require('./styles/modal.scss'))

ReactModal.setAppElement('#content')

interface Props {
    open: boolean,
    handleClose: () => void
}

export default class Modal extends React.Component<Props> {
    componentDidUpdate () {
        if (this.props.open) {
            document.body.classList.add('lock-position')
        } else {
            document.body.classList.remove('lock-position')
        }
    }

    render() {
        return (
            <ReactModal
                overlayClassName={cx('overlay')}
                className={cx('content')}
                onRequestClose={this.props.handleClose}
                isOpen={this.props.open}
            >
                {this.props.children}
            </ReactModal>
        )
    }
}
