<template>
    <footer>
        <div class="t-footerTop">
            <ul class="t-footerList t-mainList">
                <router-link v-for="(item, index) in footerMenuList"
                             :key="index"
                             :to="item.url"
                             tag="li">
                    <a>{{ item.text }}</a>
                </router-link>
                <li class="t-footerAskQuestion">
                    <a @click.prevent="showModal">Задать вопрос</a>
                </li>
            </ul>
        </div>
        <div class="t-footerBottom">
            <div class="t-copy">
                <small>© Перспектива 2018</small>
            </div>
            <div class="t-copyLogo">
                <a href="http://tdsgn.ru/" target="_blank">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0 6C0 3.17188 0 1.75781 0.876953 0.878906C1.75586 0 3.16797 0 5.99219 0H17.9785C20.8027 0 22.2148 0 23.0938 0.878906C23.9707 1.75781 23.9707 3.17188 23.9707 6V18C23.9707 20.8281 23.9707 22.2422 23.0938 23.1211C22.2148 24 20.8027 24 17.9785 24H5.99219C3.16797 24 1.75586 24 0.876953 23.1211C0 22.2422 0 20.8281 0 18V6ZM15.7793 7.31934H13.5703V4H9.9707V7.31934H7.9707V9.84082H9.9707V14.7969C9.9707 17.9209 11.0293 19 13.9707 19C15.1582 19 15.9707 18.5801 15.9707 18.5801L15.9062 16.0576H14.7715C13.6172 16.0576 13.5957 15.0732 13.5703 13.9717V13.9561V9.84082H15.7793V7.31934Z" transform="translate(0.0292969)" fill="#E31717"/>
                    </svg>
                </a>
            </div>
        </div>
    </footer>
</template>

<script>
    import { mapGetters, mapMutations } from 'vuex';
    export default {
        data() {
            return {

            }
        },
        computed: {
            ...mapGetters('menuFooter', {
                footerMenuList: 'items'
            })
        },
        methods: {
            ...mapMutations('smallModal',['showModal']),
        }
    }
</script>

<style>

</style>