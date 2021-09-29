<template>
  <div class="gem-main">
    <!-- <h1>{{tableNum}}</h1> -->
    <LiveCamara
    />
    <GameHistory/>
    <!-- <ameHistory/> -->
  <!-- <button @click="printVuex">取得Vuex資料</button> -->
  <!-- <HelloWorld/> -->
  </div>
  <div class="gem-right">
      <BettingArea/>
      <TableInfo/>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted} from 'vue'
import HelloWorld from '@/components/HelloWorld.vue';
import LiveCamara from '@/components/LiveCamara.vue';
import BettingArea from '@/components/BettingArea.vue';
import TableInfo from '@/components/TableInfo.vue';
import GameHistory from '@/components/GameHistory.vue';
// import ameHistory from '@/components/ameHistory.vue'
import { computed, reactive, ref } from '@vue/reactivity';
import { useStore } from "vuex";  //為了把資料存到vuex的wsStore中
import { useRouter } from 'vue-router'
export default defineComponent({
  components:{
    HelloWorld,
    LiveCamara,
    BettingArea,
    TableInfo,
    GameHistory,
    // ameHistory
  },
  setup(){
    //路由處理
    const router = useRouter()
    const tableNum = ref<any>(router.currentRoute.value.params.tableId) //取得桌號
    router.afterEach((to,from,next)=>{ //換桌時強制刷新
      router.go(0)
    })
    
    //Vuex資料處理
    const store = useStore() //先創建一個store
    const wsRes = computed(()=>{
     return store.state.wsStore.wsRes
    })
    const printVuex =()=>{
       console.log("Home中的computed",store.state.wsStore.wsRes)
       console.log(wsRes.value)
    }
    
    return{
      //data
      wsRes,tableNum,
      //methods
      printVuex,
      
    }
  },
  methods:{
    test(){
      this.printVuex();
    }
  }
})
</script>
<style scoped>
  /* .test{
    display: flex;
  } */
  .gem-righ{
    clear: left;
  }
</style>