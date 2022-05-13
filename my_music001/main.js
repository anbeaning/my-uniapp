import Vue from 'vue'
import App from './App'
import store from './store/index.js'

Vue.prototype.$store = store

// import VueLazyLoad from 'vue-lazyload';
// Vue.use(VueLazyLoad, {
// 	error: '', // 加载错误的图片
// 	loading: '' // 加载时的图片
// });


App.mpType = 'app'

// 挂载store
const app = new Vue({
	...App,
	store
})
app.$mount()
