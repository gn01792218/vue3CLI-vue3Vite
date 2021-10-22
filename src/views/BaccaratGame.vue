<template>
  <div class="gem-main">
    <Counter class="counter"
      :round ="roundCount"
    />
    <LiveVideo/>
    <BettingArea/>
    <GameHistory/>
    <TableInfo/>
    <button class="countButton" @click="playCount">開始倒數</button>
  </div>
  <!-- <Practice/> -->
</template>

<script lang="ts">
import {computed, defineComponent,reactive,ref, watch} from 'vue'
import LiveVideo from '@/components/LiveVideo.vue'
import BettingArea from '@/components/BettingArea.vue'
import TableInfo from '@/components/TableInfo.vue'
import GameHistory from '@/components/GameHistory.vue'
import Counter from '@/components/Counter.vue'
import { useRouter } from 'vue-router'
import {useStore} from 'vuex'
import {createSocket} from '../webSocket'
import {sendLogin,sendTableJoinCall} from '../socketApi'
import Practice from '../views/Practice.vue'
export default defineComponent({
  components:{
    LiveVideo,
    BettingArea,
    TableInfo,
    GameHistory,
    Counter,
    Practice
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
    //2.發送換桌請求
    //問題:重整時就不會觸動換桌請求
    watch([tableNum,tables],()=>{
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
    router.afterEach((to,from,next) => { //換桌時強制刷新-->可能不需要了!!因為Vue3資料會響應!!
      // router.go(0)
    })
    //倒數計時-->到時候通通讓counter自己決定就可以囉
    const roundCount = ref(0) //第幾回合-->到時候要computed
    function playCount () {
      roundCount.value++;
    }
    return{
      //data
      loginState,tableNum,roundCount,
      //methods
      playCount,
    }
  },
})
</script>
<style>
  .gem-main{
  display: flex;
  flex-wrap: wrap;
  }
  .gem-righ{
    clear: left;
    position: relative;
  }
  .countButton{
    position: absolute;
    top:10%;
    left:11%;
  }
  .counter{
    /* position: absolute; */
  }
</style>