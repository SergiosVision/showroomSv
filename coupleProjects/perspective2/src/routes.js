import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Index from './vue_components/Page/Index';
import Services from './vue_components/InsidePages/Services/Services';
import Service from './vue_components/InsidePages/Services/Service';
import News from './vue_components/InsidePages/News/News';
import NewsOnce from './vue_components/InsidePages/News/NewsSingle';
import Useful from './vue_components/InsidePages/Useful/Useful';
import UsefulSingle from './vue_components/InsidePages/Useful/UsefulSingle';
import Contacts from './vue_components/InsidePages/Contacts/Contacts';
import E404 from './vue_components/E404'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Index,
        meta: {
            title: 'Перспектива - Главная'
        }
    },
    {
        path: '/services',
        name: 'Services',
        component: Services,
        meta: {title: 'Услуги'},
        children: [
            {
                path: ':slug',
                name: 'ServicesInside',
                component: Service,
                meta: {title: 'Услуги'},
                props: true
            }
        ]
    },
    {
        path: '/news',
        name: 'News',
        component: News,
        meta: {title: 'Новости'},
        children: [
            {
                path: ':slug',
                name: 'NewsInside',
                component: NewsOnce,
                meta: {title: 'Новости'},
                props: true
            }
        ]
    },
    {
        path: '/useful',
        name: 'Useful',
        component: Useful,
        meta: {title: 'Полезное'},
        children: [
            {
                path: ':slug',
                name: 'UsefulInside',
                component: UsefulSingle,
                meta: {title: 'Полезное'},
                props: true
            }
        ]
    },
    {
        path: '/contacts',
        name: 'Contacts',
        component: Contacts,
        meta: {
            title: 'Контакты'
        }
    },
    {
        path: '*',
        name: '404',
        component: E404,
        meta: {
            title: 'Ничего не найдено :('
        }
    },
];



export const router = new VueRouter({
    routes,
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {
        let feedbackButton = document.querySelector('.t-feedBackBtnWrapper');
        // let feedbackDefaultPosition = 48;
        // feedbackButton.style.bottom = `${feedbackDefaultPosition}px`;
        if((to.name === 'ServicesInside' || from.name === 'ServicesInside')
            || (to.name === 'NewsInside' || from.name === 'NewsInside')
            || (to.name === 'UsefulInside' || from.name === 'UsefulInside')
        ) {
            return savedPosition
        } else {
            return {x: 0, y: 0};
        }
    }
});