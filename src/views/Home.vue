<template>
  <div class="home">
      <h1>點選左側選擇遊戲</h1>
  </div>
  <Loading v-if="isLogin"/>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, ref, watch} from 'vue'
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
      const route = useRoute()
      const store = useStore()
      const isLogin = ref(true)
      const vuexUserToken = computed(()=>{
        return store.state.auth.userToken
      })
      const userToken = ref<string>(store.state.auth.userToken)
      console.log(vuexUserToken.value)
      const loginState = computed(()=>{  //取得登入狀態
      return store.state.auth.LoginRecall.status
      })
      //創建websocket連線，並發送登入請求
        // onMounted(()=>{
        //   console.log("mounted",vuexUserToken.value,loginState.value)
        //   if(!vuexUserToken.value){
        //     console.log("創")
            
        //   }
        // })
        console.log(vuexUserToken.value)
        if(vuexUserToken.value==""){
           console.log("有使用者近來，進行驗證")
            createSocket()
            sendLogin({
              uri: "LoginCall",
              token: route.params.userToken,
            })
        } //再次返回大廳時使用者token已經存在，就不會再創server
         
      //驗證使用者token
      // const userToken = ref(router.currentRoute.value.params.userToken)
      //如果LoginReCall是正確的，就設置cookie為ImLogin
      watch(loginState,()=>{
        console.log(loginState.value)
        switch(loginState.value){
          case 1:
            isLogin.value = false
            userToken.value = "ImLogin"
            store.commit('auth/setUserToken',route.params.userToken)
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