<template>
    <div class="t-wrapperNews t-mainInsideContainer">
        <div class="t-insideBgHolder">
            <div class="t-insideBgHolderOverlay">
                <h3 class="t-insideBgHolderTitle">Новости</h3>
            </div>
        </div>
        <div class="t-container">
            <div class="t-loadedData">
                <div class="t-newsCardsHolder">
                    <news-card :news="item" v-for="(item, index) in news" :key="index"></news-card>
                </div>
                <button class="t-btn t-moreBtn">Больше новостей</button>
            </div>
        </div>
        <router-view :route="path"></router-view>
    </div>
</template>



<script>
    import Vue from 'vue'
    import { store } from '../../../store';
    import { mapGetters } from 'vuex';
    export default {
        metaInfo: {
            title: 'Новости',
        },
        data() {
            return {
                path: this.$router.currentRoute.matched[0].path
            }
        },
        computed: {

            ...mapGetters('newsStore',  {
                news: 'loadedNews'
            }),

//            news() {return this.$store.getters.loadedNews},
            loading() {return this.$store.getters.loading;},
        },
        created() {
//            this.$store.dispatch('loadNews')
        },
        beforeRouteEnter(to, from, next) {
            Vue.http.get('/JSON/news.json')
                .then(response => response.json())
                .then(json => {
                    next(store.dispatch('newsStore/loadNews', json));
                })
        }

    }
</script>

<style>

</style>