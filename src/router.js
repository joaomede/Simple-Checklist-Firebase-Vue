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
      component: () => import('./page/home')
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('./page/about')
    },
    {
      path: '/changepassword',
      name: 'Changepassword',
      component: () => import('./page/changepassword')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('./page/login')
    },
    {
      path: '/settings',
      name: 'Settings',
      component: () => import('./page/settings')
    }
  ]
})
