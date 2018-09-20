import * as React from 'react'

import {Field} from 'redux-form'
import { Link } from 'react-router-dom'
import Button from 'common/components/Button'

const cx = require('classnames/bind').bind(require('../styles/styles.scss'))

interface Props {
    turnEditMode: () => void,
    offEditMode: () => void,
    editMode: boolean
    isShowSubmitLoader: boolean,
    openModal: () => void,
    saveForm: () => void
}

export default class TopSection extends React.Component<Props> {
    render() {
        const { turnEditMode, offEditMode, editMode, isShowSubmitLoader, openModal, saveForm } = this.props
        console.log(isShowSubmitLoader)

        return (
            <div>
                <div className={cx('top-section', 'flex align-items-center justify-content-between pl-15 pr-40 pt-30 pb-65')}>
                    <h3 className={cx('container-title')}>User Profile</h3>
                    <div className={cx('buttons-holder', 'flex align-items-center')}>
                        {
                            !editMode
                                ?
                                <Button onClick={turnEditMode} fixedWidth>Edit</Button>
                                :
                                <Button fixedWidth type='submit' onClick={saveForm}>
                                    {isShowSubmitLoader ? 'Saving...' : 'Save'}
                                </Button>
                        }
                        {
                            !editMode
                                ?
                                <Button onClick={openModal} className={cx('ml-20')} fixedWidth>Change Password</Button>
                                :
                                <Button onClick={offEditMode} className={cx('ml-20')} fixedWidth>Cancel</Button>
                        }
                    </div>
                </div>
                <div/>
            </div>
        )
    }
}