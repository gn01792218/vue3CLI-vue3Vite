<template>
    <div class="gameResultLoading w-100 h-100" v-if="isWait">
        <p>{{stateMsg}}</p>
    </div>
</template>

<script lang="ts">
import {defineComponent,computed,ref,watch} from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
   setup(){
        const store = useStore()
        const isWait = ref(true)
        const stateMsg = ref("停止下注")
        const gameState = computed(()=>{  //上桌時會得到遊戲狀態，要播放現在是什麼狀態
            //1.下注狀態 2.開牌狀態 3.等待狀態
           return store.state.game.GameStatus
        })
        const gameEndUuid = computed(()=>{
            return store.state.game.gameEndUuid
        })
        const gameResult = computed(()=>{ //回傳的是陣列
            return store.state.dealer.BroadcastGameResult.results
        })
        //之後要監聽一個wait狀態，當有這個狀態的時候打開loading顯示等待中。
        
        watch(gameState,()=>{   //上桌時，接到遊戲狀態時要顯示文字
            switch(gameState.value.status){
                case 3:
                    isWait.value = true
                    stateMsg.value = "等待中..."
                    break
            }
        })
        watch(gameEndUuid,()=>{ //倒數結束時
            isWait.value = true
             stateMsg.value = "停止下注"
        })
         watch(gameResult,()=>{  //公布結果時，關閉顯示
           //關閉loading效果 
           isWait.value = false
        })
        return {
            //data
            isWait,stateMsg,
        }
    }
})
</script>