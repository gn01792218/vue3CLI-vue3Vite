import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import "../src/assets/css/bootstrap.min.css"
import "../src/assets/css/jquery.atAccordionOrTabs.css"
import './assets/css/game.css';  //最後引入主要CSS


createApp(App).use(store).use(router).mount('#app')
