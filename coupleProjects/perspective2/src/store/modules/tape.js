export default {
    namespaced: true,
    state: {
        loadedTape: []
    },
    mutations: {
        setLoadedTape(state, payload) {
            state.loadedTape = payload;
        }
    },
    actions: {
        loadTape({commit}, data) {
            commit('setLoadedTape', data);
        }
    },
    getters: {
        loadedTape(state) {
            return state.loadedTape;
        },
        returnTapeLength(state) {
            return state.loadedTape.length;
        }
    }
}