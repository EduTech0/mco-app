const routes = [
  {
    path: "/",
    component: () => import("layouts/AuthLayout.vue"),
    meta: { requiresAuth: false },
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
  {
    path: "/beranda",
    component: () => import("layouts/MainLayout.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        component: () => import("pages/home/BerandaPage.vue"),
        name: "beranda",
      },
      {
        path: "notifikasi",
        component: () => import("pages/home/NotifikasiPage.vue"),
        name: "notifikasi",
      },
      {
        path: "saya",
        component: () => import("pages/home/SayaPage.vue"),
        name: "saya",
      },
    ],
  },
  {
    path: "/dashboard",
    component: () => import("layouts/DashboardLayout.vue"),
    meta: { requiresAuth: true },
    redirect: "/dashboard",
    children: [
      { path: "home", component: () => import("pages/dashboard/Home.vue") },
      {
        path: "customer",
        component: () => import("pages/dashboard/Customer.vue"),
      },
      {
        path: "cedera",
        component: () => import("pages/dashboard/cedera/IndexCedera.vue"),
      },
      {
        path: "pendaftaran",
        redirect: "/pendaftaran",
        children: [
          {
            path: "",
            component: () =>
              import(
                "pages/dashboard/pendaftaran/IndexPendaftaran/SemuaPendaftaran.vue"
              ),
          },
          {
            path: "belumSetuju",
            component: () =>
              import(
                "pages/dashboard/pendaftaran/IndexPendaftaran/BelumPendaftaran.vue"
              ),
          },
          {
            path: "sudahSetuju",
            component: () =>
              import(
                "pages/dashboard/pendaftaran/IndexPendaftaran/SudahPendaftaran.vue"
              ),
          },
          {
            path: "selesai",
            component: () =>
              import(
                "pages/dashboard/pendaftaran/IndexPendaftaran/SelesaiPendaftaran.vue"
              ),
          },
        ],
      },
      {
        path: "jadwal",
        component: () => import("pages/dashboard/jadwal/IndexJadwal.vue"),
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
