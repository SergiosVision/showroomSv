<template>
    <swiper :options="swiperOption" :ref="'mySwiper_'+getIndex"> <!-- :ref="'mySwiper_'+getIndex" -->
        <swiper-slide v-for="(item, index) in data" :key="index">
            <carousel-card :data="item"></carousel-card>
        </swiper-slide>
        <div v-if="winSize > 767" class="swiper-button-prev" slot="button-prev"></div>
        <div v-if="winSize > 767" class="swiper-button-next" slot="button-next"></div>
        <div v-if="winSize < 768" class="swiper-pagination t-contactsPeoplesDynamic" slot="pagination"></div>
    </swiper>
</template>

<script>
    import { swiper, swiperSlide } from 'vue-awesome-swiper';

    export default {
        props: ['data', 'getIndex'],
        components: {
            swiper,
            swiperSlide
        },
        name: 'carrousel',
        data() {
            return {
                winSize: window.innerWidth,
                swiperOption: {
                    slidesPerView: 'auto',
                    spaceBetween: 72,
                    freeMode: true,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    },
                    breakpoints: {
                        767: {
                            slidesPerView: 1,
                            spaceBetween: 24,
                            freeMode: false,
                            pagination: {
                                el: '.t-contactsPeoplesDynamic',
                                dynamicBullets: true
                            },
                            navigation: false
                        }
                    }
                }
            }
        },
        computed: {
            swiper() {
//                return this.$refs.mySwiper.swiper;
                return this.$refs['mySwiper_'+this.getIndex].swiper;
            },
        },
        mounted() {
            this.swiper.slideTo(0, 1000, false)
        }
    }
</script>
