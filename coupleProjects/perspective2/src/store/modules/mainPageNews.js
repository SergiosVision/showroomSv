export default {
    namespaced: true,
    state: {
        loadedTwo: ''
    },
    mutations: {
        setLoadedTwo(state, payload) {
            state.loadedTwo = payload;
        }
    },
    actions: {
        loadTwo({commit}, data) {
            commit('setLoadedTwo', data);
        }
    },
    getters: {
        loadedTwo(state) {
            return state.loadedTwo.slice(0, 2);
        }
    }
}