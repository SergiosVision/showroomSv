<template>
    <div class="t-wrapperContacts t-mainInsideContainer">
        <div class="t-insideBgHolder">
            <div class="t-insideBgHolderOverlay">
                <h3 class="t-insideBgHolderTitle">Контакты</h3>
            </div>
        </div>
        <div class="t-container">
            <div class="t-contactsCardsHolder">
                <div class="t-accordionCard" :class="cl(index)" v-for="(item, index) in contacts" :key="index">
                    <div class="t-accordionHeader" @click="toggleAccordion(index)">
                        <h2 class="t-mainTitle">{{ item.name }}</h2>
                        <span class="t-accordionArrowHolder">
                            <svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 0L7.5 7.5L0 15" transform="translate(1.5 9) rotate(-90)" stroke="#2574CF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </span>
                    </div>
                    <transition name="accordion"
                                v-on:before-enter="beforeEnter" v-on:enter="enter"
                                v-on:before-leave="beforeLeave" v-on:leave="leave">
                        <div class="t-accordionBody" v-if="isOpen == index">
                            <div class="t-accordionContent">
                                <div class="t-aboutOrganizationMainInfo">
                                    <div class="t-aboutOrganizationInfoHolder" v-html="item.about"></div>
                                    <div class="t-aboutOrganizationAddressWrapper t-space">
                                        <small class="t-aboutOrganizationAddressTitle t-aboutOrganizationTitle">адрес</small>
                                        <span class="t-aboutOrganizationAddress t-aboutOrganizationContent">{{ item.address }}</span>
                                        <div class="t-yaMapWrapper t-mapWrapper">
                                            <span @click="toggleMap(index)" class="t-showOnTheMap">показать на карте</span>
                                            <transition name="mapSlide">
                                                <ya-map :index="index" :companyData="item" v-if="mapVisible === index"></ya-map>
                                            </transition>
                                        </div>
                                    </div>
                                    <div class="t-aboutOrganizationEmailHolder t-space">
                                        <small class="t-aboutOrganizationEmailTitle t-aboutOrganizationTitle">e-mail</small>
                                        <span class="t-aboutOrganizationEmail t-aboutOrganizationContent">{{ item.mail }}</span>
                                    </div>
                                    <div class="t-aboutOrganizationPhoneWrapper t-space">
                                        <small class="t-aboutOrganizationPhoneTitle t-aboutOrganizationTitle">телефон</small>
                                        <span class="t-aboutOrganizationPhone t-aboutOrganizationContent">{{ item.phone }}</span>
                                    </div>
                                </div>
                                <div class="t-aboutOrganizationCarouselWrapper" :class="item.peoples.length <= 1?'noCarousel':''">
                                    <swiper-carousel v-if="item.peoples.length > 1" :data="item.peoples" :getIndex="index"></swiper-carousel>
                                    <carousel-card :data="data" v-else v-for="(data, i) in item.peoples" :key="i"></carousel-card>
                                </div>
                            </div>
                        </div>
                    </transition>
                </div>
            </div>
        </div>
    </div>
</template>



<script>
    import SwiperCarousel from '../../Page/SwiperCarousel.vue';
    import Vue from 'vue';
    import { mapActions, mapGetters } from 'vuex';
    import { store } from '../../../store';
    export default {
        metaInfo: {
            title: 'Контакты',
        },
        components: {
            'swiper-carousel': SwiperCarousel,
        },
        data() {
            return {
                isOpen: 0,
                mapVisible: -1,
                mapHeight: 430,
            }
        },
        computed: {
            ...mapGetters('contacts',{
                contacts: 'loadedContacts'
            }),
            loading() {return this.$store.getters.loading},
        },
        methods: {
            ...mapActions('contacts', {
                loadContacts: 'loadContacts'
            }),
            toggleMap(index) {
                this.mapVisible === index ? this.mapVisible = -1 : this.mapVisible = index;
            },
            cl(index) {return this.isOpen === index ? 'is-opened' : '';},
            toggleAccordion(index) {
                if(this.isOpen === index) {
                    this.isOpen = -1;
                } else {
                    this.isOpen = index;
                }
            },
            beforeEnter: function(el) {
                el.style.maxHeight = '0';
            },
            enter: function(el) {
                    el.style.maxHeight = el.scrollHeight + this.mapHeight + 'px'
            },
            beforeLeave: function(el) {
                    el.style.maxHeight = el.scrollHeight + this.mapHeight + 'px';
            },
            leave: function(el) {
                el.style.maxHeight = '0';
            }
        },
        created() {

        },
        beforeRouteEnter(to, from, next) {
            Vue.http.get('/JSON/organizations.json')
                .then(response => response.json())
                .then(data => {
                    next(store.dispatch('contacts/loadContacts', data))
                })
        },
    }
</script>

<style>

</style>