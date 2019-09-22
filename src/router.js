import Vue from 'vue'
import VueRouter from 'vue-router'
import VueCookies from "vue-cookies"

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: 'login',
    },
    {
      path: '/',
      redirect: 'login',
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('./page/Login'),
      meta: { requerAuth: false }
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('./page/About'),
      meta: { requerAuth: false }
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('./page/Home'),
      meta: { requerAuth: true }
    },
    {
      path: '/changepassword',
      name: 'Changepassword',
      component: () => import('./page/Changepassword'),
      meta: { requerAuth: true }
    },

    {
      path: '/settings',
      name: 'Settings',
      component: () => import('./page/Settings'),
      meta: { requerAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  let auth = to.matched.some(record => record.meta.requerAuth);
  const user = VueCookies.get("user");

  if (auth) {
    if (user != null) {
      if (user.uid != null) {
        next();
      } else {
        next({
          path: "/login"
        });
      }
    } else {
      next({
        path: "/login"
      });
    }
  } else {
    next();
  }

});

export default router;