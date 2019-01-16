import Vue from "vue";
import Router from "vue-router";

import Dashboard from '@/pages/Dashboard/Dashboard.vue';

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/pages/Dashboard/Dashboard.vue"),
    },
    {
      path: "/budget",
      name: "budget",
      component: () => import("@/pages/Budget/Budget.vue"),
    }
  ]
});
