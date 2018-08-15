<template>
    <swiper :options="swiperOption" ref="mySwiperMain">
        <swiper-slide v-for="(slide, index) in slides" :key="index">
            <div class="t-mainPageCarouselCard">
                <img :src="slide.img" :alt="slide.title">
                <div class="t-mainPageCarouselInfo">
                    <div class="t-blur"></div>
                    <div class="t-mainPageTitleWrapper">
                        <span>{{ slide.title }}</span>
                    </div>
                    <div class="t-mainPageDescriptionWrapper">
                        <p>{{ slide.description }}</p>
                    </div>
                    <div class="t-mainPageMore">
                        <router-link :to="slide.link" class="t-btn">Подробнее</router-link>
                    </div>
                </div>
            </div>
        </swiper-slide>
        <div v-if="this.ctrl" class="swiper-button-prev" slot="button-prev"></div>
        <div v-if="this.ctrl" class="swiper-button-next" slot="button-next"></div>
        <div class="t-pagination" slot="pagination"></div>
    </swiper>
</template>

<script>
    import { swiper, swiperSlide } from 'vue-awesome-swiper';

    export default {
        components: {
            swiper,
            swiperSlide
        },
        props: ['slides', 'slidesL'],
        data() {
            return {
                ctrl: true,
                swiperOption: {
                    slidesPerView: 1,
                    speed: 1000,
                    loop: true,
                    pagination: {
                        el: '.t-pagination',
                        renderBullet(index, className) {
                            return `<span class="${className} swiper-pagination-bullet-custom"><span class="counter">${index + 1} из ${this.slides.length - 2}</span></span>`
                        },
                        clickable: true
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    },
                    breakpoints: {
                        767: {
                            navigation: false
                        }
                    },
                    autoplay: {
                        delay: 5000,
                        disableOnInteraction: false
                    }
                }
            }
        },
        computed: {
            swiper() {
                return this.$refs.mySwiperMain.swiper
            },
        },
        methods: {
            swiperPagination() {

            }
        },
        mounted() {
            this.swiperPagination();
            window.innerWidth < 768 ? this.ctrl = false : this.ctrl = true;
            window.addEventListener('resize', () => {
                window.innerWidth < 768 ? this.ctrl = false : this.ctrl = true;
            }, false);
        },
    }
</script>

<style>

</style>