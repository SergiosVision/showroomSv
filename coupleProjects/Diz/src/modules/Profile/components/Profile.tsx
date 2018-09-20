import * as React from 'react'
import {Field} from 'redux-form'
import { Link } from 'react-router-dom'

import LabeledItem from 'common/components/LabeledItem'
import ProfileChangePasswordModalContainer from 'common/modals/profileChangePassword/containers/ProfileChangePasswordModalContainer'
import { ProfilePage } from 'common/types/profile'
import {FormGeneralError} from 'common/components/FormError'

const AddImg = require(`!svg-react-loader?name=Icon!common/icons/add.svg`)
const RemoveImg = require(`!svg-react-loader?name=Icon!common/icons/trash.svg`)

const cx = require('classnames/bind').bind(require('../styles/styles.scss'))

interface Props {
    editMode: boolean,
    uploadImage: (value: any) => void,
    removeImage: () => void,
    imgUrl: string,
    user: ProfilePage,
    error: any,
    isFetching: boolean
    saveForm: (e: React.FormEvent<HTMLFormElement>) => void
}

export default class Profile extends React.Component<Props> {
    render() {
        const {
            editMode,
            uploadImage,
            removeImage,
            imgUrl,
            isFetching,
            error,
            user,
            saveForm
        } = this.props
        let content

        if (user) {
            content = (
                <div className='row bg-white'>
                    <div className={cx('column md-3', 'left-side', 'pl-40 pr-40')}>
                        <div className={cx('profile-img-holder', 'mb-15', editMode && 'profile-edit')}>
                            <div className={cx('img-holder')}>
                                {
                                    imgUrl && <img src={imgUrl}/>
                                }
                            </div>
                            {
                                editMode &&
                                <div className={cx('edit-buttons-holder')}>
                                    <div className={cx('add-img')}>
                                        <input className={cx('file-picker')} type='file' onChange={uploadImage} />
                                        <AddImg />
                                    </div>
                                    <div onClick={removeImage} className={cx('remove-img')}>
                                        <RemoveImg />
                                    </div>
                                </div>
                            }
                        </div>
                        <div className={cx('bottom-info', 'flex align-items-center justify-content-between')}>
                            <LabeledItem label='Account Type'
                                         text={
                                             user.type === 0 && 'Merchant'
                                         }
                                         editable={false}
                                         className={'mb-0'}
                            />
                            <LabeledItem label='Team'
                                         text='Team Alpha'
                                         editable={false}
                            />
                        </div>
                    </div>
                    <div className='column md-9'>
                        <div className='pl-15 pt-30'>
                            <form onSubmit={saveForm}>
                                <LabeledItem label='First Name'
                                             text={user.first_name}
                                             editable={true}
                                             editMode={editMode}
                                />
                                <LabeledItem label='Last Name'
                                             text={user.last_name}
                                             editable={true}
                                             editMode={editMode}
                                />
                                <LabeledItem label='Phone Number'
                                             text={user.phone}
                                             editable={true}
                                             editMode={editMode}
                                />
                                <LabeledItem label='E-mail'
                                             text={user.email}
                                             editable={true}
                                             editMode={editMode}
                                />
                                {error && <span>{error.message}</span>}
                            </form>
                        </div>
                    </div>
                </div>
            )
        } else {
            content = <span>Loading...</span>
        }

        return (
            <div>
                {content}
                <ProfileChangePasswordModalContainer />
            </div>
        )
    }
}