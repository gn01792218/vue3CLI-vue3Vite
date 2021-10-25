<template>
  <div class="home">
      <h1>點選左側選擇遊戲</h1>
  </div>
</template>

<script>
import {computed, defineComponent, ref, watch} from 'vue'
import {useStore} from 'vuex'
import { useRouter } from 'vue-router'
import {createSocket} from '../webSocket'
import {sendLogin} from '../socketApi'
import Cookies from 'js-cookie'
export default defineComponent({
    setup(){
      const store = useStore()
      const router = useRouter()
      const userToken = ref(Cookies.get('userToken'))
      const loginState = computed(()=>{  //取得登入狀態
      return store.state.auth.LoginRecall.status
      })
      //創建websocket連線，並發送登入請求
        createSocket()
        sendLogin({
          uri: "LoginCall",
          //之後要傳送的是token
          account: "user",
          password: "password"
        })
      //驗證使用者token
      // const userToken = ref(router.currentRoute.value.params.userToken)
      //如果LoginReCall是正確的，就設置cookie為ImLogin
      watch(loginState,()=>{
        switch(loginState.value){
          case 1:
            userToken.value = "ImLogin"
            Cookies.set('userToken',userToken.value,{expires:1})
            break
          case 2:
            alert("驗證失敗，請先註冊")
        }
      })
      return{

      }
    }
})
</script>

<style>

</style>