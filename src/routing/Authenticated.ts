import router from "./index";
import store from '../store';
import { Route, NavigationGuard } from "vue-router/types";

router.beforeEach(async (to: Route, from: Route, next: () => void) => {
	// Redirect to the login page if not authenticated
	if (to.meta && to.meta.auth !== undefined) {
		if (to.meta.auth) {
			if (window.isLoggedIn) {
				next();
			} else {
				window.localStorage.setItem(
					"previousUrl",
					window.location.href
				);
				router.push({
					name: "login"
				});
			}
		} else {
			if (window.isLoggedIn) {
				router.push({
					name: "home"
				});
			} else {
				next();
			}
		}
	} else {
		next();
	}
});
