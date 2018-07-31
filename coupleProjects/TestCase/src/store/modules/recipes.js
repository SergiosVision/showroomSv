export default {
    namespaced: true,
    state: {
        loadedRecipes: [],
        loadedRecipe: null,
        checkEls: [],
        searchStr: ''
    },
    mutations: {
        setLoadedRecipes(state, payload) {
            state.loadedRecipes = payload;
        },
        setLoadedRecipe(state, payload) {
            state.loadedRecipe = payload;
        },
        getCheckBoxes(state, payload) {
            state.checkEls = payload;
        },
        setSearchStr(state, payload) {
            state.searchStr = payload;
        }
    },
    actions: {
        loadRecipes({commit}, data) {
            commit('setLoadedRecipes', data);
        },
        loadRecipe({commit}, data) {
            commit('setLoadedRecipe', data);
        },
        addCheckbox({commit}, data) {
            commit('getCheckBoxes', data)
        },
        addSearchStr({commit}, data) {
            commit('setSearchStr', data)
        }
    },
    getters: {
        loadedRecipes(state, getters) {
            return data => {
                if(Object.keys(data).length !== 0) {
                    if(!data.box.length) {
                        return state.loadedRecipes.filter(items => {
                            if ((data.minCal <= items.caloricity)
                                && (data.maxCal >= items.caloricity)
                                && (data.minTime <= items.cookTime)
                                && (data.maxTime >= items.cookTime)) {

                                return state.loadedRecipes
                            }
                        })
                    } else {
                        return state.loadedRecipes.filter(items => {
                            if(data.box.includes(items.cuisine.title.toLocaleLowerCase())
                                && (data.minCal <= items.caloricity)
                                && (data.maxCal >= items.caloricity)
                                && (data.minTime <= items.cookTime)
                                && (data.maxTime >= items.cookTime)) {

                                return state.loadedRecipes
                            }
                        })
                    }
                } else {
                    return state.loadedRecipes;
                }
            }
        },
        loadedRecipe(state) {
            return state.loadedRecipe;
        },
        loadedCheckEls(state) {
            return state.checkEls;
        },
        loadedSearchStr(state) {
            return state.searchStr;
        }
    }
}