<template>
  <div class="gem-main">
    <LiveCamara
    />
  <button @click="printVuex">取得Vuex資料</button>
  <HelloWorld/>
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
import BettingArea from '@/components/BettingArea.vue'
import TableInfo from '@/components/TableInfo.vue'
import { computed, reactive, ref } from '@vue/reactivity';
import { useStore } from "vuex";  //為了把資料存到vuex的wsStore中
export default defineComponent({
  components:{
    HelloWorld,
    LiveCamara,
    BettingArea,
    TableInfo
  },
  setup(){
    const store = useStore() //先創建一個store
    const wsRes = computed(()=>{
     return store.state.wsStore.wsRes
    })
    const printVuex =()=>{
       console.log("Home中的computed",store.state.wsStore.wsRes)
       console.log(wsRes.value)
    }
    return{
      wsRes,
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