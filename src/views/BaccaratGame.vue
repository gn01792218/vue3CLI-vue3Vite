<template>
  <div class="mainGame">
    <Counter class="counter"
    />
      <LiveVideo/>
      <BettingArea/>
      <GameHistory/>
      <TableInfo/>
      <!-- Modal -->
    <div class="modal fade" id="alertModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">遊戲訊息</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            您已經連續五局沒有下注，若達10局無下注，將自動斷線
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
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
import {sendTableJoinCall} from '../socketApi'
import $ from "jquery";
export default defineComponent({
  components:{
    LiveVideo,
    BettingArea,
    TableInfo,
    GameHistory,
    Counter,
  },
  setup(){
    // onMounted(()=>{
    //   $('#alertModal').modal('show')   //測試範例
    // })
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
    // const tableRecall = reactive(computed(()=>{  //桌號uuid
    //   return store.state.table.TableJoinRecall
    // }))
    //測試用log
    // watch(tableRecall,()=>{
    //   // console.log("回應上桌資料:",tableRecall.value)
    // })
    //先送一次tableJoinCall
    onMounted(async()=>{
      // console.log("創建遊戲桌",tables.value)
      if(tables.value==undefined){
        alert('請關閉遊戲，重新登入遊戲')
      }
      let table = await tables
        tableJoin()
    })
    //監聽
    // 2.發送換桌請求
    // watch(tables,()=>{ //偵測到大廳給的桌子列表
    //   console.log("有tables")
    //   tableJoin()
    // })
    watch(tableNum,()=>{ //偵測到換桌
    // console.log('偵測到換桌')
      store.commit('table/setCurrentTable',tableNum.value)
      tableJoin()
    })
    window.addEventListener('reConnect',()=>{ //重新連接的時候
      // console.log('重連換桌')
      tableJoin ()
    }) 
    function tableJoin (){ //上桌請求
       switch(tableNum.value){
        case 'A':
          tables.value.find((i:any)=>{
            if(i.name=="A桌"){
              sendTableJoinCall({
                uuid:i.uuid
              })
              // console.log(`請求${tableNum.value}桌`,"桌號:"+i.name,"uuid:"+i.uuid,"Loby資訊:",tables.value)
            }
            return i.name == "A桌"
          })
          break
        case 'B':
          tables.value.find((i:any)=>{
            if(i.name=="B桌"){
              sendTableJoinCall({
                uuid:i.uuid
              })
              // console.log(`請求${tableNum.value}桌`,"桌號:"+i.name,"uuid:"+i.uuid,"Loby資訊:",tables.value)
            }
            return i.name == "B桌"
          })
          break
        case 'VIP':
          tables.value.find((i:any)=>{
            if(i.name=="VIP"){
              sendTableJoinCall({
                uuid:i.uuid
              })
              // console.log(`請求${tableNum.value}桌`,"桌號:"+i.name,"uuid:"+i.uuid,"Loby資訊:",tables.value)
            }
            return i.name == "VIP"
          })
          break
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