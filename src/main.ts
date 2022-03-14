import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { getMsgReCall } from './socketApi'
import "bootstrap"
import "../src/assets/css/bootstrap.min.css"
import './assets/css/all.css';  //最後引入主要CSS
NodePlayer.load(()=>{
    createApp(App).use(store).use(router).mount('#app')
})
window.addEventListener('onmessageWs',getMsgReCall)  //全局註冊wbSocket的訊息監聽

