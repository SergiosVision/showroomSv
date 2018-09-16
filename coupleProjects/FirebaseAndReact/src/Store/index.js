import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';

// Reducers
import NotifyReducer from '../Reducers/NotifyReducer';
import SettingsReducer from '../Reducers/SettingsReducer';

const config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
};

// react-redux-firebase config
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

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    notify: NotifyReducer,
    settings: SettingsReducer
});

if (localStorage.getItem('settings') == null) {
    const defaultSettings = {
        aDisableBalance: false,
        eDisableBalance: false,
        allowRegistration: true,
        disableDelete: false
    };

    localStorage.setItem('settings', JSON.stringify(defaultSettings));
}

const initialState = {settings: JSON.parse(localStorage.getItem('settings'))};

const store = createStoreWithFirebase(
    rootReducer,
    initialState,
    compose(
        reactReduxFirebase(firebase),
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;