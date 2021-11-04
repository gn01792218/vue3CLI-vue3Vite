<template>
  <div class="mainGame">
    <Counter class="counter"
  
    />
      <LiveVideo/>
      <BettingArea/>
      <GameHistory/>
      <TableInfo/>
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
import {useRoute } from 'vue-router'
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
    const route = useRoute()
    const tableNum = computed(()=>{
      return route.params.tableId
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
      console.log("發上桌請求")
      tableJoin()
    })
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
    
    return{
      //data
      tableNum,
      //methods
   
    }
  },
})
</script>