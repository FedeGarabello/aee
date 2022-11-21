import { createRouter, createWebHashHistory } from "vue-router";
import { subscribeToAuthChanges } from "../services/auth.js";

import Home from "../pages/Home.vue";
import Inicio from "../pages/Inicio.vue";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/inicio",
    component: Inicio,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

let userData;
subscribeToAuthChanges((newUser) => (userData = newUser));

router.beforeEach((to, from) => {
  if (to.meta.requiresAuth && userData.id === null) {
    return {
      path: "/",
    };
  }
});
export default router;
