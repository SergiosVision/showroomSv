export default {
    namespaced: true,
    state: {
        items: [
            {
                url: '/',
                text: 'Главная'
            },
            {
                url: '/services',
                text: 'Услуги'
            },
            {
                url: '/news',
                text: 'Новости'
            },
            {
                url: '/useful',
                text: 'Полезное'
            },
            {
                url: '/contacts',
                text: 'Контакты'
            },
        ]
    },
    getters: {
        items(state) {
            return state.items;
        }
    }
}