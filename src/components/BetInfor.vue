<template>
	<div class="row betInfo-container">
    	<ul class="col-6 text-md-left">
        	<li class="font_red">莊家 52%</li>    
          	<li class="font_yellow">閒家 46%</li> 
          	<li class="font_green">和局 2%</li> 
          	<li class="font_red">莊對</li> 
          	<li class="font_yellow">閒對</li> 
         	  <!-- <li class="font_red">Banker Natural</li> 
          	<li class="font_yellow">Player Natural</li> -->
        </ul>
        <ul class="col-6 text-md-right" v-if="betInfo">
          <li v-for="(i,index) in betInfo" :key="index">{{i}}</li>
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
        return store.state.table.TableJoinRecall.table.betStatus
      })
    watch(betInfo,()=>{
      console.log(betInfo.value)
    })
    return {
      //data
      betInfo,
      //methods

    }
  }

})
</script>

<style>
</style>