import { createRouter, createWebHashHistory } from "vue-router";
import { subscribeToAuthChanges } from "../services/auth.js";

import Home from "../pages/Home.vue";
import Pricing from "../pages/Pricing.vue";
import Registro from "../pages/Registro.vue";
import Login from "../pages/Login.vue";

import HomeAdmin from "../pages/HomeAdmin.vue";
import PanelAdmin from "../pages/PanelAdmin.vue";
import MensajesAdmin from "../pages/MensajesAdmin.vue";
// import { getUserRol } from "../services/user-profiles.js";
// import RegistroAdmin from "../pages/RegistroAdmin.vue";
// import LoginAdmin from "../pages/LoginAdmin.vue";

// import Chat from "../pages/Chat.vue";
import Perfil from "../pages/Perfil.vue";
// import UserProfile from "../pages/UserProfile.vue";
import PrivateChat from "../pages/PrivateChat.vue";
import PrivateChatAdmin from "../pages/PrivateChatAdmin.vue";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/pricing",
    component: Pricing,
  },
  {
    path: "/registro",
    component: Registro,
  },
  {
    path: "/admin",
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    },
    children: [
      {
        path: '',
        component: HomeAdmin,
      },
      {
        path: 'panel',
        component: PanelAdmin,
      },
      {
        path: 'mensajes',
        component: MensajesAdmin,
      },
      {
        path: "mensajes/:id",
        component: PrivateChatAdmin,
        meta: {
          requiresAuth: true,
        },
      }
    ],
  },
  
  // {
  //     path: '/chat',
  //     component: Chat,
  //     meta: {
  //         requiresAuth: true,
  //     },
  // },
  {
    path: "/perfil",
    component: Perfil,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/mensajes/:id",
    component: PrivateChat,
    meta: {
      requiresAuth: true,
    },
  },
  // {
  //     path: '/usuario/:id',
  //     component: UserProfile,
  //     meta: {
  //         requiresAuth: true,
  //     },
  // },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

let userData;
subscribeToAuthChanges((newUser) => (userData = newUser));

router.beforeEach((to, from) => {
  // if (to.meta.rol === "admin") {
  //   if (rol !== "admin") {
  //     return {
  //       path: "/login",
  //     };
  //   }
  // }

  if (to.meta.requiresAuth && userData.id === null) {
    return {
      path: "/login",
    };
  }

  if (to.meta.requiresAdmin && userData.id !== null) {
    if (userData.rol !== "admin") {
      console.log("no es admin");
      return {
        path: "/",
      };
    }
  }
});

export default router;
