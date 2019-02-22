import Vue from 'vue';
import App from './App.vue';
import router from './routing';
import store from './store';
import './plugins';
import axios from 'axios';

Vue.config.productionTip = false;

// Axios Configuration
axios.defaults.baseURL = process.env.VUE_APP_API_URL;

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');
