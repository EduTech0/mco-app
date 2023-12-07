import { LocalStorage } from "quasar";

const token = LocalStorage.getItem("token");

const routes = [
  {
    path: "/",
    beforeEnter: (to, from, next) => {
      token ? next("/beranda") : next();
    },
    component: () => import("layouts/AuthLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/auth/GetStartedPage.vue"),
        name: "getstarted",
      },
      {
        path: "/login",
        component: () => import("pages/auth/LoginPage.vue"),
        name: "login",
      },
      {
        path: "/register",
        component: () => import("pages/auth/RegisterPage.vue"),
        name: "register",
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
