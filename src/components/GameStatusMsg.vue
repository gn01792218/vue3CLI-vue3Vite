<template>
    <div class="gameStatusMsg w-100 position-absolute" v-show="isWait==true">
        <p>{{stateMsg}}</p>
    </div>
</template>

<script lang="ts">
import {defineComponent,computed,ref,watch} from 'vue'
import { useStore } from 'vuex'
import {useRoute } from 'vue-router'
export default defineComponent({
   setup(){
        //vuex
        const store = useStore()
        const isWait = ref(true)
        const statusTimer = ref<number | null>(null)
        const stateMsg = ref("停止下注")
        const gameState = computed(()=>{  //上桌時會得到遊戲狀態，要播放現在是什麼狀態
            //1.下注狀態 2.開牌狀態 3.等待狀態
           return store.state.game.GameStatus
        })
        const gameUuid = computed(()=>{
            return store.state.game.gameUuid
        })
        const gameEndUuid = computed(()=>{
            return store.state.game.gameEndUuid
        })
        const gameResult = computed(()=>{ //回傳的是陣列
            return store.state.dealer.BroadcastGameResult.results
        })
        const gameEnd = computed(()=>{
            return store.state.dealer.end
        })
        const flyCardRecall = computed(()=>{
            return store.state.game.flyCardRecall
        })
        window.addEventListener('reConnect',()=>{
            isWait.value = true
            stateMsg.value = "網路不穩...重連中..."
        })
        window.addEventListener('connected',()=>{
            isWait.value = false
        })
        watch(gameEnd,()=>{ //換靴
                isWait.value = true
                stateMsg.value = "中場休息..."
        })
        //之後要監聽一個wait狀態，當有這個狀態的時候打開loading顯示等待中。
        watch(gameState,()=>{   //上桌時，接到遊戲狀態時要顯示文字
                switch(gameState.value.status){
                    case 1:
                        isWait.value = true
                        stateMsg.value = "下注中..."
                        statusTimer.value = setTimeout(()=>{
                        isWait.value = false
                        },500)
                        console.log('下注中')
                        break
                    case 2:
                        isWait.value = true
                        stateMsg.value = "開牌中..."
                        statusTimer.value = setTimeout(()=>{
                        isWait.value = false
                        },500)
                        break
                    case 3:
                        isWait.value = true
                        stateMsg.value = "等待新局..."
                        // setTimeout(()=>{
                        // isWait.value = false
                        // },500)
                        break
                    case 4:
                        isWait.value = true
                        stateMsg.value = "等待中..."
                        // setTimeout(()=>{
                        // isWait.value = false
                        // },500)
                        break
                }
        })
        watch(gameUuid,()=>{ //新回合開始的時候，要關閉顯示
            isWait.value = true
            switch(gameState.value){
                case 1:
                    stateMsg.value = "開始下注"
                    setTimeout(()=>{
                        isWait.value = false
                    },1000)
                    break
                case 2:
                    stateMsg.value = "開牌中..."
                    setTimeout(()=>{
                        isWait.value = false
                    },1000)
                    break
                case 3:
                    stateMsg.value = "請稍後..."
                    setTimeout(()=>{
                        isWait.value = false
                    },1000)
                    break
            }
        })
        watch(gameEndUuid,()=>{ //倒數結束時
        //最外層的if是暫時的
            isWait.value = true
            stateMsg.value = "停止下注"
        })
        watch(gameResult,()=>{  //公布結果時，關閉顯示
           //關閉loading效果 
           isWait.value = false
        })
        watch(flyCardRecall,()=>{
            clearTimeout(statusTimer.value as number)
            isWait.value = true
            stateMsg.value = "飛牌!"
        })
        return {
            //data
            isWait,stateMsg,
        }
    }
})
</script>