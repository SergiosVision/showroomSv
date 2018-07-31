<template>
    <div class="sv-filterWrapper" :class="{'filterDialogActive': modalActive}">
        <button class="sv-filterButton ripple light" @click="showModal() + clearSearchField()">
            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="16" viewBox="0 0 23 16"><path fill="#FFF" fill-rule="evenodd" d="M4 9.23V6.77h15v2.46H4zM.25.5h22.5v2.52H.25V.5zm8.73 15v-2.52h5.04v2.52H8.98z"/></svg>
        </button>
        <transition name="modal">
            <div class="sv-filterDialog" :class="{'closeFilterCtrl': modalActive === true}" v-show="modalActive">
                <div class="sv-filterCtrls">
                    <div class="sv-closeFilter" @click="hideModal">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="#757575" fill-rule="evenodd" d="M20 2.027L12.027 10 20 17.973 17.973 20 10 12.027 2.027 20 0 17.973 7.973 10 0 2.027 2.027 0 10 7.973 17.973 0z"/></svg>
                    </div>
                    <div class="sv-filterClear">
                        <span @click="clearAll">Clear all</span>
                    </div>
                    <div class="sv-filterFilter">
                        <button class="ripple light" @click.prevent="filterThisStuff() + hideModal()">See recipes</button>
                    </div>
                </div>
                <div class="sv-filterBody">
                    <div class="sv-filterAccordion">
                        <div class="sv-filterAccordionTrigger" :class="cl" @click="toggleAccordion">
                            <h3>Cuisine</h3>
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="6" viewBox="0 0 10 6"><path fill="#000" fill-rule="evenodd" d="M8.82 6L5 2.272 1.18 6 0 4.854 5 0l5 4.854z"/></svg>
                        </div>
                        <transition name="accordion"
                                    v-on:before-enter="beforeEnter" v-on:enter="enter"
                                    v-on:before-leave="beforeLeave" v-on:leave="leave">
                            <div class="sv-filterAccordionBody" v-show="isOpen">
                                <ul class="sv-mainList">
                                    <li v-for="(item, index) in categoriesList" :key="index">
                                        <div class="sv-checkBoxGroup">
                                            <label class="material-checkbox">
                                                <input  @change="storeBox" @click="inputCtrl" v-model="checkedBoxes"  :value="item.title.toLowerCase()" type="checkbox" class="inputCtrl">
                                                <span>{{ item.title }}</span>
                                            </label>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </transition>
                    </div>
                    <div class="sv-filterRangeHolder">
                        <div class="sv-caloriesRange default">
                            <h3>Calories Range</h3>
                            <div class="sv-caloriesTitle">
                                <p>
                                    <span>{{ minCalories }}</span> kCal
                                    -
                                    <span>{{ maxCalories }}</span> kCal
                                </p>
                            </div>
                            <div class="rangeHolderEl">
                                <div id="caloriesRange"></div>
                            </div>
                        </div>
                        <div class="sv-cookRange default">
                            <h3>Cooking Time</h3>
                            <div class="sv-cookingTitle">
                                <p>
                                    <span>{{ secondsToHms(minCooking) }}</span>
                                    -
                                    <span>{{ secondsToHms(maxCooking) }}</span>
                                </p>
                            </div>
                            <div class="rangeHolderEl">
                                <div id="cookingRange"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { mapMutations, mapGetters } from 'vuex';
    import  { store } from '../../store';
    import noUiSlider from 'nouislider';
    export default {
        data() {
            return {
                checkedInput: false,
                minCalories: '',
                maxCalories: '',
                minCooking: '',
                maxCooking: '',
                categoriesList: [
                    {
                        title: 'Chinese'
                    },
                    {
                        title: 'Caribbean'
                    },
                    {
                        title: 'French'
                    },
                    {
                        title: 'Greek'
                    },
                    {
                        title: 'Indian'
                    }
                ],
                isOpen: true,
                checkedBoxes: [],
                localData: [],
                dataReady: false
            }
        },
        methods: {
            ...mapMutations('modals', ['showModal', 'hideModal']),

            clearSearchField() {
                store.dispatch('recipes/addSearchStr', '');
            },

            secondsToHms(d) {
              if (d === 0) {
                return `${0} min`;
              } else {
                d = Number(d);
                let h = Math.floor(d / 3600);
                let m = Math.floor(d % 3600 / 60);
                let s = Math.floor(d % 3600 % 60);

                let hDisplay = h > 0 ? h + (h == 1 ? " hr " : " hr ") : "";
                let mDisplay = m > 0 ? m + (m == 1 ? " min " : " min ") : "";
                return hDisplay + mDisplay;
              }
            },

            storeBox() {
                this.$store.dispatch('recipes/addCheckbox',this.checkedBoxes)
            },

            clearAll() {
                [...document.querySelectorAll('.inputCtrl')].map(data => {
                    data.classList.remove('checked');
                });
                this.checkedBoxes = [];
                this.$store.dispatch('recipes/addCheckbox', []);
                document.querySelector('#caloriesRange').noUiSlider.reset();
                document.querySelector('#cookingRange').noUiSlider.reset();
                this.$router.push({query: ''});

            },
            filterThisStuff() {
                if(!this.loadedCheckEls.length) {
                    this.$router.push({query: {box: '', minCal: this.minCalories, maxCal: this.maxCalories, minTime: this.minCooking, maxTime: this.maxCooking}});
                } else {
                    this.$router.push({query: {box: this.loadedCheckEls, minCal: this.minCalories, maxCal: this.maxCalories, minTime: this.minCooking, maxTime: this.maxCooking}});
                }
            },

            toggleAccordion(index) {
                if(this.isOpen === false) {
                    this.isOpen = true;
                } else {
                    this.isOpen = false;
                }
            },
            beforeEnter: function(el) {
                el.style.maxHeight = '0';
            },
            enter: function(el) {
                el.style.maxHeight = el.scrollHeight + 'px'
            },
            beforeLeave: function(el) {
                el.style.maxHeight = el.scrollHeight + 'px';
            },
            leave: function(el) {
                el.style.maxHeight = '0';
            },
            callCaloriesSlider(item) {
                const slide = item.caloriesRange;
                noUiSlider.create(slide, {
                    start: [this.getMaxAndMinCalories(0), this.getMaxAndMinCalories(1)],
                    connect: true,
                    step: 1,
                    range: {
                        'min': this.getMaxAndMinCalories(0),
                        'max': this.getMaxAndMinCalories(1)
                    }
                });
                slide.noUiSlider.on('update', (values) => {
                    this.minCalories = parseInt(values[0]);
                    this.maxCalories = parseInt(values[1]);
                })
            },
            callCookingSlider(item) {
                const slide = item.cookingRange;
                noUiSlider.create(slide, {
                    start: [this.getMaxAndMinTime(0), this.getMaxAndMinTime(1)],
                    connect: true,
                    step: 1,
                    range: {
                        'min': this.getMaxAndMinTime(0),
                        'max': this.getMaxAndMinTime(1)
                    }
                });
                slide.noUiSlider.on('update', (values) => {
                    this.minCooking = parseInt(values[0]);
                    this.maxCooking = parseInt(values[1]);
                })
            },
            inputCtrl(event){
              if(event.target.classList.contains('inputCtrl')){
                if(!event.target.classList.contains('checked')){
                    event.target.classList.add('checked');
                } else {
                    event.target.classList.remove('checked');
                }
              }
            },
            getMaxAndMinCalories(check) {
                let arr = [];
                if(check === 0) {
                    for(let item in this.localData) {
                        arr.push(this.localData[item].caloricity);
                    }
                    return Math.min.apply(null, arr);
                } else if (check === 1) {
                    for(let item in this.localData) {
                        arr.push(this.localData[item].caloricity);
                    }
                    return Math.max.apply(null, arr);
                }
            },
            getMaxAndMinTime(check) {
                let arr = [];
                if(check === 0) {
                    for(let item in this.localData) {
                        arr.push(this.localData[item].cookTime);
                    }
                    return Math.min.apply(null, arr);
                } else if(check === 1) {
                    for(let item in this.localData) {
                        arr.push(this.localData[item].cookTime);
                    }
                    return Math.max.apply(null, arr);
                }
            },
            filterState(query, rangeItems) {
                let getCheckBoxed = document.querySelectorAll('.inputCtrl');
                if(this.$route.path === '/' && Object.keys(query).length !== 0) {
                    [...getCheckBoxed].filter((data) => {
                        if(query.box.includes(data.value)) {
                            this.checkedBoxes = query.box;
                            store.dispatch('recipes/addCheckbox', this.checkedBoxes);
                            data.classList.add('checked');
                        }
                    });
                    let cal = rangeItems.caloriesRange,
                        time = rangeItems.cookingRange;
                    this.minCalories = query.minCal;
                    this.maxCalories = query.maxCal;
                    this.minCooking = query.minTime;
                    this.maxCooking = query.maxTime;

                }
            }
        },
        computed: {
            ...mapGetters('modals', {
                modalActive: 'modalActive'
            }),
            loadedCheckEls() {
                return this.$store.getters['recipes/loadedCheckEls']
            },
            cl() {return this.isOpen === true ? 'is-opened' : '';},

        },
        beforeMount() {
            Vue.http.get('https://test.space-o.ru/list.json')
                .then(resposne => resposne.json())
                .then(json => {
                    this.localData = json.recipes;
                    let getRanges = {
                        caloriesRange: document.querySelector('#caloriesRange'),
                        cookingRange: document.querySelector('#cookingRange')
                    };
                    this.callCaloriesSlider(getRanges);
                    this.callCookingSlider(getRanges);
                    this.filterState(this.$route.query, getRanges);

                })
        },
        mounted() {
            document.querySelector('header .sv-headerMainContainer').appendChild(this.$el);
            if (window.innerWidth <= 1024) {
                document.querySelector('.sv-filterBody').appendChild(document.querySelector('.sv-filterFilter'))
            }

        },
    }
</script>
