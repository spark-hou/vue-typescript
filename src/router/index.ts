import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: RouteConfig[] = [
  {
    path: '/',
    alias: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/typeScriptLearn',
    name: 'TypeScriptLearn',
    component: () => import('../views/TypeScriptLearn/index.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
