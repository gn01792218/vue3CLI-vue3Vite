import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Cookies from 'js-cookie'
import { getReCall } from './socketApi'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import "../src/assets/css/bootstrap.min.css"
import './assets/css/game.css';  //最後引入主要CSS

createApp(App).use(store).use(router).mount('#app')
window.addEventListener('onmessageWs',getReCall)  //全局註冊wbSocket的訊息監聽
router.beforeEach((to,from,next)=>{
    const isLogin = Cookies.get('userToken') == 'ImLogin'
    if(isLogin){
        next();
    }else{
        alert("登入失敗")
    }
})

