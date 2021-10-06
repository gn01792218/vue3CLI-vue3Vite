<template>
  <div class="gem-main">
    <!-- <h1>{{tableNum}}</h1> -->
    <LiveCamara
    />
    <Counter class="counter"
      :round ="roundCount"
      :countNum ="countSec"
    />
    <GameHistory/>
      <HelloWorld/>
      <button class="countButton" @click="playCount">開始倒數</button>
  </div>
  <div class="gem-right">
      <BettingArea/>
      <TableInfo/>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted,onUpdated,ref} from 'vue'
import HelloWorld from '@/components/HelloWorld.vue'
import LiveCamara from '@/components/LiveCamara.vue'
import BettingArea from '@/components/BettingArea.vue'
import TableInfo from '@/components/TableInfo.vue';
import GameHistory from '@/components/GameHistory.vue'
import Counter from '@/components/Counter.vue'
import { useRouter } from 'vue-router'
import {sendTableJoinCall} from '../socketApi'
export default defineComponent({
  components:{
    HelloWorld,
    LiveCamara,
    BettingArea,
    TableInfo,
    GameHistory,
    Counter,
  },
  setup(){
    //初始化
    onMounted(()=>{
      //根據路由顯示的桌號請求不同的數據
      if(tableNum.value){
        console.log("發送換桌請求")
        sendTableJoinCall({
          uri:"TableJoinCall",
          // uuid:tableNum
          uuid:router.currentRoute.value.params.tableId
        })
      }
    })
    //路由處理
    const router = useRouter()
    const tableNum = ref<any>(router.currentRoute.value.params.tableId) //取得桌號
    router.afterEach((to,from,next) => { //換桌時強制刷新-->可能不需要了!!!!因為Vue3資料會響應!!!
      router.go(0)
    })
    //倒數計時
    const roundCount = ref(0) //第幾回合
    const countSec = ref(13) //要倒數幾秒
    const playCount = ()=>{  //需要由serve傳送倒數指令才能啟動
      roundCount.value++;
      console.log("第"+roundCount.value+"回合倒數開始")
    }
    return{
      //data
      tableNum,roundCount,countSec,
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