<template>
    <section class="sv-container insidePage">
        <div class="sv-singleRecipeHolder">
            <div class="sv-singleRecipeCarousel">
                <div class="sv-singleRecipeCarouselSlideWrapper">
                  <div class="sv-imgHolder" v-if="single.images.length === 1">
                    <img :src="single.images" :alt="single.title">
                  </div>
                    <div class="swiper-container" v-else>
                      <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="(item, index) in single.images">
                          <img :src="item" :alt="single.title">
                        </div>
                      </div>
                      <!-- If we need pagination -->
                      <div class="swiper-pagination"></div>

                      <!-- If we need navigation buttons -->
                      <div class="swiper-button-prev ripple">
                          <img src="/images/static/svg/arrowLeft.svg">
                      </div>
                      <div class="swiper-button-next ripple">
                          <img src="/images/static/svg/arrowRight.svg">
                      </div>
                    </div>
                </div>
            </div>
            <div class="sv-singleRecipeCookInfo">
                <div class="sv-singleRecipeCookInfoCuisine">
                    <span>{{ single.cuisine.title }}</span>
                </div>
                <div class="sv-singleRecipeCookInfoTitle">
                    <h3 class="sv-title">{{ single.title }}</h3>
                </div>
                <div class="sv-singleRecipeCookSubInfo">
                    <div class="sv-singleRecipeCookSubInfoTime sv-singleRecipeCookSubInfoGroup">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="#BDBDBD" fill-rule="evenodd" d="M9.333 4.333V9A.33.33 0 0 1 9 9.333H5.667A.33.33 0 0 1 5.333 9v-.667A.33.33 0 0 1 5.667 8H8V4.333A.33.33 0 0 1 8.333 4H9a.33.33 0 0 1 .333.333zM13.667 8A5.673 5.673 0 0 0 8 2.333 5.673 5.673 0 0 0 2.333 8 5.673 5.673 0 0 0 8 13.667 5.673 5.673 0 0 0 13.667 8zM16 8c0 4.417-3.583 8-8 8s-8-3.583-8-8 3.583-8 8-8 8 3.583 8 8z"/></svg>
                        <span>{{ secondsToHms(single.cookTime) }}</span>
                    </div>
                    <div class="sv-singleRecipeCookSubInfoDifficulty sv-singleRecipeCookSubInfoGroup">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="13" viewBox="0 0 16 13"><path fill="#BDBDBD" fill-rule="evenodd" d="M9.143 11.429h5.714v-1.143H9.143v1.143zM5.714 6.857h9.143V5.714H5.714v1.143zm5.715-4.571h3.428V1.143H11.43v1.143zM16 9.714V12a.575.575 0 0 1-.571.571H.57A.575.575 0 0 1 0 12V9.714c0-.312.259-.571.571-.571H15.43c.312 0 .571.259.571.571zm0-4.571v2.286a.575.575 0 0 1-.571.571H.57A.575.575 0 0 1 0 7.429V5.143c0-.313.259-.572.571-.572H15.43c.312 0 .571.26.571.572zM16 .57v2.286a.575.575 0 0 1-.571.572H.57A.575.575 0 0 1 0 2.857V.571C0 .26.259 0 .571 0H15.43c.312 0 .571.259.571.571z"/></svg>
                        <span>{{ single.difficulty }}</span>
                    </div>
                    <div class="sv-singleRecipeCookSubInfoCaloricity sv-singleRecipeCookSubInfoGroup">
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="18" viewBox="0 0 15 18"><path fill="#AEAEAE" fill-rule="evenodd" d="M6.429.643A.647.647 0 0 0 5.786 0a.647.647 0 0 0-.643.643V4.82a.647.647 0 0 1-.643.643.647.647 0 0 1-.643-.643V.643A.647.647 0 0 0 3.214 0a.647.647 0 0 0-.643.643V4.82a.647.647 0 0 1-.642.643.647.647 0 0 1-.643-.643V.643A.647.647 0 0 0 .643 0 .647.647 0 0 0 0 .643V7.07A1.94 1.94 0 0 0 1.286 8.89v7.824c0 .703.582 1.286 1.285 1.286h1.286c.703 0 1.286-.583 1.286-1.286V8.89A1.94 1.94 0 0 0 6.429 7.07V.643zm7.714 0A.647.647 0 0 0 13.5 0h-2.571a3.224 3.224 0 0 0-3.215 3.214v8.036c0 .17.151.321.322.321h2.25v5.143c0 .703.582 1.286 1.285 1.286h1.286c.703 0 1.286-.583 1.286-1.286V.643z"/></svg>
                        <span>{{ single.caloricity }}</span>
                    </div>
                </div>
            </div>
            <div class="sv-singleRecipeIngredients">
                <h1 class="sv-title">Ingredients</h1>
                <ul class="sv-mainList sv-mainListCard">
                    <li v-for="(item, index) in single.ingredients">
                        <div class="sv-listCircle">
                            <span></span>
                        </div>
                        <span>{{ item }}</span>
                    </li>
                </ul>

            </div>
            <div class="sv-singleRecipeInstructios">
                <h1 class="sv-title">Instructions</h1>
                <ul class="sv-mainList sv-mainListCard">
                    <li v-for="(item, index) in single.instructions">
                        <div class="sv-listCircle">
                            <span class="sv-circle">
                                <span>{{ index + 1 }}</span>
                            </span>
                        </div>
                        <span>{{ item }}</span>
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>

