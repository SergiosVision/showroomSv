import Vue from 'vue';
import Vuex from 'vuex';
import Polyfill from '../js/polyfill';
Polyfill();

Vue.use(Vuex);

import menu from './modules/menu';
import menuFooter from './modules/footerMenu';
import servicesStore from './modules/Services/servicesStore';
import shared from './modules/shared';
import newsStore from './modules/News/newsStore';
import usefulStore from './modules/Usf/usfStore';
import contacts from './modules/Contacts/contacts';
import tape from './modules/tape';
import two from './modules/mainPageNews';
import slides from './modules/slides';
import smallModal from './modules/smallModal';
import modals from './modules/modals';
import mainPageEls from './modules/mainPageEls';

export const store = new Vuex.Store({
	modules: {
        shared,
		menu,
        menuFooter,
        servicesStore,
        newsStore,
        usefulStore,
        contacts,
        tape,
        two,
        slides,
        smallModal,
        modals,
        mainPageEls

	},
	strict: process.env.NODE_ENV !== 'production'
});