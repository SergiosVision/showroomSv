import * as firebase from "firebase";
import { config } from "./keys";

firebase.initializeApp(config);

export const getCollection = (collection) => {
    return {
        dataBaseOnce: firebase.database().ref(`/${collection}`).once('value'),
        dataBase: firebase.database().ref(`/${collection}`)
    }
};
