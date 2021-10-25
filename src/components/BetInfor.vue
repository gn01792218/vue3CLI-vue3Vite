<template>
	<div class="row">
    	<ul class="betInfor col-6 text-md-left">
        	<li class="font_red">Banker 52%</li>    
          	<li class="font_yellow">Player 46%</li> 
          	<li class="font_green">Tie 2%</li> 
          	<li class="font_red">Banker Pair</li> 
          	<li class="font_yellow">Player Pair</li> 
         	<li class="font_red">Banker Natural</li> 
          	<li class="font_yellow">Player Natural</li>
        </ul>
        <ul class="betInfor col-6 text-md-right" v-if="betInfo">
          <li v-for="(i,index) in betInfo" :key="index">{{i}}</li>
        </ul>
      </div>
</template>

<script>
import {defineComponent,computed} from 'vue'
import {useStore} from 'vuex'
export default defineComponent({
  setup(){
    //vuex
     const store = useStore()
     const betInfo = computed(()=>{
        return store.state.table.TableJoinRecall.table.betStatus
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
.betInfor{
  list-style: none;
}
</style>