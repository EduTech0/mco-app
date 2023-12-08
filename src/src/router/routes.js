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
        component: () => import("pages/auth/GetStarted.vue"),
        name: "getstarted",
      },
      {
        path: "/login",
        component: () => import("pages/auth/Login.vue"),
        name: "login",
      },
      {
        path: "/register",
        component: () => import("pages/auth/Register.vue"),
        name: "register",
      },
    ],
  },
  {
    path: "/beranda",
    beforeEnter: (to, from, next) => {
      token ? next() : next("/login");
    },
    component: () => import("layouts/MainLayout.vue"),
    redirect: "/beranda",
    children: [
      { path: "", component: () => import("pages/Beranda.vue") },
      {
        path: "notifikasi",
        component: () => import("pages/Notifikasi.vue"),
      },
      {
        path: "saya",
        component: () => import("pages/Saya.vue"),
      },
    ],
  },
  {
    path: "/dashboard",
    beforeEnter: (to, from, next) => {
      token ? next() : next("/login");
    },
    component: () => import("layouts/DashboardLayout.vue"),
    redirect: "/dashboard",
    children: [
      { path: "home", component: () => import("pages/dashboard/Home.vue") },
      {
        path: "customer",
        component: () => import("pages/dashboard/Customer.vue"),
      },
      {
        path: "cedera",
        component: () => import("pages/dashboard/Cedera.vue"),
      },
      {
        path: "pendaftaran",
        redirect: "/pendaftaran",
        children: [
          {
            path: "",
            component: () => import("pages/dashboard/pendaftaran/Semua.vue"),
          },
          {
            path: "belumSetuju",
            component: () => import("pages/dashboard/pendaftaran/Belum.vue"),
          },
          {
            path: "sudahSetuju",
            component: () => import("pages/dashboard/pendaftaran/Sudah.vue"),
          },
          {
            path: "selesai",
            component: () => import("pages/dashboard/pendaftaran/Selesai.vue"),
          },
        ],
      },
      {
        path: "jadwal",
        component: () => import("pages/dashboard/Jadwal.vue"),
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
