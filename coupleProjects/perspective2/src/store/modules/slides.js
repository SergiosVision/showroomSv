export default {
    namespaced: true,
    state: {
        loadedSlides: []
    },
    mutations: {
        setLoadedSlides(state, payload) {
            state.loadedSlides = payload;
        }
    },
    actions: {
        loadSlides({commit}, data) {
            commit('setLoadedSlides', data);
        }
    },
    getters: {
        loadedSlides(state) {
            return state.loadedSlides;
        },
        loadedSlidesLength(state) {
            return state.loadedSlides.length;
        }
    }
}