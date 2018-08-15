export default {
    namespaced: true,
    state: {
        modalVisible: false,
        messageBox: '',
        mobileMenu: false
    },
    mutations: {
        showModal(state) {
            state.modalVisible = true;
        },
        showMobile(state) {state.mobileMenu = true;},
        hideMobile(state) {state.mobileMenu = false;},
        hideModal(state) {
            state.modalVisible = false;
            if(state.messageBox !== '') {
                state.messageBox = '';
            }
        },
        successMessageBox(state) {
            state.messageBox = 'Ваше сообщение отправлено. Мы свяжемся с вами по указанному вами контакту.';
        },
        errorMessageBox(state) {
            state.messageBox = 'Что-то пошло не так :(';
        },
    },
    getters: {
        callModalVis(state) {
            return state.modalVisible;
        },
        mobileMenu(state) {
            return state.mobileMenu;
        },
        message(state) {
            return state.messageBox;
        }
    }
}