const routes = [
  // Authentication
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
        path: "login",
        component: () => import("pages/auth/LoginPage.vue"),
        name: "login",
      },
      {
        path: "register",
        component: () => import("pages/auth/RegisterPage.vue"),
        name: "register",
      },
    ],
  },
  // Home
  {
    path: "/beranda",
    component: () => import("layouts/MainLayout.vue"),
    meta: { requiresAuth: true, roles: ["Admin", "Member"] },
    children: [
      {
        path: "",
        component: () => import("pages/home/BerandaPage.vue"),
        name: "beranda",
      },
      {
        path: "riwayat",
        component: () => import("pages/home/RiwayatPage.vue"),
        name: "riwayat",
      },
      {
        path: "pembayaran/:slug",
        component: () => import("pages/home/PembayaranPage.vue"),
        name: "pembayaran",
      },
      {
        path: "profile",
        component: () => import("pages/home/ProfilePage.vue"),
        name: "profile",
      },
    ],
  },
  // Dashboard
  {
    path: "/dashboard",
    component: () => import("layouts/DashboardLayout.vue"),
    meta: { requiresAuth: true, roles: ["Admin"] },
    children: [
      {
        path: "",
        component: () => import("pages/dashboard/customer/IndexCustomer.vue"),
        name: "home",
      },
      {
        path: "customer",
        component: () => import("pages/dashboard/customer/IndexCustomer.vue"),
        name: "customer",
      },
      {
        path: "cedera",
        component: () => import("pages/dashboard/cedera/IndexCedera.vue"),
        name: "cedera",
      },
      {
        path: "jadwal",
        component: () => import("pages/dashboard/jadwal/IndexJadwal.vue"),
        name: "jadwal",
      },
      {
        path: "pendaftaran",
        children: [
          {
            path: "",
            component: () =>
              import(
                "pages/dashboard/pendaftaran/IndexPendaftaran/SemuaPendaftaran.vue"
              ),
            name: "semuapendaftaran",
          },
          {
            path: "belumSetuju",
            component: () =>
              import(
                "pages/dashboard/pendaftaran/IndexPendaftaran/BelumPendaftaran.vue"
              ),
            name: "belumpendaftaran",
          },
          {
            path: "sudahSetuju",
            component: () =>
              import(
                "pages/dashboard/pendaftaran/IndexPendaftaran/SudahPendaftaran.vue"
              ),
            name: "sudahpendaftaran",
          },
          {
            path: "selesai",
            component: () =>
              import(
                "pages/dashboard/pendaftaran/IndexPendaftaran/SelesaiPendaftaran.vue"
              ),
            name: "selesaipendaftaran",
          },
        ],
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