<script>
    import Vue from 'vue';
    import { mapGetters } from 'vuex';
    import { store } from '../store';
    import Swiper from 'swiper';


    export default {
        data() {
            return {

            }
        },
        computed: {
            ...mapGetters('recipes', {
                single: 'loadedRecipe'
            })
        },
        methods: {
          secondsToHms(d) {
            if (d === 0) {
              return `${0} min.`;
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
            ripple() {
                let getButtons = document.querySelectorAll('.ripple');
                for(let i = 0; i < getButtons.length; i++) {
                    getButtons[i].addEventListener('click', (e) => {

                        if(e.target.classList.contains('ripple')) {
                            let y = e.clientY - e.target.getBoundingClientRect().top;
                            let x = e.clientX - e.target.getBoundingClientRect().left;


                            let rippleDiv = document.createElement("div");
                            rippleDiv.classList.add('rippleActive');
                            rippleDiv.style.cssText = `top: ${y}px; left: ${x}px`;


                            e.target.appendChild(rippleDiv);

                            setTimeout(() => {
                                rippleDiv.parentElement.removeChild(rippleDiv);
                            }, 900);
                        }
                    }, false);
                }
            }
        },
        beforeRouteEnter(to, from, next) {
            Vue.http.get(`https://test.space-o.ru/detail_${to.params.id}.json`)
                .then(response => response.json())
                .then(json => {
                    store.dispatch('recipes/loadRecipe', json.recipe);
                    next(vm => {
                        vm.ripple();
                    })
                })
        },
        mounted() {
          const mySwiper = new Swiper('.swiper-container', {
            loop: false,
            pagination: {
              el: '.swiper-pagination',
              type: 'bullets',
              clickable: true,
            },
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            on: {
              init() {
                document.querySelector('.swiper-button-prev').style.display = "none";
              },
              slideChange() {
                if (mySwiper.activeIndex === 0) {
                  document.querySelector('.swiper-button-prev').style.display = "none";
                  document.querySelector('.swiper-button-next').style.display = "flex";
                } else if (mySwiper.activeIndex === mySwiper.slides.length-1) {
                  document.querySelector('.swiper-button-next').style.display = "none";
                  document.querySelector('.swiper-button-prev').style.display = "flex";

                } else {
                  document.querySelector('.swiper-button-prev').style.display = "flex";
                  document.querySelector('.swiper-button-next').style.display = "flex";
                }
              },


            }

          });
        }
    }
</script>
