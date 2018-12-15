import { createStore, compose } from 'redux'
import { reactReduxFirebase } from 'react-redux-firebase';
import { reduxFirestore } from 'redux-firestore';
import firebase from 'firebase'
import rootReducer from 'reducers'
import createHistory from 'history/createBrowserHistory'
import 'firebase/firestore'

import { config } from 'firebaseConfig/keys'

const initialState = {}

const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

firebase.initializeApp(config);

const firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);

const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase)
)(createStore);

export const history = createHistory()

export const store = createStoreWithFirebase(
    rootReducer,
    initialState,
    compose(
        reactReduxFirebase(firebase),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);