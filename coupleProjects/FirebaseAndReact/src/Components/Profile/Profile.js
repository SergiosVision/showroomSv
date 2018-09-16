import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, firestoreConnect } from 'react-redux-firebase';

import placeHolderImg from '../../Images/Placeholder.png';

import ReturnButton from '../Layout/ReturnButton/ReturnButton';
import Loader from '../Layout/Loader';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editMode: false,
            submitLoading: false,
            imgUploadLoading: false
        };

        this.firstName = React.createRef();
        this.lastName = React.createRef();
        this.phone = React.createRef();
    }

    setEditMode = () => {
        this.setState({editMode: true});
    };

    cancelEditMode = () => {
        this.setState({editMode: false});
    };

    saveSettings = () => {
        this.setState({submitLoading: true});
        const { firebase, firestore } = this.props;
        const updateProfileData = {
            firstName: this.firstName.current.value,
            lastName: this.lastName.current.value,
            phoneNumber: this.phone.current.value,
        };

        firestore.update({collection: 'users', doc: firebase.auth().currentUser.uid}, updateProfileData)
            .then(() => {
                this.setState({submitLoading: false});
                this.cancelEditMode()
            })
            .catch(error => {
                this.setState({submitLoading: false});
                console.log(error)
            });
    };

    photoUpload = (e) => {
        this.setState({imgUploadLoading: true});
        const { firebase, firestore } = this.props;
        let file = e.target.files[0];
        let fileName = file.name;
        let ext = fileName.slice(fileName.lastIndexOf('.')).split('.')[1];
        const ref = firebase.storage().ref(`users/${firebase.auth().currentUser.uid}.${ext}`);
        ref.put(file)
            .then(() => {
                ref.getDownloadURL()
                    .then(imageUrl => {
                        const uploadData = {photoURL: imageUrl, ext};
                        firestore.update({collection: 'users', doc: firebase.auth().currentUser.uid}, uploadData)
                            .then(this.setState({imgUploadLoading: false}))
                            .catch(error => {
                                this.setState({imgUploadLoading: false});
                                console.log(error);
                            })
                    })
            })
            .catch(error => {
                this.setState({imgUploadLoading: false});
                console.log(error);
            });
    };

    removePhoto = () => {
        const { curUser } = this.props;
        const { firebase, firestore } = this.props;
        const ref = firebase.storage().ref(`users/${firebase.auth().currentUser.uid}.${curUser.ext}`);
            ref.delete()
                .then(() => {
                    const uploadData = {photoURL: null, ext: null};
                    firestore.update({collection: 'users', doc: firebase.auth().currentUser.uid}, uploadData)
                })
                .catch(error => console.log(error))
    };

    render() {
        const { submitLoading, imgUploadLoading } = this.state;
        const { editMode } = this.state;
        const { curUser } = this.props;
        let content;

        if (curUser) {
            content = (
                <div className="card">
                    <div className="card-content">
                        <span className="card-title">User Profile</span>
                        <div className="row" style={{marginTop: 40}}>
                            <div className="col m2">
                                <div className='img-col circle valign z-depth-3'>
                                    {
                                        curUser.photoURL === null ?
                                            <img src={placeHolderImg} />:
                                            <img src={curUser.photoURL} />
                                    }
                                </div>
                                {
                                    editMode &&
                                        <div className="load-photo">
                                            {
                                                imgUploadLoading ? <div><span>Loading...</span></div> : (
                                                    <div className="row">
                                                        <div className="file-field input-field col m6 file-field-wrapper">
                                                            <div className="btn-small brown darken-2 fileupload-picker">
                                                                <i className="fas fa-upload"></i>
                                                                <input type="file" disabled={submitLoading} onChange={this.photoUpload} />
                                                            </div>
                                                        </div>
                                                        <div className="col m6">
                                                            {
                                                                curUser.photoURL !== null &&
                                                                <button  className='btn-small brown darken-2' onClick={this.removePhoto}>
                                                                    <i className="fas fa-trash-alt"></i>
                                                                </button>
                                                            }
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </div>
                                }
                            </div>
                            <div className="col m8">
                                <div className='profile-items'>
                                    <h5>Full Name: {' '}
                                        {!editMode && curUser.firstName} {!editMode && curUser.lastName}
                                    </h5>
                                    {
                                        editMode &&
                                        <div className="row input-field-holder">
                                            <div className="input-field col m6">
                                                <input defaultValue={curUser.firstName}
                                                       id="firstName"
                                                       name='firstName'
                                                       type="text"
                                                       placeholder='First Name'
                                                       ref={this.firstName}
                                                />
                                            </div>
                                            <div className="input-field col m6">
                                                <input defaultValue={curUser.lastName}
                                                       id="lastName"
                                                       name='lastName'
                                                       type="text"
                                                       placeholder='Last Name'
                                                       ref={this.lastName}
                                                />
                                            </div>
                                        </div>
                                    }
                                </div>
                                <div className='profile-items'>
                                    <h5>Email: {' '}
                                        {curUser.email}
                                    </h5>
                                </div>
                                <div className='profile-items'>
                                    <h5>Phone Number: {' '}
                                        {!editMode && curUser.phoneNumber}
                                    </h5>
                                    {
                                        editMode &&
                                            <div className='row input-field-holder'>
                                                <div className="input-field">
                                                    <input defaultValue={curUser.phoneNumber}
                                                           id="phoneNumber"
                                                           name='phoneNumber'
                                                           type="tel"
                                                           placeholder='Phone Number'
                                                           ref={this.phone}
                                                    />
                                                </div>
                                            </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            content = <Loader/>
        }

        return (
            <div>
                <div className="row">
                    <div className="col s6">
                        <ReturnButton link='/' text='Back To Dashboard' />
                    </div>
                    <div className="col s6">
                        <div className="btn-group right-align">
                            {
                                !editMode ?
                                    <button style={{marginRight: 10 + 'px'}} className='btn-small brown darken-2' onClick={this.setEditMode}>Edit</button>
                                    :
                                    <button style={{marginRight: 10 + 'px'}} disabled={submitLoading} className='btn-small brown darken-2' onClick={this.saveSettings}>{!submitLoading ? 'Save' : 'Saving...'}</button>
                            }
                            {editMode && <button className='btn-small brown darken-2' disabled={submitLoading} onClick={this.cancelEditMode}>Cancel</button>}
                        </div>
                    </div>
                </div>
                {content}
            </div>
        );
    }
}

Profile.propTypes = {
    firebase: PropTypes.object.isRequired,
    curUser: PropTypes.object
};


export default compose(
    firebaseConnect(),
    firestoreConnect(props => [
        {
            collection: 'users',
            storeAs: 'curUser',
            doc: props.firebase.auth().currentUser.uid
        }
    ]),
    connect(({ firestore: { ordered } }, props) => ({
        curUser: ordered.curUser && ordered.curUser[0]
    }))
)(Profile);