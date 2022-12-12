import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { getMsgReCall } from './socketApi'
import "bootstrap"
import "../src/assets/css/bootstrap.min.css"
import './assets/css/all.css';  //最後引入主要CSS
console.log('引入main.ts')
NodePlayer.load(()=>{
    const vue = createApp(App).use(store).use(router).mount('#app')
    console.log(vue)
})
window.addEventListener('onmessageWs',getMsgReCall)  //全局註冊wbSocket的訊息監聽

