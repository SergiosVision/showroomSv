import {
    DISABLE_BALANCE_ADD,
    DISABLE_BALANCE_EDIT,
    ALLOW_REGISTRATION,
    DISABLE_BALANCE_DELETE
} from "./Types";

export const setDisableBalanceAdd = ()  => {
    const settings = JSON.parse(localStorage.getItem('settings'));

    settings.aDisableBalance = !settings.aDisableBalance;

    localStorage.setItem('settings', JSON.stringify(settings));

    return {
        type: DISABLE_BALANCE_ADD,
        payload: settings.aDisableBalance
    }
};

export const setDisableBalanceEdit = ()  => {
    const settings = JSON.parse(localStorage.getItem('settings'));

    settings.eDisableBalance = !settings.eDisableBalance;

    localStorage.setItem('settings', JSON.stringify(settings));

    return {
        type: DISABLE_BALANCE_EDIT,
        payload: settings.eDisableBalance
    }
};

export const setAllowRegistration = ()  => {
    const settings = JSON.parse(localStorage.getItem('settings'));

    settings.allowRegistration = !settings.allowRegistration;

    localStorage.setItem('settings', JSON.stringify(settings));

    return {
        type: ALLOW_REGISTRATION,
        payload: settings.allowRegistration
    }
};

export const setDisableDelete = ()  => {
    const settings = JSON.parse(localStorage.getItem('settings'));

    settings.disableDelete = !settings.disableDelete;

    localStorage.setItem('settings', JSON.stringify(settings));

    return {
        type: DISABLE_BALANCE_DELETE,
        payload: settings.disableDelete
    }
};