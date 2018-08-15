export default {
    namespaced: true,
    state: {
        modalVisible: false,
    },
    mutations: {
        showModal(state) {
            state.modalVisible = true;
        },
        hideModalSmall(state) {
            state.modalVisible = false;
        }
    },
    getters: {
        call(state) {
            return state.modalVisible;
        }
    }
}