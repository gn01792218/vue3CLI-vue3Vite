<template>
  <div class="home">
      <h1>點選左側選擇遊戲</h1>
  </div>
  <!-- <Loading/> -->
</template>
<script lang="ts">
import {computed, defineComponent,ref, watch} from 'vue'
import {useStore} from 'vuex'
import {useRoute,useRouter } from 'vue-router'
// import Loading from '@/components/Loading.vue'
import {createSocket} from '../webSocket'
import {sendLogin} from '../socketApi'
import Cookies from 'js-cookie'
export default defineComponent({
  components:{
    // Loading,
  },
    setup(){
      const route = useRoute()
      const router = useRouter()
      Cookies.set('userToken',route.params.userToken,{expires:0.1})
      // console.log('設置cookies',Cookies.get('userToken'))
      // console.log('傳送路由參數',route.params.userToken)
      const store = useStore()
      const vuexUserToken = computed(()=>{
        return store.state.auth.userToken
      })
      const userToken = ref<string>(store.state.auth.userToken)
      const loginState = computed(()=>{  //取得登入狀態
        return store.state.auth.LoginRecall.status
      })
      //創建連線(再次返回大廳時使用者token已經存在，就不會再創server)
        // createSocket()
          sendLogin({
            uri: "LoginCall",
            token: route.params.userToken,
          })
        // sendLogin({
        //   uri: "LoginCall",
        //   token: Cookies.get('userToken'),
        // })
      //驗證使用者token
      // const userToken = ref(router.currentRoute.value.params.userToken)
      //如果LoginReCall是正確的，就設置cookie為ImLogin
      watch(loginState,()=>{
        switch(loginState.value){
          case 1:
            userToken.value = "ImLogin"
            store.commit('auth/setUserToken',Cookies.get('userToken'))
            //以下是暫時性的
            router.push('/BaccaratGame/A')
            break
          case -1:
            alert("驗證失敗，請重新登入")
        }
      })
      return{
          //data
      }
    }
})
</script>