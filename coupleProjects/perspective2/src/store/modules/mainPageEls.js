export default {
    namespaced: true,
    state: {
        loadedMainOrg: '',
        loadedPrinciples: [],
        loadedNumbers: []
    },
    mutations: {
        setLoadedMainOrg(state, payload) {
            state.loadedMainOrg = payload;
        },
        setLoadedPrinciples(state, payload) {
            state.loadedPrinciples = payload;
        },
        setLoadedNumbers(state, payload) {
            state.loadedNumbers = payload;
        }
    },
    actions: {
        loadMainOrg({commit}, data) {
            commit('setLoadedMainOrg', data);
        },
        loadPrinciples({commit}, data) {
            commit('setLoadedPrinciples', data);
        },
        loadNumbers({commit}, data) {
            commit('setLoadedNumbers', data);
        }
    },
    getters: {
        loadedMainOrg(state) {
            return state.loadedMainOrg;
        },
        loadedPrinciples(state) {
            return state.loadedPrinciples;
        },
        loadedNumbers(state) {
            return state.loadedNumbers;
        }
    }
}