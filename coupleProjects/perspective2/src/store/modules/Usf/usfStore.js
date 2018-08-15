import Vue from  'vue';
export default {
    namespaced: true,
    state: {
        loadedUsf: []
    },
    mutations: {
        setLoadedUsf(state, payload) {
            state.loadedUsf = payload;
        }
    },
    actions: {
        loadUsf({commit}, json) {
            commit('setLoadedUsf', json);
        }
    },
    getters: {
        loadedUsf(state) {
            return state.loadedUsf;
        },
        loadedSingleUsf(state) {
            return usfId => {
                return state.loadedUsf.find(usfOnce => {
                    return usfOnce.title === usfId;
                })
            }
        }
    }
}