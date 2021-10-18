import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { getReCall } from './socketApi'
import "../src/assets/css/bootstrap.min.css"
import './assets/css/game.css';  //最後引入主要CSS

createApp(App).use(store).use(router).mount('#app')
window.addEventListener('onmessageWs',getReCall)  //全局註冊wbSocket的訊息監聽

