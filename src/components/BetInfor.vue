<template>
	<div class="row betInfo-container">
    	<ul class="col-6 text-md-left">
        <li class="font_red">莊家 : {{betInfo.banker}}</li>    
        <li class="font_yellow">閒家 : {{betInfo.player}}</li> 
        <li class="font_green">和局 : {{betInfo.tie}}</li> 
        <li class="font_red">莊對 : {{betInfo.bankerPair}}</li> 
        <li class="font_yellow">閒對 : {{betInfo.playerPair}}</li> 
        <li>總局數 : {{totalRound}}</li>
      </ul>
      <ul class="col-6 text-md-right" v-if="betInfo">
        <li class="font_red">{{Math.floor((betInfo.banker/totalRound)*100)}}%</li>    
        <li class="font_yellow">{{Math.floor((betInfo.player/totalRound)*100)}}%</li> 
        <li class="font_green">{{Math.floor((betInfo.tie/totalRound)*100)}}%</li> 
        <li class="font_red">{{Math.floor((betInfo.bankerPair/totalRound)*100)}}%</li> 
        <li class="font_yellow">{{Math.floor((betInfo.playerPair/totalRound)*100)}}%</li> 
      </ul>
  </div>
</template>

<script lang="ts">
import {defineComponent,computed, watch} from 'vue'
import {useStore} from 'vuex'
export default defineComponent({
  setup(){
    //vuex
    const store = useStore()
    const betInfo = computed(()=>{
      return store.state.game.gameResultCount
    })
    const totalRound = computed(()=>{
      return store.state.game.numOfRound-1
    })
    // watch(betInfo,()=>{
    //   console.log(betInfo.value)
    //   console.log(totalRound.value)
    // })
    return {
      //data
      betInfo,
      totalRound,
      //methods

    }
  }

})
</script>

<style>
</style>