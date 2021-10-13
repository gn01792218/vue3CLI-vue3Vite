<template>
  <div class="gem-main">
    <LiveCamara/>
    <Counter class="counter"
      :round ="roundCount"
      :countNum ="countSec"
    />
    <GameHistory/>
    <button class="countButton" @click="playCount">開始倒數</button>
  </div>
  <div class="gem-right">
      <BettingArea/>
      <TableInfo/>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent,reactive,ref, watch} from 'vue'
import LiveCamara from '@/components/LiveCamara.vue'
import BettingArea from '@/components/BettingArea.vue'
import TableInfo from '@/components/TableInfo.vue';
import GameHistory from '@/components/GameHistory.vue'
import Counter from '@/components/Counter.vue'
import { useRouter } from 'vue-router'
import {useStore} from 'vuex'
import {createSocket} from '../webSocket'
import {sendLogin,sendTableJoinCall} from '../socketApi'
export default defineComponent({
  components:{
    LiveCamara,
    BettingArea,
    TableInfo,
    GameHistory,
    Counter,
  },
  setup(){
   //創建websocket連線，並發送登入請求
    createSocket()
    sendLogin({
          uri: "LoginCall",
          account: "user",
          password: "password"
    })
    //路由處理，取得當前桌號
    const router = useRouter()
    const tableNum = computed(()=>{
      return router.currentRoute.value.params.tableId
    })
    //vuex資料
    const store = useStore()
    
    const loginState = computed(()=>{  //取得登入狀態
      return store.state.auth.LoginRecall.status
    })
    const tables = reactive(computed(()=>{  //桌號uuid
      return store.state.lobby.LobbyInfo
    }))
    //監聽
    //1.監聽換桌時發送登入請求-->以換取上桌資訊
    watch(tableNum,()=>{
      if(tableNum.value){
        //先發送LoginCall請求
          sendLogin({
          uri: "LoginCall",
          account: "user",
          password: "password"
          })
      }
    })
    //2.發送換桌請求
    watch(tables,()=>{
      if(tableNum.value === "A"){
          sendTableJoinCall({
          uri:"TableJoinCall",
          uuid:tables.value.tables[0].uuid
        })
        console.log("上桌請求",tables.value.tables[0].uuid)
      }else if(tableNum.value === "B"){
          sendTableJoinCall({
          uri:"TableJoinCall",
          uuid:tables.value.tables[1].uuid
        })
        console.log("上桌請求",tables.value.tables[1].uuid)
      }
    })
    router.afterEach((to,from,next) => { //換桌時強制刷新-->可能不需要了!!!!因為Vue3資料會響應!!!
      // router.go(0)
    })
    //倒數計時
    const roundCount = ref(0) //第幾回合-->到時候要computed
    const countSec = ref(15) //要倒數幾秒-->到時候要computed
    const playCount = ()=>{  //需要由serve傳送倒數指令才能啟動
      roundCount.value++;
      console.log("第"+roundCount.value+"回合倒數開始")
    }
    return{
      //data
      loginState,tableNum,roundCount,countSec,
      //methods
      playCount,
    }
  },
})
</script>
<style scoped>
  .gem-righ{
    clear: left;
    position: relative;
  }
  .counter{
    position: absolute;
  }
  .countButton{
    position: absolute;
    top:10%;
    left:11%;
  }
</style>