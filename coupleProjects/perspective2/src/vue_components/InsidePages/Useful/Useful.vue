<template>
    <div class="t-wrapperUseful t-mainInsideContainer">
        <div class="t-insideBgHolder">
            <div class="t-insideBgHolderOverlay">
                <h3 class="t-insideBgHolderTitle">Полезное</h3>
            </div>
        </div>
        <div class="t-container">
            <div class="t-loadedData">
                <div class="t-usefulCardsHolder">
                    <div class="t-usefulCard" v-for="(item, index) in useful" :key="index">
                        <router-link tag="div" :to="{name: 'UsefulInside', params: {slug: item.title}}" class="t-usefulCardImgHolder">
                            <img :src="item.img" :alt="item.title">
                        </router-link>
                        <div class="t-usefulCardInfoHolder">
                            <div class="t-usefulCardInfo">
                                <h3>{{ item.title }}</h3>
                            </div>
                            <div class="t-usefulCardReadMore">
                                <router-link tag="div" :to="{name: 'UsefulInside', params: {slug: item.title}}" class="t-useFulCardReadMoreWrInside">
                                    <svg width="20" height="13" viewBox="0 0 20 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity=".8" d="M19 5.714H7.545C1 5.714 1 12 1 12m18-6.286L11.636 1M19 5.714l-7.364 4.715" stroke="#2574CF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                    <span>Читать</span>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
                <button class="t-btn t-moreBtn">Больше статей</button>
            </div>
        </div>
        <router-view :route="path"></router-view>
    </div>
</template>



<script>
    import Vue from 'vue';
    import { store } from '../../../store';
    import { mapGetters } from 'vuex';
    export default {
        metaInfo: {
            title: 'Полезное',
        },
        data() {
            return {
                path: this.$router.currentRoute.matched[0].path
            }
        },
        methods: {

        },
        computed: {

            ...mapGetters('usefulStore', {
                useful:  'loadedUsf'
            }),

            loading() {return this.$store.getters.loading;},
        },
        created() {

        },
        beforeRouteEnter(to, from, next) {
            Vue.http.get('/JSON/useful.json')
                .then(response => response.json())
                .then(json => {
                    next(store.dispatch('usefulStore/loadUsf', json));
                })
        }
    }
</script>

<style>

</style>