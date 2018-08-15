import Vue from 'vue';
import App from './vue_components/App.vue';
import device from 'current-device'

import {store} from './store'
import {router} from './routes'
import Meta from 'vue-meta';

import VueResource from 'vue-resource'

import NewsCard from './vue_components/Cards/NewsCard';
import Gallery from './vue_components/Page/Gallery';
import MainDialog from './vue_components/Modals/UniversalModal';
import CarouselCard from './vue_components/Cards/CarouselCard';
import SmallDialog from './vue_components/Modals/SmallModal';
import Sharing from './vue_components/Sharing/Sharing';
import Map from './vue_components/Sharing/Map';
import MainSharingCom from './vue_components/Sharing/mainSharingCom';
import SuccessMessageBox from  './vue_components/Modals/successMessage';

Vue.use(VueResource);
Vue.http.options.root = '/';
Vue.use(Meta);
Vue.use(device);

Vue.component('news-card', NewsCard);
Vue.component('gallery', Gallery);
Vue.component('main-dialog', MainDialog);
Vue.component('carousel-card', CarouselCard);
Vue.component('small-dialog', SmallDialog);
Vue.component('sharing', Sharing);
Vue.component('ya-map', Map);
Vue.component('main-sharing', MainSharingCom);
Vue.component('success-message', SuccessMessageBox);

router.beforeEach((to, form, next) => {
    document.title = to.meta.title;
    let checkState = store.getters['modals/mobileMenu'];
    if(checkState === true && window.innerWidth < 1024) {store.commit('modals/hideMobile');}
    next();
});

new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App),
});
