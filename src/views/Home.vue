<template>

  <div class="home">
      <h1>點選左側選擇遊戲</h1>
  </div>

  <Loading v-if="isLogin"/>

</template>

<script lang="ts">
import {computed, defineComponent, ref, watch} from 'vue'
import {useStore} from 'vuex'
import { useRouter,useRoute } from 'vue-router'
import Loading from '@/components/Loading.vue'
import {createSocket} from '../webSocket'
import {sendLogin} from '../socketApi'
import Cookies from 'js-cookie'

export default defineComponent({
  components:{
    Loading,
  },
    setup(){
      const router = useRouter()
      const route = useRoute()
      const store = useStore()
      store.commit('auth/setUserToken',route.params.userToken)
      const isLogin = ref(true)
      const userToken = ref<string>(store.state.auth.userToken)
      console.log(userToken.value)
      const loginState = computed(()=>{  //取得登入狀態
      return store.state.auth.LoginRecall.status
      })
      //創建websocket連線，並發送登入請求
        createSocket(userToken.value)
        sendLogin({
          uri: "LoginCall",
          //之後要傳送的是token
          token: userToken.value,
        })
        // if(Cookies.get('userToken') === 'ImLogin'){
        //   Cookies.remove('userToken')
        // }
      //驗證使用者token
      // const userToken = ref(router.currentRoute.value.params.userToken)
      //如果LoginReCall是正確的，就設置cookie為ImLogin
      watch(loginState,()=>{
        switch(loginState.value){
          case 1:
            isLogin.value = false
            userToken.value = "ImLogin"
            Cookies.set('userToken',userToken.value,{expires:0.1})
            break
          case -1:
            alert("驗證失敗，請重新登入")
        }
      })
      return{
          //data
          isLogin
      }
    }
})
</script>