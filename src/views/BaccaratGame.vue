<template>
  <div class="gem-main">
    <!-- <h1>{{tableNum}}</h1> -->
    <LiveCamara
    />
    <GameHistory/>
    <!-- <ameHistory/> -->
  <!-- <HelloWorld/> -->
  </div>
  <div class="gem-right">
      <BettingArea/>
      <TableInfo/>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import HelloWorld from '@/components/HelloWorld.vue';
import LiveCamara from '@/components/LiveCamara.vue';
import BettingArea from '@/components/BettingArea.vue';
import TableInfo from '@/components/TableInfo.vue';
import GameHistory from '@/components/GameHistory.vue';
import ameHistory from '@/components/ameHistory.vue'
import { ref } from '@vue/reactivity';
import { useRouter } from 'vue-router'
export default defineComponent({
  components:{
    HelloWorld,
    LiveCamara,
    BettingArea,
    TableInfo,
    GameHistory,
    ameHistory
  },
  setup(){
    //路由處理
    const router = useRouter()
    const tableNum = ref<any>(router.currentRoute.value.params.tableId) //取得桌號
    router.afterEach((to,from,next)=>{ //換桌時強制刷新
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