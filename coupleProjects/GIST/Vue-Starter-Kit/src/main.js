import Vue from 'vue'
import App from './vue_components/App.vue'

import {store} from './store'
import {router} from './routes'

import VueResource from 'vue-resource'
Vue.use(VueResource);
Vue.http.options.root = '/';

new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App)
});
