export default ({ router }) => {
  const token = localStorage.getItem("token");

  router.beforeEach((to, from, next) => {
    // Authentication
    if (to.meta.requiresAuth) {
      if (!token) {
        next("/login");
      } else {
        next();
      }
    }

    // Home
    else if (to.name === "login" && token) {
      // Jika pengguna sudah memiliki token, redirect dari halaman login
      next("/beranda");
    } else if (to.name === "register" && token) {
      next("/beranda");
    } else if (to.name === "getstarted" && token) {
      next("/beranda");
    } // } else if (to.name === "login") {
    //   next("/dashboard");
    // } else if (to.name === "register") {
    //   next("/dashboard");
    // } else if (to.name === "getstarted") {
    //   next("/dashboard");
    // }

    // Dashboard
    // else if (to.name === "home" && token) {
    //   next("/beranda");
    // }
    else if (to.name === "customer" && token) {
      next("/beranda");
    } else if (to.name === "cedera" && token) {
      next("/beranda");
    } else if (to.name === "jadwal" && token) {
      next("/beranda");
    } else if (to.name === "semuapendaftaran" && token) {
      next("/beranda");
    } else if (to.name === "belumpendaftaran" && token) {
      next("/beranda");
    } else if (to.name === "sudahpendaftaran" && token) {
      next("/beranda");
    } else if (to.name === "selesaipendaftaran" && token) {
      next("/beranda");
    } else {
      next();
    }
  });
};
