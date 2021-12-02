<template>
  <div id="wap" class="app">
    <div class="container-fluid">
      <div class="container-waps row">
        <Header/>
        <router-view/>
         <Footer/>
      </div>
    </div>
    <Loading/>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Header from './views/Header.vue'
import Footer from './views/Footer.vue'
import BaccaratGame from './views/BaccaratGame.vue'
import Loading from '@/components/Loading.vue'
import {createSocket} from './webSocket'
import {sendLogin } from './socketApi'
import Cookies from 'js-cookie'
export default defineComponent({
  components:{
    Header,Footer,BaccaratGame,Loading
  },
  setup() {
    createSocket()
    sendLogin({
        uri: "LoginCall",
        token: Cookies.get('userToken'),
      })
  },
})
</script>
