import {
    DISABLE_BALANCE_ADD,
    DISABLE_BALANCE_EDIT,
    ALLOW_REGISTRATION,
    DISABLE_BALANCE_DELETE
} from "../Actions/Types";



export default (state = {}, action) => {
    switch (action.type) {
        case DISABLE_BALANCE_ADD:
            return {
                ...state,
                aDisableBalance: action.payload
            };
        case DISABLE_BALANCE_EDIT:
            return {
                ...state,
                eDisableBalance: action.payload

            };
        case ALLOW_REGISTRATION:
            return {
                ...state,
                allowRegistration: action.payload

            };
        case DISABLE_BALANCE_DELETE:
            return {
                ...state,
                disableDelete: action.payload
            };
        default:
            return state;
    }
}