import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: 'login',
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('./page/Home')
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('./page/About')
    },
    {
      path: '/changepassword',
      name: 'Changepassword',
      component: () => import('./page/Changepassword')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('./page/Login')
    },
    {
      path: '/settings',
      name: 'Settings',
      component: () => import('./page/Settings')
    }
  ]
})
