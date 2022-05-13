import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
export default new Vuex.Store({
	state: {
		login: false,
		token: '',
		avatarUrl: '',
		nickName: '',
		backgroundUrl: ''

	},
	mutations: {
		login(state, provider) {
			// console.log(state)
			// 接收到的登录信息
			// console.log(provider)
			state.login = true;
			state.token = provider.token;
			state.backgroundUrl = provider.profile.backgroundUrl
			state.nickName = provider.profile.nickname;
			state.avatarUrl = provider.profile.avatarUrl;
		},
		logout(state) {
			state.login = false;
			state.token = '';
			state.nickName = '';
			state.avatarUrl = '';
		},

	}

});
