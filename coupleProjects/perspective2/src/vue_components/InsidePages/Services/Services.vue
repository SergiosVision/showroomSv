<template>
    <div class="t-wrapperServices t-mainInsideContainer">
        <div class="t-insideBgHolder">
            <div class="t-insideBgHolderOverlay">
                <h3 class="t-insideBgHolderTitle">Услуги</h3>
            </div>
        </div>
        <div class="t-container">
            <div class="t-loadedData">
                <div class="t-servicesCardsHolder">
                    <router-link :to="{ name: 'ServicesInside', params: {slug: item.title}}" tag="div" class="t-servicesCard" v-for="(item, index) in services" :key="index">
                        <div class="t-servicesCardImgWrapper">
                            <img :src="item.img" :alt="item.title">
                        </div>
                        <div class="t-servicesCardInfo">
                            <div class="t-servicesCardCategory">
                                <span>{{ item.serviceCategory }}</span>
                            </div>
                            <div class="t-servicesCardTitle">
                                <h3>{{ item.title }}</h3>
                            </div>
                            <div class="t-servicesCardReadMore">
                                <svg width="20" height="13" viewBox="0 0 20 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity=".8" d="M19 5.714H7.545C1 5.714 1 12 1 12m18-6.286L11.636 1M19 5.714l-7.364 4.715" stroke="#2574CF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                <span>Подробнее</span>
                            </div>
                        </div>
                    </router-link>
                </div>
                <button class="t-btn t-moreBtn">Больше услуг</button>
            </div>

        </div>
        <router-view :route="path"></router-view>
    </div>
</template>



<script>
    import { store } from '../../../store';
    import { mapActions, mapGetters } from 'vuex'
    import Vue from 'vue';
    export default {
        metaInfo: {
            title: 'Услуги',
        },
        data() {
            return {
                path: this.$router.currentRoute.matched[0].path,
            }
        },
        methods: {},
        computed: {
            ...mapGetters('servicesStore', {
                services: 'loadedServices'
            }),
            loading () {return this.$store.getters.loading;}
        },
        created() {

        },
        beforeRouteEnter(to, from, next) {
            Vue.http.get('/JSON/services.json')
                .then(response => response.json())
                .then(json => {
                    next(store.dispatch('servicesStore/loadServices', json));
                })
        }
    }
</script>
