import { createRouter, createWebHistory, RouteRecordRaw ,createWebHashHistory} from 'vue-router'

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
]

const router = createRouter({
  history: createWebHistory(),
  // history:createWebHashHistory(),
  routes
})
export default router
