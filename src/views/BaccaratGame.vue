<template>
  <div class="mainGame">
    <Counter class="counter"
    />
      <LiveVideo/>
      <BettingArea/>
      <GameHistory/>
      <TableInfo/>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent,reactive,watch} from 'vue'
import LiveVideo from '@/components/LiveVideo.vue'
import BettingArea from '@/views/BettingArea.vue'
import TableInfo from '@/views/TableInfo.vue'
import GameHistory from '@/components/GameHistory.vue'
import Counter from '@/components/Counter.vue'
import {useRoute } from 'vue-router'
import {useStore} from 'vuex'
import {sendTableJoinCall} from '../socketApi'
export default defineComponent({
  components:{
    LiveVideo,
    BettingArea,
    TableInfo,
    GameHistory,
    Counter,
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
    //測試資料
    const tableRecall = reactive(computed(()=>{  //桌號uuid
      return store.state.table.TableJoinRecall
    }))
    watch(tableRecall,()=>{
      console.log("回應上桌資料:",tableRecall.value)
    })
    //先送一次tableJoinCall
    tableJoin()
    //監聽
    //2.發送換桌請求
    watch([tableNum],()=>{
      tableJoin()
    })
    function tableJoin (){
       switch(tableNum.value){
        case 'A':
          for(let i = 0 ; i<tables.value.tables.length ; i++){
            if(tables.value.tables[i].name=="A桌"){
              sendTableJoinCall({
                uri:"TableJoinCall",
                uuid:tables.value.tables[i].uuid
              })
              console.log(`請求${tableNum.value}桌`,"桌號:"+tables.value.tables[i].name,"uuid:"+tables.value.tables[i].uuid,"Loby資訊:",tables.value)
              break
            }
          }
          break
        case 'B':
           for(let i = 0 ; i<tables.value.tables.length ; i++){
            if(tables.value.tables[i].name=="B桌"){
              sendTableJoinCall({
                uri:"TableJoinCall",
                uuid:tables.value.tables[i].uuid
              })
              console.log(`請求${tableNum.value}桌`,"桌號:"+tables.value.tables[i].name,"uuid:"+tables.value.tables[i].uuid,"Loby資訊:",tables.value)
              break
            }
          }
      }
      // switch(tableNum.value){
      //   case 'A':
      //     sendTableJoinCall({
      //       uri:"TableJoinCall",
      //       uuid:tables.value.tables[0].uuid
      //     })
      //     console.log("請求A桌","桌號:"+tableNum.value,"uuid:"+tables.value.tables[0].uuid,"Loby資訊:",tables.value)
      //     break
      //   case 'B':
      //     sendTableJoinCall({
      //       uri:"TableJoinCall",
      //       uuid:tables.value.tables[1].uuid
      //     })
      //     console.log("請求B桌","桌號:"+tableNum.value,"uuid:"+tables.value.tables[0].uuid,"Loby資訊:"+tables.value)
      // }
    }
    
    return{
      //data
      tableNum,
      //methods
   
    }
  },
})
</script>