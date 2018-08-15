import Vue from 'vue';
export default {
    namespaced: true,
    state: {
        loadedNews: [],
    },
    mutations: {
        setLoadedNews(state, payload) {
            state.loadedNews = payload;
        },
    },
    actions: {
        loadNews({commit}, json) {
            commit('setLoadedNews', json);
        },
    },
    getters: {
        loadedNews(state) {
            return state.loadedNews;
        },
        loadedNewsSingle(state) {
            return newsId => {
                return state.loadedNews.find(newsOnce => {
                    return newsOnce.title === newsId;
                })
            }
        },
        featuredNews(state, getters) {
            return getters.loadedNews.slice(0,2);
        },
    }
}