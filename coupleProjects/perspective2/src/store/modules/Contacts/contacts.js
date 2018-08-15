import Vue from 'vue';
export default {
    namespaced: true,
    state: {
        loadedContacts: []
    },
    mutations: {
        setLoadedContacts(state, payload) {
            state.loadedContacts = payload;
        }
    },
    actions: {
        loadContacts({commit}, data) {
            commit('setLoadedContacts', data);
        }
    },
    getters: {
        loadedContacts(state) {
            return state.loadedContacts;
        }
    }
}