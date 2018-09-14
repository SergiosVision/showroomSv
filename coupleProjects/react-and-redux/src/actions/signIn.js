import { SIGN_IN, FETCH_USER, LOG_OUT } from "./types";
import { authRefs } from '../config/firebase';

export const fetchUser = () => dispatch => {
    authRefs.aRef(user => {
        if(user) {
            dispatch({
                type: FETCH_USER,
                payload: user
            })
        } else {
            dispatch({
                type: FETCH_USER,
                payload: null
            })
        }
    })
};

export const signIn = (data) => dispatch => {
    authRefs(data).aRef
        .then(response => console.log(`Success`, response))
        .catch(error => console.log(error))
};

export const signOut = () => dispatch => {
    authRefs.oRef()
        .then(console.log('Logged Out'))
        .catch(error => console.log(error))
};