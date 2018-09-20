import * as React from 'react'
import {connect, DispatchProp} from 'react-redux'
import {InjectedFormProps, reduxForm} from 'redux-form'
import axios, {AxiosError, AxiosResponse} from 'axios'

import {history} from 'store'
import {State} from 'reducers'

import {
    hideSubmitLoader,
    setProfileUpdateError,
    showSubmitLoader
} from '../actions/form'

import {
    profileReceive,
    errorProfile,
    requestProfile,
    setProfileForceLoad
} from '../actions'

import { openProfileChangePasswordModal } from 'common/modals/profileChangePassword/actions'
import { ProfilePayload } from 'common/payloads/ProfilePayload'
import { ProfilePage } from 'common/types/profile'

import TopSection from 'modules/Profile/components/TopSection'
import Profile from 'modules/Profile/components/Profile'
import form from '../reducers/form'
import Axios from 'axios'

const cookie = require('react-cookies')

interface FormProps {
    first_name: string,
    last_name: string,
    phone: string,
    email: string
}

interface Props {
    errorMessage: string,
    isShowSubmitLoader: boolean,
    saveLoader: boolean,
    openProfileChangePasswordModal: () => void,
    isFetching: boolean,
    profilePage: ProfilePage,
    error?: any,
    forceLoad: boolean,
}

interface DispatchProps {
    setProfileUpdateError: (errorMessage: string) => void,
    showSubmitLoader: () => void,
    hideSubmitLoader: () => void,
    requestProfile: () => void,
    profileReceive: (payload: ProfilePayload) => void,
    errorProfile: (errorMessage: string) => void,
    setProfileForceLoad: (value: boolean) => void
}

class ProfileContainer extends React.Component<Props & DispatchProps & DispatchProp<{}> & InjectedFormProps<FormProps>> {
    state = {
        editMode: false,
        imgUrl: undefined as string
    }

    componentWillMount() {
        const { setProfileForceLoad, requestProfile, profileReceive, setProfileUpdateError } = this.props
        const upData = {
            user: {
                id: 1,
                merchant_id: 1,
                type: 0,
                first_name: 'Test',
                last_name: 'Test2',
                email: 'mail@mail.com',
                phone: '11111111111'
            }
        }
        profileReceive(upData)
        // setProfileForceLoad(true)
        // requestProfile()
        // return axios
        //     .get(`${process.env.SERVICE_URL}/profile`, {
        //         headers: {Authorization: ''}
        //     })
        //     .then(
        //         (json: AxiosResponse<ProfilePayload>) => {
        //             profileReceive(json.data)
        //         }
        //     )
        //     .catch(error => errorProfile(error))
    }

    public componentWillUnmount() {
        const { errorProfile } = this.props

        errorProfile('')
    }

    render() {
        const { editMode, imgUrl } = this.state
        const {
            handleSubmit,
            saveLoader,
            openProfileChangePasswordModal,
            profilePage,
            isFetching,
            error
        } = this.props

        return (
           <div>
               <TopSection
                   editMode={editMode}
                   turnEditMode={this.turnEditMode}
                   offEditMode={this.offEditMode}
                   isShowSubmitLoader={saveLoader}
                   openModal={openProfileChangePasswordModal}
                   saveForm={handleSubmit(this.handleSaveProfile)}
               />
               <Profile
                   editMode={editMode}
                   uploadImage={this.uploadImage}
                   removeImage={this.removeImage}
                   imgUrl={imgUrl}
                   user={profilePage}
                   error={error}
                   isFetching={isFetching}
                   saveForm={handleSubmit(this.handleSaveProfile)}
               />
           </div>
        )
    }

    private turnEditMode = () => {
        this.setState({editMode: true})
    }

    private offEditMode = () => {
        this.setState({
            editMode: false,
            imgUrl: undefined as string
        })
    }

    private uploadImage = (e: any) => {
        let file = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (res) => {
            this.setState({imgUrl: res.target.result})
        }
    }

    private removeImage = () => {
        this.setState({imgUrl: undefined as string})
    }

    private handleSaveProfile = (values: FormProps) => {
        const { showSubmitLoader, setProfileUpdateError, hideSubmitLoader } = this.props
        const upData = {
            first_name: 'Test',
            last_name: 'Test2',
            email: 'mail@mail.com',
            phone: '11111111111',
            password: 'passpass'
        }

        showSubmitLoader()

        axios
            .patch(`${process.env.SERVICE_URL}/profile`, {upData}, {
                headers: { Authorization: ''}
            })
            .then(() => {
                setProfileUpdateError('')
                hideSubmitLoader()
                this.setState({editMode: false})
            })
            .catch(
                (error: AxiosError) => {
                    setProfileUpdateError(error.response.data.message)
                }
            )
    }
}

const ProfileReduxeForm = reduxForm({
    form: 'profilePageForm'
})(ProfileContainer)

const mapStateToProps = (state: State) => {
    return {
        errorMessage: state.resetPasswordForm.errorMessage,
        isShowSubmitLoader: state.resetPasswordForm.isShowSubmitLoader,
        saveLoader: state.profile.isShowSubmitLoader,
        profilePage: state.profilePage.profilePage,
        isFetching: state.profilePage.isFetching,
        error: state.profilePage.error,
        forceLoad: state.profilePage.forceLoad
    }
}

export default connect(
    mapStateToProps,
    {
        setProfileUpdateError,
        showSubmitLoader,
        hideSubmitLoader,
        openProfileChangePasswordModal,
        profileReceive,
        errorProfile,
        requestProfile,
        setProfileForceLoad
    }
)(ProfileReduxeForm as any)