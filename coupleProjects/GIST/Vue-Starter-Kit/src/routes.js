import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Index from './vue_components/Index.vue';
import ProductsList from './vue_components/ProductsList.vue';
import E404 from './vue_components/E404.vue'

const routes = [
    {
        path: '',
        component: Index
    },
    {
        path: '/products',
        component: ProductsList
    },
    {
        path: '*',
        component: E404
    }
];

export const router = new VueRouter({
    routes,
    mode: 'history'
});