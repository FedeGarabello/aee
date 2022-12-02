import { createRouter, createWebHashHistory } from "vue-router";
import { subscribeToAuthChanges } from "../services/auth.js";

import Login from "../pages/Login.vue";
import Inicio from "../pages/Inicio.vue";
import Evento from "../pages/Evento.vue";
import Contactos from "../pages/Contactos.vue";
import BuscarContactos from "../pages/BuscarContactos.vue";
import BuscarEvento from "../pages/BuscarEvento.vue";
import Chat from "../pages/Chat.vue";
import Perfil from "../pages/Perfil.vue";

const routes = [
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/",
    component: Inicio,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/evento/:idEvento",
    component: Evento,
    meta: {
      requiresAuth: true,
      checkIsInEvent: true,
    },
  },
  {
    path: "/evento/:idEvento/chat",
    component: Chat,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/contactos",
    component: Contactos,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/buscar-contactos",
    component: BuscarContactos,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/buscar-evento",
    component: BuscarEvento,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/perfil",
    component: Perfil,
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
      path: "/login",
    };
  }
});
  
  // TODO: verificar que no pueda ingresar un usuario que no pertenece al evento.

export default router;
