import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Cookies from 'js-cookie'
import { getMsgReCall , sendTableJoinCall} from './socketApi'
import "bootstrap"
import "../src/assets/css/bootstrap.min.css"
import './assets/css/all.css';  //最後引入主要CSS


NodePlayer.load(()=>{
    createApp(App).use(store).use(router).mount('#app')
})
window.addEventListener('onmessageWs',getMsgReCall)  //全局註冊wbSocket的訊息監聽

// router.beforeEach((to,from,next)=>{
//     const VerifiedSuccessfully = Cookies.get('userToken') == 'ImLogin'
//     if(VerifiedSuccessfully){
//         next();
//     }else{
//         if(to.path.indexOf('Home')==-1){  //要去的地方不含Home
//             console.log(to.path)
//             alert("登入失敗，請重新登入")
//             next('/Home')
//         }else{
//             next()
//         }
//     }
// })

