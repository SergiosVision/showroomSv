<template>
  <div class="t-wrapper">
      <Header></Header>
      <main :class="{'t-mainControl': $route.path !== '/'}">
          <router-view></router-view>

          <transition name="mainFade">
              <small-dialog v-if="visible"></small-dialog>
          </transition>
      </main>
      <Footer></Footer>
      <div @click.prevent="showModal" class="t-feedBackBtnWrapper">
            <div class="t-feedBackBtnIconHolder">
                <svg width="30" height="27" viewBox="0 0 30 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 5C0 2.23858 2.23858 0 5 0H25C27.7614 0 30 2.23858 30 5V17.2C30 19.9614 27.7614 22.2 25 22.2H19.05L16.6087 25.5051C15.8093 26.5875 14.1907 26.5875 13.3913 25.5051L10.95 22.2H5C2.23858 22.2 0 19.9614 0 17.2V5ZM5 2C3.34315 2 2 3.34315 2 5V17.2C2 18.8569 3.34315 20.2 5 20.2H11.4545C11.7719 20.2 12.0704 20.3506 12.2589 20.6059L15 24.3169L17.7411 20.6059C17.9296 20.3506 18.2281 20.2 18.5455 20.2H25C26.6569 20.2 28 18.8569 28 17.2V5C28 3.34315 26.6569 2 25 2H5Z" fill="#4085D5"/>
                    <path d="M1.99363 6.82124C1.99363 6.16711 2.06369 5.65188 2.20382 5.27554C2.34395 4.89471 2.57113 4.56541 2.88535 4.28763C3.19958 4.00986 3.43737 3.75672 3.59873 3.52823C3.76433 3.29525 3.84713 3.03987 3.84713 2.7621C3.84713 2.08557 3.57113 1.74731 3.01911 1.74731C2.76433 1.74731 2.55839 1.84588 2.40127 2.04301C2.24416 2.24014 2.16136 2.50672 2.15287 2.84274H0C0.00849257 1.94668 0.276009 1.25 0.802548 0.752688C1.32909 0.250896 2.06794 0 3.01911 0C3.96603 0 4.69851 0.230735 5.21656 0.692204C5.73885 1.15367 6 1.81004 6 2.66129C6 3.03315 5.92994 3.37142 5.78981 3.67608C5.64968 3.98073 5.42463 4.29211 5.11465 4.61022L4.38217 5.3293C4.1741 5.53987 4.02972 5.75717 3.94904 5.98118C3.86837 6.20072 3.82378 6.48073 3.81529 6.82124H1.99363ZM1.73248 8.86425C1.73248 8.53271 1.84501 8.26165 2.07006 8.05107C2.29936 7.83602 2.58386 7.72849 2.92357 7.72849C3.26327 7.72849 3.54565 7.83602 3.7707 8.05107C4 8.26165 4.11465 8.53271 4.11465 8.86425C4.11465 9.19579 4 9.46909 3.7707 9.68414C3.54565 9.89471 3.26327 10 2.92357 10C2.58386 10 2.29936 9.89471 2.07006 9.68414C1.84501 9.46909 1.73248 9.19579 1.73248 8.86425Z" transform="translate(12 6)" fill="#4085D5"/>
                </svg>
            </div>
            <span class="t-feedBackBtnTitle">Задать вопрос</span>
      </div>
      <success-message v-if="visibleModals"></success-message>
  </div>
</template>



<script>
    import Header from './header/Header'
    import Footer from './footer/Footer'
    import { mapGetters, mapMutations } from 'vuex'
    export default {
        metaInfo: {
            title: 'Перспектива | Главная',
        },
        data() {
            return {
                dialogActive: true,
                bottomHelp: window.innerWidth > 767?48:86
            }
        },
        components: {
            'Header': Header,
            'Footer': Footer
        },
        computed: {
            ...mapGetters('smallModal',{
                visible: 'call',
            }),
            ...mapGetters('modals',{
                visibleModals: 'callModalVis',
            }),
        },
        methods: {
            ...mapMutations('smallModal',['showModal']),

            help() {
                let getFeedBackBtn = this.$el.querySelector('.t-feedBackBtnWrapper');
                let getFooter = this.$el.querySelector('footer');
                let footerTop = getFooter.getBoundingClientRect().top;
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop || window.scrollTop;
                let getThisPosition = scrollTop + window.innerHeight;
                let footerOffset = footerTop + scrollTop;

                getThisPosition < footerOffset ? getFeedBackBtn.style.bottom = `${this.bottomHelp}px` : getFeedBackBtn.style.bottom = `${this.bottomHelp + getThisPosition - footerOffset}px`;
            },
        },
        created () {
            window.addEventListener('scroll', this.help, false);
        },
        mounted() {

        },
    }
</script>

<style>
  
</style>