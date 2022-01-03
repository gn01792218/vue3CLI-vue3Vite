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
          <li>莊家最小限注{{currentInfoData.bankerMin}}；最大限注{{currentInfoData.bankerMax}}</li>    
          <li>閒家最小限注{{currentInfoData.playerMin}}；最大限注{{currentInfoData.playerMax}}</li> 
          <li>和局最大限注{{currentInfoData.tieMax}}</li> 
          <li>莊對最大限注{{currentInfoData.pairMax}}</li> 
          <li>閒對最大限注{{currentInfoData.pairMax}}</li>
        </section>
        <section v-else>
          <li>莊家最小限注{{currentInfoData.bankerMin}}；最大限注{{currentInfoData.bankerMax}}</li>    
          <li>閒家最小限注{{currentInfoData.playerMin}}；最大限注{{currentInfoData.playerMax}}</li> 
          <li>和局最大限注{{currentInfoData.tieMax}}</li> 
          <li>莊對最大限注{{currentInfoData.pairMax}}</li> 
          <li>閒對最大限注{{currentInfoData.pairMax}}</li>
        </section>
        <!-- <section v-if="totalRound>0 && betInfo">
          <li>莊家最小限注2000；最大限注十萬</li>    
          <li>閒家最小限注2000；最大限注十萬</li> 
          <li>和局最大限注12500</li> 
          <li>莊對最大限注9000</li> 
          <li>閒對最大限注9000</li>
        </section>
        <section v-else>
          <li>莊家最小限注2000；最大限注十萬</li>    
          <li>閒家最小限注2000；最大限注十萬</li> 
          <li>和局最大限注12500</li> 
          <li>莊對最大限注9000</li> 
          <li>閒對最大限注9000</li>
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
          playerMin:'2000',
          playerMax:'10萬',
          bankerMin:'2000',
          bankerMax:'10萬',
          tieMin:'',
          tieMax:'12500',
          pairMin:'',
          pairMax:'9000',
        },
        'B':{  //暫時的
          playerMin:'2000',
          playerMax:'10萬',
          bankerMin:'2000',
          bankerMax:'10萬',
          tieMin:'',
          tieMax:'12500',
          pairMin:'',
          pairMax:'9000',
        }
        // 'B':{
        //   playerMin:'5000',
        //   playerMax:'30萬',
        //   bankerMin:'5000',
        //   bankerMax:'30萬',
        //   tieMin:'500',
        //   tieMax:'37500',
        //   pairMin:'500',
        //   pairMax:'27000',
        // }
    })
    // watch(betInfo,()=>{
    //   console.log(betInfo.value)
    //   console.log(totalRound.value)
    // })
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