import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

import CheckUserReducer from 'common/reducers/auth'

export default combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    checkUser: CheckUserReducer,
    form: formReducer
})