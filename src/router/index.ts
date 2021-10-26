import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Cookies from 'js-cookie'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/Home/:userToken',
    name: 'Home',
    component:()=>import('../views/Home.vue')
    // component: BaccaratGame
  },
  {
    path:'/BaccaratGame/:tableId',   //點擊btn的時候會帶參數，選擇是哪一桌
    name:'/BaccaratGame',
    component:()=>import('../views/BaccaratGame.vue')
  },
  {
    path: '/practice',
    name: 'Practice',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Practice.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router
