<template>
    <div class="t-mainPageHolder">
        <div class="t-mainPageCarousel">
            <Carousel :slides="slides" :slidesL="slidesL"></Carousel>
        </div>
        <div class="t-container">
            <section class="t-mainCard t-aboutCompany">
                <div class="t-mainSidesHolder">
                    <div class="t-leftSide">
                        <h2 class="t-mainTitle">Об организации</h2>
                        <div class="t-textHolder" v-html="aboutOrg.content"></div>
                    </div>
                    <div class="t-rightSide">
                        <h4 class="t-middleTitle">Новости</h4>
                        <div class="t-newsCardsHolder">
                            <news-card :news="item" v-for="(item, index) in two" :key="index"></news-card>
                        </div>
                        <router-link tag="div" :to="'/news'" class="t-watchAll">
                            <span>Смотреть все</span>
                            <svg width="26" height="14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 7h24m0 0l-8.308-6M25 7l-8.308 6" stroke="#4085D5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </router-link>
                    </div>
                </div>
            </section>
            <section class="t-mainCard t-numbersAndCount">
                <div class="t-leftSide">
                    <h2 class="t-mainTitle">Цифры и факты</h2>
                    <div class="t-numberCardsHolder">
                        <div class="t-numberCard" v-for="item in numbersOutput">
                            <div class="t-numberCardCountWrapper">
                                <h2 class="t-numberCardCount">{{ item.count }}</h2>
                            </div>
                            <div class="t-numberCardTextWrapper">
                                <p>{{ item.msg }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="t-rightSide">
                    <h4 class="t-middleTitle">Фотолента</h4>
                    <div class="t-lightBoxWrapper">
                        <gallery :tape="tape" :le="le"></gallery>
                    </div>
                </div>
            </section>
            <section class="t-mainCard t-ourPrinciples">
                <h2 class="t-mainTitle">Наши принципы</h2>
                <div class="t-principlesCardHolder">
                    <div class="t-principlesCard" v-for="(item, index) in principles">
                        <div class="t-principlesCardNumber"><span>{{ index+1 }}</span></div>
                        <div class="t-principlesCardText">
                            <p>{{ item.msg }}</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import Carousel from './Carousel.vue';
    import { store } from '../../store';
    import { mapGetters, mapActions } from 'vuex';
    export default {
        data() {
          return {

          }
        },
        components: {
            Carousel: Carousel
        },
        computed: {
            ...mapGetters('tape', {
                tape: 'loadedTape',
                le: 'returnTapeLength'
            }),
            ...mapGetters('two', {
                two: 'loadedTwo'
            }),
            ...mapGetters('slides', {
                slides: 'loadedSlides',
                slidesL: 'loadedSlidesLength'
            }),
            ...mapGetters('mainPageEls', {
                aboutOrg: 'loadedMainOrg',
                principles: 'loadedPrinciples',
                numbersOutput: 'loadedNumbers'
            })
        },
        methods: {

        },
        created() {

        },
        beforeRouteEnter (to, from, next) {
            Vue.http.get('/JSON/tape.json')
                .then(response => response.json())
                .then(data => {
                    store.dispatch('tape/loadTape', data);
                })
                .then(
                    Vue.http.get('/JSON/news.json')
                        .then(response => response.json())
                        .then(data => {
                            store.dispatch('two/loadTwo', data)
                        })
                )
                .then(
                    Vue.http.get('/JSON/sliderInfo.json')
                    .then(response => response.json())
                    .then(data => {
                        store.dispatch('slides/loadSlides', data);
                    })
                )
                .then(
                    Vue.http.get('/JSON/aboutOrgMain.json')
                    .then(response => response.json())
                    .then(data => {
                        store.dispatch('mainPageEls/loadMainOrg', data)
                    })
                )
                .then(
                    Vue.http.get('/JSON/principles.json')
                    .then(response => response.json())
                    .then(data => {
                        store.dispatch('mainPageEls/loadPrinciples', data)
                    })
                )
                .then(
                    Vue.http.get('/JSON/info.json')
                    .then(response => response.json())
                    .then(data => {
                        next(store.dispatch('mainPageEls/loadNumbers', data))
                    })
                )
        }
    }
</script>

<style>

</style>