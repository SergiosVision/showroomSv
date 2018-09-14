import * as firebase from "firebase";
import { config } from "./keys";

firebase.initializeApp(config);

export const db = (collection) => {
    return {
        DBRO: firebase.database().ref(`/${collection}`).once('value'),
        DBR: firebase.database().ref(`/${collection}`)
    }
};

export const authRefs = (data) => {
    return {
        aRef: firebase.auth().createUserWithEmailAndPassword(data),
        oRef: firebase.signOut()
    }
};
