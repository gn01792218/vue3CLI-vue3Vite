<template>
  <span>{{total}}</span>
</template>

<script lang="ts">
import {computed, defineComponent, ref, watch} from 'vue'
import {useStore} from 'vuex'
export default defineComponent({
    setup(){
        //vuex
        const store = useStore();
        const total = ref<number>(0)
        const totalBetInfo = computed({  //每次下注的時候都更新totalBet
            get(){
                return store.state.bet.totalBets
            },
            set(num:number){
                total.value = num
            }
            
        })
        const roundUuid = computed<number>(()=>{
            return store.state.game.gameUuid
        })
        // const roundStatus = computed<number>(()=>{
        //     return 0 as number
        // })
        //監聽
        watch(totalBetInfo,()=>{  
            total.value = totalBetInfo.value
        })
        watch(roundUuid,()=>{
            total.value = 0
        })
        // //監聽回合狀態
        // watch(roundStatus,()=>{ //當回合狀態變為停止下注時total也要規0
        //     switch(roundStatus.value){
        //         case 1:
        //             break
        //         case 2:
        //             total.value = 0
        //             break
        //     }
        // })
        return{
            //data
            total,totalBetInfo,
            //methods
        }
    }

})
</script>

<style>

</style>