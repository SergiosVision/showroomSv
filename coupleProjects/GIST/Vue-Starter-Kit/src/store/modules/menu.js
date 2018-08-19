export default {
	namespaced: true,
	state: {
		items: [
			{
				url: '/products',
				text: 'Products List'
			},
			{
				url: '/',
				text: 'Home page'
			}
		]
	},
	getters: {
		items(state){
			return state.items;
		}
	}
};