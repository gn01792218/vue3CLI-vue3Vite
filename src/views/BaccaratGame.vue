<template>
  <div class="gem-main">
    <!-- <h1>{{tableNum}}</h1> -->
    <LiveCamara
    />
    <GameHistory/>
    <HelloWorld/>
  </div>
  <div class="gem-right">
      <BettingArea/>
      <TableInfo/>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted,onUpdated,ref} from 'vue'
import HelloWorld from '@/components/HelloWorld.vue';
import LiveCamara from '@/components/LiveCamara.vue';
import BettingArea from '@/components/BettingArea.vue';
import TableInfo from '@/components/TableInfo.vue';
import GameHistory from '@/components/GameHistory.vue';
import { useRouter } from 'vue-router'
import {sendTableJoinCall} from '../socketApi'
export default defineComponent({
  components:{
    HelloWorld,
    LiveCamara,
    BettingArea,
    TableInfo,
    GameHistory,
  },
  setup(){
    //初始化
    onMounted(()=>{
      //根據路由顯示的桌號請求不同的數據
      if(tableNum.value){
        console.log("發送換桌請求")
        sendTableJoinCall({
          uri:"TableJoinCall",
          uuid:tableNum
        })
      }
    })
    //路由處理
    const router = useRouter()
    const tableNum = ref<any>(router.currentRoute.value.params.tableId) //取得桌號
    router.afterEach((to,from,next) => { //換桌時強制刷新-->可能不需要了!!!!因為Vue3資料會響應!!!
      router.go(0)
    })
    return{
      //data
      tableNum,
      //methods
      
    }
  },
})
</script>
<style scoped>
  .gem-righ{
    clear: left;
  }
</style>