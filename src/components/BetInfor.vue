<template>
	<div class="row betInfo-container">
    	<ul class="col-6 text-md-left">
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
      <ul class="col-6 text-md-right">
        <section v-if="totalRound>0 && betInfo">
          <li>莊家最小限注2000；最大限注十萬</li>    
          <li>閒家最小限注2000；最大限注十萬</li> 
          <li>和局最大限注12500</li> 
          <li>莊對最大限注9000</li> 
          <li>閒對最大限注9000</li>
          <!-- <li class="font_yellow">{{Math.floor((betInfo.banker/totalRound)*100)}}%</li>    
          <li class="font_red">{{Math.floor((betInfo.player/totalRound)*100)}}%</li> 
          <li class="font_green">{{Math.floor((betInfo.tie/totalRound)*100)}}%</li> 
          <li class="font_yellow">{{Math.floor((betInfo.bankerPair/totalRound)*100)}}%</li> 
          <li class="font_red">{{Math.floor((betInfo.playerPair/totalRound)*100)}}%</li>  -->
        </section>
        <section v-else>
          <li>莊家最小限注2000；最大限注十萬</li>    
          <li>閒家最小限注2000；最大限注十萬</li> 
          <li>和局最大限注12500</li> 
          <li>莊對最大限注9000</li> 
          <li>閒對最大限注9000</li>
        </section>
      </ul>
  </div>
</template>

<script lang="ts">
import {defineComponent,computed} from 'vue'
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