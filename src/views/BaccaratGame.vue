<template>
  <div class="mainGame">
    <Counter class="counter"
      :round ="roundCount"
    />
      <LiveVideo/>
      <BettingArea/>
      <GameHistory/>
      <TableInfo/>
    <button class="countButton position-absolute" @click="playCount">開始倒數</button>
  </div>
  <!-- <Practice/> -->
</template>

<script lang="ts">
import {computed, defineComponent,reactive,ref, watch} from 'vue'
import LiveVideo from '@/components/LiveVideo.vue'
import BettingArea from '@/views/BettingArea.vue'
import TableInfo from '@/views/TableInfo.vue'
import GameHistory from '@/components/GameHistory.vue'
import Counter from '@/components/Counter.vue'
import { useRouter } from 'vue-router'
import {useStore} from 'vuex'
import {sendTableJoinCall} from '../socketApi'
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
    
    //路由處理，取得當前桌號
    const router = useRouter()
    const tableNum = computed(()=>{
      return router.currentRoute.value.params.tableId
    })
    //vuex資料
    const store = useStore()
    const tables = reactive(computed(()=>{  //桌號uuid
      return store.state.lobby.LobbyInfo
    }))
    //先送一次tableJoinCall
    tableJoin()
    //監聽
    //2.發送換桌請求
    watch([tableNum,tables],()=>{
      tableJoin()
    })
    //倒數計時-->到時候通通讓counter自己決定就可以囉
    const roundCount = ref(0) //第幾回合-->到時候要computed
    function tableJoin (){
      switch(tableNum.value){
        case 'A':
          sendTableJoinCall({
            uri:"TableJoinCall",
            uuid:tables.value.tables[0].uuid
          })
          console.log("上桌請求",tables.value.tables[0].uuid)
          break
        case 'B':
          sendTableJoinCall({
            uri:"TableJoinCall",
            uuid:tables.value.tables[1].uuid
          })
          console.log("上桌請求",tables.value.tables[1].uuid)
      }
    }
    function playCount () {
      roundCount.value++;
    }
    return{
      //data
      tableNum,roundCount,
      //methods
      playCount,
    }
  },
})
</script>
<style>
/* 測試時使用，之後刪除 */
  .countButton{
    top:10%;
    left:11%;
  }
</style>