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
import {computed, defineComponent,onMounted,reactive,watch} from 'vue'
import LiveVideo from '@/components/LiveVideo.vue'
import BettingArea from '@/views/BettingArea.vue'
import TableInfo from '@/views/TableInfo.vue'
import GameHistory from '@/components/GameHistory.vue'
import Counter from '@/components/Counter.vue'
import {useRoute } from 'vue-router'
import {useStore} from 'vuex'
import {Socket} from '../webSocket'
import {sendTableJoinCall} from '../socketApi'
import table from '@/store/table'
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
    const tables = computed(()=>{  //桌號uuid
      return store.state.lobby.LobbyInfo.tables
    })
    //測試資料
    const tableRecall = reactive(computed(()=>{  //桌號uuid
      return store.state.table.TableJoinRecall
    }))
    watch(tableRecall,()=>{
      // console.log("回應上桌資料:",tableRecall.value)
    })
    //先送一次tableJoinCall
    onMounted(async()=>{
      // console.log("創建遊戲桌",tables.value)
      if(tables.value==undefined){
        alert('請關閉遊戲，重新登入遊戲')
      }
      let table = await tables
      //  if(tables.value){
        tableJoin()
      // }
    })
    // if(tables.value){
    //   tableJoin()
    // }
    //監聽
    // 2.發送換桌請求
    watch(tables,()=>{
      // console.log("有tables")
      tableJoin()
    })
    watch([tableNum],()=>{
      store.commit('table/setCurrentTable',tableNum.value)
      tableJoin()
    })
    window.addEventListener('reConnect',()=>{
      tableJoin ()
    }) 
    function tableJoin (){
       switch(tableNum.value){
        case 'A':
          for(let i = 0 ; i<tables.value.length ; i++){
            if(tables.value[i].name=="A桌"){
              sendTableJoinCall({
                uri:"TableJoinCall",
                uuid:tables.value[i].uuid
              })
              console.log(`請求${tableNum.value}桌`,"桌號:"+tables.value[i].name,"uuid:"+tables.value[i].uuid,"Loby資訊:",tables.value)
              break
            }
          }
          break
        case 'B':
          //  for(let i = 0 ; i<tables.value.length  ; i++){
          //   if(tables.value[i].name=="B桌"){
          //     sendTableJoinCall({
          //       uri:"TableJoinCall",
          //       uuid:tables.value[i].uuid
          //     })
          //     console.log(`請求${tableNum.value}桌`,"桌號:"+tables.value[i].name,"uuid:"+tables.value[i].uuid,"Loby資訊:",tables.value)
          //     break
          //   }
          // }
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