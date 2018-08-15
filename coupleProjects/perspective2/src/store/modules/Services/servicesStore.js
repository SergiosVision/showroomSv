import Vue from 'vue';
export default {
    namespaced: true,
    state: {
        loadedServices: []
    },
    mutations: {
        setLoadedServices(state, payload) {
            state.loadedServices = payload;
        }
    },
    actions: {
        loadServices({commit}, json) {
            commit('setLoadedServices', json);
        }
    },
    getters: {
        loadedServices(state) {
            return state.loadedServices;
        },
        loadedService(state) {
            return serviceId => {
                return state.loadedServices.find(service => {
                    return service.title === serviceId;
                })
            }
        }
    }
}