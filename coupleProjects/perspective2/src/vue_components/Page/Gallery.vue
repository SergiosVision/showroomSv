<template>
    <div class="t-lightBoxCard">
        <div class="t-lightBoxCardInner">
            <div class="t-lightBoxTape" :style="{ width: innerWidth + 'px', transform: 'translate3d(-'+ sideCtrl +'px, 0, 0)' }">
                <div class="t-lightBoxImgAndInfo" v-for="(item, index) in tape" :key="index" :style="{ width: singleWidth + 'px' }">
                    <div class="t-lightBoxImg" @click="showBox">
                        <img :src="item.img" :alt="item.title">
                    </div>
                    <div class="lightBoxInfo">
                        <p>{{ item.title }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="t-lightBoxControls">
            <div class="t-lightBoxLeftAndRight">
                <button @click.prevent="prevBtn" type="button" class="t-lightBoxBtn t-lightBoxLeft" :class="{'t-disable': !hasPrev()}">
                    <svg width="18" height="10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 5H1m0 0l5.539 4M1 5l5.538-4" stroke="#4085D5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </button>
                <button @click.prevent="nextBtn" type="button" class="t-lightBoxBtn t-lightBoxRight" :class="{'t-disable': !hasNext()}">
                    <svg width="18" height="10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 5h16m0 0l-5.539-4M17 5l-5.539 4" stroke="#4085D5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </button>
            </div>
            <div class="t-lightBoxOpenWrapper">
                <button @click.prevent="showBox" type="button" class="t-lightBoxBtn t-lightBoxOpen">
                    <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.667 1H3a2 2 0 0 0-2 2v2.667M10.333 1H13a2 2 0 0 1 2 2v2.667M1 10.333V13a2 2 0 0 0 2 2h2.667m4.666 0H13a2 2 0 0 0 2-2v-2.667" stroke="#2574CF" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </button>
            </div>
        </div>
        <transition name="mainFade">
            <div class="t-lightBoxInside" v-if="visible">
                <div @click.prevent="hideBox" class="t-lightBoxOverlay">
                    <div @click.stop="hideBox" class="t-times t-btn t-rounded">
                        <svg width="10" height="10" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.691.29a.99.99 0 1 0-1.4 1.401L3.598 5 .29 8.309a.99.99 0 1 0 1.401 1.4l3.31-3.308L8.308 9.71a.99.99 0 1 0 1.4-1.4L6.402 5 9.71 1.692A.99.99 0 1 0 8.309.29L5 3.599 1.691.29z" fill="#2574CF"/></svg>
                    </div>
                    <div class="t-lightBoxInsideWrapperImg">
                        <transition-group tag="div" :name="transition" id="t-lightBoxTrG">
                            <img :src="tape[currentIndex].img" :alt="tape[currentIndex].title" @click.stop :key="currentIndex">
                        </transition-group>
                    </div>
                    <div class="t-lightBoxInsideButtons">
                        <button :class="{'t-disable': !hasPrev()}" @click.stop="prevBtn" class="t-lightBoxInsideBtn t-lightBoxBtnPrev"></button>
                        <button :class="{'t-disable': !hasNext()}" @click.stop="nextBtn" class="t-lightBoxInsideBtn t-lightBoxBtnNext"></button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        props: {
            tape: Array,
            le: Number,
            itemPerSlid: {
                type: null,
                default: 1
            },
        },
        data() {
          return {
              innerWidth: 0,
              singleWidth: 0,
              currentIndex: 0,
              visible: false,
              direction: null
          }
        },
        computed: {
            sideCtrl() {
                return this.currentIndex * this.singleWidth;
            },
            transition() {return `slide-${this.direction}`;}
        },
        methods: {
            prevBtn() {
                if(this.currentIndex !== 0) {
                    this.currentIndex--;
                    if(this.visible) {
                        this.direction = 'left';
                    }
                }
            },
            nextBtn() {
                if(this.currentIndex !== this.le -1) {
                    this.currentIndex++;
                    if(this.visible) {
                        this.direction = 'right';
                    }
                }
            },
            showBox() {
                this.visible = true;
            },
            hideBox() {
                this.visible = false;
            },
            hasNext() {
                return this.currentIndex + 1 < this.le;
            },
            hasPrev() {
                return this.currentIndex - 1 >= 0;
            },
            onKeyDown(e) {
                if(this.visible) {
                    switch (e.key) {
                        case 'ArrowRight':
                            this.nextBtn();
                            break;
                        case 'ArrowLeft':
                            this.prevBtn();
                            break;
                        case 'ArrowDown':
                        case 'ArrowUp':
                        case ' ':
                            e.preventDefault();
                            break;
                        case 'Escape':
                            this.hideBox();
                            break;
                    }
                }
            },

            slidesCalculation() {
                this.singleWidth = this.$el.clientWidth / this.itemPerSlid;
                this.innerWidth = this.singleWidth * this.le;
            }
        },
        mounted() {
            this.slidesCalculation();
            window.addEventListener('resize', () => {
                this.slidesCalculation();
            });
            window.addEventListener('keydown', this.onKeyDown);
        },
        destroyed() {
            window.removeEventListener('keydown', this.onKeyDown);
        }
    }
</script>

<style>

</style>