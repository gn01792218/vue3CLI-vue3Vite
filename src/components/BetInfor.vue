<template>
	<div class="row betInfo-container">
    	<ul class="col-6 text-md-left">
        <section v-if="betInfo">
          <li class="font_red">莊家 : {{betInfo.banker}}</li>    
          <li class="font_yellow">閒家 : {{betInfo.player}}</li> 
          <li class="font_green">和局 : {{betInfo.tie}}</li> 
          <li class="font_red">莊對 : {{betInfo.bankerPair}}</li> 
          <li class="font_yellow">閒對 : {{betInfo.playerPair}}</li> 
          <li v-if="totalRound>0">總局數 : {{totalRound}}</li>
          <li v-else>總局數 : 0</li>
        </section>
        <section v-else>
          <li class="font_red">莊家 : 0</li>    
          <li class="font_yellow">閒家 : 0</li> 
          <li class="font_green">和局 : 0</li> 
          <li class="font_red">莊對 : 0</li> 
          <li class="font_yellow">閒對 : 0</li> 
          <li v-if="totalRound>0">總局數 : 0</li>
          <li v-else>總局數 : 0</li>
        </section>
        
      </ul>
      <ul class="col-6 text-md-right">
        <section v-if="totalRound>0 && betInfo">
          <li class="font_red">{{Math.floor((betInfo.banker/totalRound)*100)}}%</li>    
          <li class="font_yellow">{{Math.floor((betInfo.player/totalRound)*100)}}%</li> 
          <li class="font_green">{{Math.floor((betInfo.tie/totalRound)*100)}}%</li> 
          <li class="font_red">{{Math.floor((betInfo.bankerPair/totalRound)*100)}}%</li> 
          <li class="font_yellow">{{Math.floor((betInfo.playerPair/totalRound)*100)}}%</li> 
        </section>
        <section v-else>
          <li class="font_red">0%</li>    
          <li class="font_yellow">0%</li> 
          <li class="font_green">0%</li> 
          <li class="font_red">0%</li> 
          <li class="font_yellow">0%</li> 
        </section>
        
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