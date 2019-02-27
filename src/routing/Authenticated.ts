import router from "./index";
import store from "../store";
import { Route, NavigationGuard } from "vue-router/types";

router.beforeEach(
	async (to: Route, from: Route, next: (prop?: object) => void) => {
		const authRequired = to.matched.some(route => route.meta.auth);

		if (!authRequired) {
			return next();
		}

		if (store.getters["Auth/isAuthenticated"]) {
			try {
				const isAuth = await store.dispatch("Auth/checkToken");
				return next();
			} catch (e) {
				redirectToLogin();
			}
		}

		redirectToLogin();

		function redirectToLogin() {
			// Pass the original route to the login component
			next({ name: "login", query: { redirectFrom: to.fullPath } });
		}
	}
);
