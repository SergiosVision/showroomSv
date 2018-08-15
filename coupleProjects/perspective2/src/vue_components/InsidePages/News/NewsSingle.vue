<template>
    <main-dialog :redirect="route" :dialogInfo="newsSingle"></main-dialog>
</template>



<script>
    import Vue from 'vue';
    import { store } from '../../../store';
    import { mapGetters } from 'vuex';
    export default {
        metaInfo() {
            return {
                title: this.loading ? '' : 'Новости',
                titleTemplate: this.loading ? '' : '%s | '+ this.newsSingle.title +''
            }
        },
        data() {
            return {
                date: ''
            }
        },
        props: ['slug','route'],
        computed: {
            ...mapGetters('newsStore', {
                news: 'loadedNews',
            }),
            newsSingle() {
                return this.$store.getters['newsStore/loadedNewsSingle'](this.slug);
            },
            loading() {
                return this.$store.getters.loading;
            },
        },
        beforeRouteEnter(to, from, next) {
            let s = store.getters['newsStore/loadedNewsSingle'](to.params.slug);
            if(s === undefined) {
                next('*');
//                next(vm => {
//                    vm.$router.push({ name: '404' })
//                });
            } else {
                next();
            }

        }
    }
</script>

<style>

</style>