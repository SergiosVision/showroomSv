<template>
    <main-dialog :redirect="route" :dialogInfo="service"></main-dialog>
</template>



<script>
    import Vue from 'vue';
    import { store } from  '../../../store';
    export default {
        metaInfo() {
            return {
                title: this.loading ? '' : 'Услуги',
                titleTemplate: this.loading ? '' : '%s | '+ this.service.title +''
            }
        },
        data() {
            return {
                date: '',
            }
        },
        props: ['slug','route'],
        computed: {
            service() {
                return this.$store.getters['servicesStore/loadedService'](this.slug);
            },
            loading() {return this.$store.getters.loading;}
        },
        beforeRouteEnter(to, from, next) {
            let s = store.getters['servicesStore/loadedService'](to.params.slug);
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