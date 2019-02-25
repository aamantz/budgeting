import Vue from "vue";
import App from "./App.vue";
import router from "./routing";
import "./routing/Authenticated";
import store from "./store";
import "./plugins";
import axios from "axios";

Vue.config.productionTip = false;

// Axios Configuration
axios.defaults.baseURL = process.env.VUE_APP_API_URL;
axios.defaults.withCredentials = true;

axios.interceptors.request.use(config => {
	config.headers = {
		'csrf-token': getCookie( 'XSRF-TOKEN' )
	};
	return config;
});

axios.interceptors.response.use( response => {
	return response;
} );

// Window Vars
window.isLoggedIn = false;

(async () => {
	try {
		await store.dispatch( 'Auth/checkToken' );
	} catch {
		// Empty Block
	} finally {
		new Vue({
			router,
			store,
			render: h => h(App)
		}).$mount("#app");
	}
})();

function getCookie(name: string) {
	const re = new RegExp(name + "=([^;]+)");
	const value = re.exec(document.cookie);
	return value != null ? unescape(value[1]) : null;
}
