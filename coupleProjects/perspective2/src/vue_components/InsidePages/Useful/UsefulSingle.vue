<template>
    <main-dialog :redirect="route" :dialogInfo="usfSingle"></main-dialog>
</template>



<script>
    import Vue from 'vue';
    import { store } from '../../../store';
    export default {
        metaInfo() {
            return {
                title: this.loading ? '' : 'Полезное',
                titleTemplate: this.loading ? '' : '%s | '+ this.usfSingle.title +''
            }
        },
        data() {
            return {
                date: ''
            }
        },
        props: ['slug','route'],
        computed: {
            usfSingle() {
                return this.$store.getters['usefulStore/loadedSingleUsf'](this.slug);
            },
            loading() {return this.$store.getters.loading;},
        },
        beforeRouteEnter(to, from, next) {
            let s = store.getters['usefulStore/loadedSingleUsf'](to.params.slug);
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