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
        <!-- v-if="totalRound>0 && betInfo" -->
        <section >
          <div class="d-flex">
             <li v-if="currentInfoData.bankerMin>0">莊家最小限注{{numberFormat(currentInfoData.bankerMin)}}；</li>  
             <li v-if="currentInfoData.bankerMax>0">最大限注{{numberFormat(currentInfoData.bankerMax)}}</li>  
          </div>
         <div class="d-flex">
           <li v-if="currentInfoData.playerMin>0">閒家最小限注{{numberFormat(currentInfoData.playerMin)}}；</li>  
           <li v-if="currentInfoData.playerMax>0">最大限注{{numberFormat(currentInfoData.playerMax)}}</li> 
         </div>
         <div class="d-flex">
           <li v-if="currentInfoData.tieMin>0">和局最小限注{{numberFormat(currentInfoData.tieMin)}};</li>  
           <li v-if="currentInfoData.tieMax>0">和局最大限注{{numberFormat(currentInfoData.tieMax)}}</li> 
         </div>
         <div class="d-flex">
           <li v-if="currentInfoData.pairMin>0">莊對最小限注{{numberFormat(currentInfoData.pairMin)}};</li>  
           <li v-if="currentInfoData.pairMax>0">莊對最大限注{{numberFormat(currentInfoData.pairMax)}}</li> 
         </div>
         <div class="d-flex">
           <li v-if="currentInfoData.pairMin>0">閒對最小限注{{numberFormat(currentInfoData.pairMin)}};</li>  
           <li v-if="currentInfoData.pairMax>0">閒對最大限注{{numberFormat(currentInfoData.pairMax)}}</li> 
         </div>
        </section>
        <!-- <section v-else>
          <li>莊家最小限注{{currentInfoData.bankerMin}}；最大限注{{currentInfoData.bankerMax}}</li>    
          <li>閒家最小限注{{currentInfoData.playerMin}}；最大限注{{currentInfoData.playerMax}}</li> 
          <li>和局最大限注{{currentInfoData.tieMax}}</li> 
          <li>莊對最大限注{{currentInfoData.pairMax}}</li> 
          <li>閒對最大限注{{currentInfoData.pairMax}}</li>
        </section> -->
      </ul>
  </div>
</template>

<script lang="ts">
import {defineComponent,computed, reactive, watch, onUnmounted} from 'vue'
import {useStore} from 'vuex'
import {useRoute } from 'vue-router'
export default defineComponent({
  setup(){
    const route = useRoute()
    const tableNum = computed(()=>{
      return route.params.tableId
    })
    //vuex
    const store = useStore()
    const betInfo = computed(()=>{
      return store.state.game.gameResultCount
    })
    const totalRound = computed(()=>{
      return store.state.game.numOfRound-1
    })
    const currentInfoData = computed(()=>{
      return tableInfoData[tableNum.value as string]
    })
    const tableInfoData = reactive<any>({
        'A':{
          playerMin:2000,
          playerMax:100000,
          bankerMin:2000,
          bankerMax:100000,
          tieMin:0,
          tieMax:12500,
          pairMin:0,
          pairMax:9000,
        },
        'B':{
          playerMin:5000,
          playerMax:300000,
          bankerMin:5000,
          bankerMax:300000,
          tieMin:500,
          tieMax:37500,
          pairMin:500,
          pairMax:27000,
        }
    })
    function numberFormat(number:number):string{
      return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1,')
    }
    return {
      //data
      betInfo,
      totalRound,
      currentInfoData,
      //methods
      numberFormat,
    }
  }

})
</script>

<style>
</style>