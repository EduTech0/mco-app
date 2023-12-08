export default ({ router }) => {
  router.beforeEach((to, from, next) => {
    const token = LocalStorage.getItem("token");

    if (to.path === "/login") {
      // If the user is trying to access the login page, allow access regardless of token
      next();
    } else {
      // Check if the route requires authentication
      if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (!token) {
          // Redirect to login if token is not present
          next({
            path: "/login",
            query: { redirect: to.fullPath },
          });
        } else {
          // Continue to the next route
          next();
        }
      } else {
        // Continue to the next route for non-authenticated routes
        next();
      }
    }
  });
};
