<template>
	<div class="row betInfo-container">
    	<ul class="col-5 text-md-left">
        <section v-if="betInfo && totalRound>0">
          <li class="font_yellow">莊家 : {{betInfo.banker}}       ({{Math.floor((betInfo.banker/totalRound)*100)}}%)</li>    
          <li class="font_red">閒家 : {{betInfo.player}}       ({{Math.floor((betInfo.player/totalRound)*100)}}%)</li> 
          <li class="font_green">和局 : {{betInfo.tie}}       ({{Math.floor((betInfo.tie/totalRound)*100)}}%)</li> 
          <li class="font_yellow">莊對 : {{betInfo.bankerPair}}       ({{Math.floor((betInfo.bankerPair/totalRound)*100)}}%)</li> 
          <li class="font_red">閒對 : {{betInfo.playerPair}}       ({{Math.floor((betInfo.playerPair/totalRound)*100)}}%)</li> 
          <li v-if="totalRound>0">總局數 : {{totalRound}}</li>
          <li v-else>總局數 : 0</li>
        </section>
        <section v-else>
          <li class="font_yellow">莊家 : 0</li>    
          <li class="font_red">閒家 : 0</li> 
          <li class="font_green">和局 : 0</li> 
          <li class="font_yellow">莊對 : 0</li> 
          <li class="font_red">閒對 : 0</li> 
          <li v-if="totalRound>0">總局數 : 0</li>
          <li v-else>總局數 : 0</li>
        </section>
      </ul>
      <ul class="col-7 text-md-right">
        <BetLimitInfo
          :betLimitInfo="currentInfoData"
        />
      </ul>
  </div>
</template>

<script lang="ts">
import {defineComponent , computed ,reactive} from 'vue'
import {useStore} from 'vuex'
import {useRoute } from 'vue-router'
import BetLimitInfo from '@/components/BetLimtInfo.vue'
export default defineComponent({
  components:{
    BetLimitInfo,
  },
  setup(){
    //vuex
    const store = useStore()
    const betInfo = computed(()=>{
      return store.state.game.gameResultCount
    })
    const totalRound = computed(()=>{
      return store.state.game.numOfRound-1
    })
    const route = useRoute();
    const tableNum = computed(() => {
      return route.params.tableId;
    });
    const currentInfoData = computed(()=>{
      return tableInfoData[tableNum.value as string]
    })
    const tableInfoData = store.state.table.tableInfoData
    return {
      //data
      betInfo,
      totalRound,
      currentInfoData,
      //methods
    }
  }

})
</script>

<style>
</style>