<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <div class="liveCamara">
    <LiveCamara
      :url=url
      :width=width
      :height=height
    />
  </div>
  <button @click="printVuex">取得Vuex資料</button>
  <HelloWorld/>
  </div>
  <button type="button" @click="screenfull.toggle">全螢幕</button>
</template>

<script lang="ts">
import {defineComponent, onMounted} from 'vue'
import HelloWorld from '@/components/HelloWorld.vue';
import LiveCamara from '@/components/LiveCamara.vue'
import { computed, reactive, ref } from '@vue/reactivity';
// import Job from '../types/Job' 
import { useStore } from "vuex";  //為了把資料存到vuex的wsStore中
import screenfull from 'screenfull'
export default defineComponent({
  components:{
    HelloWorld,
    LiveCamara
  },
  setup(){
    const store = useStore() //先創建一個store
    const screen =ref(screenfull);
    const wsRes = computed(()=>{
     return store.state.wsStore.wsRes
    })
    const url=ref("假的網址") //視訊網址
    const width:number=700 //視訊寬
    const height:number=500 //視訊高
    const printVuex =()=>{
       console.log("Home中的computed",store.state.wsStore.wsRes)
       console.log(wsRes.value)
    }
    // const job=reactive<Job[]>([
    //   {title:'假資料1',location:"BBB",salary:3000,id:"1"},
    //   {title:'假資料2',location:"BBB",salary:3000,id:"1"}
    // ])
    return{
      url,
      width,
      height,
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
