import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import BaccaratGame from '../views/BaccaratGame.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: BaccaratGame
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
  history: createWebHashHistory(),
  routes
})

export default router
