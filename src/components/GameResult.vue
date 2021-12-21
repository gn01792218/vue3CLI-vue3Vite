<template>
    <div class="gameResult w-100 position-absolute" v-if="hasGameResult">
        <!-- <section class="gameResult-title">
            <p v-if="isWait">等待遊戲結果...請稍後</p>
            <p v-else>遊戲結果</p>
        </section> -->
        <section class="gameResult-content">
            <!-- <GameResultLoading/> -->
            <p class="gainMoney"></p>
            <ul id="result">
            </ul>
        </section>
    </div>
</template>
<script lang="ts">
import {computed, defineComponent, ref, watch} from 'vue'
import {useStore} from 'vuex'
import {useRoute } from 'vue-router'
import proto from '../assets/js/bundle'
// import GameResultLoading from '@/components/GameResultLoading.vue'
export default defineComponent({
    components:{
        // GameResultLoading,
    },
    setup(){
        //暫時性的
        const route = useRoute()
        const tableNum = computed(()=>{
        return route.params.tableId
        })
        watch(tableNum,()=>{
            if(tableNum.value=="B"){
                hasGameResult.value = false
            }
        })
        //vuex
        const store = useStore()
        const gameResult = computed(()=>{ //回傳的是陣列
            return store.state.dealer.BroadcastGameResult.results
        })
        const winMoney = computed(()=>{ 
            return store.state.dealer.BroadcastGameResult.totalWin
        })
        const gameUuid = computed(()=>{
            return store.state.game.gameUuid
        })
        const gameEndUuid = computed(()=>{
            return store.state.game.gameEndUuid
        })
        const gameEnd = computed(()=>{
          return store.state.dealer.end
        })
        const gameState = computed(()=>{  //上桌時會得到遊戲狀態，要播放現在是什麼狀態
            //1.下注狀態 2.開牌狀態 3.等待狀態
           return store.state.game.GameStatus
        })
        //基本資料
        const hasGameResult = ref(false)
        watch(gameEnd,()=>{
            console.log('換薛時候要取消顯示輸贏')
            resetGameResult()
            hasGameResult.value = false
        })
        watch(gameUuid,()=>{
            resetGameResult()
            hasGameResult.value = false
        })
        watch(gameEndUuid,()=>{ //倒數結束打開遊戲結果
            console.log("停止下注")
            //最外層的if是暫時的
            if(tableNum.value=="A"){
                hasGameResult.value = true
            }
        })
        watch(gameResult,()=>{
            //依據不同的情況，添加不同的顏色class
            // if(gameResult.value){
            //最外層的是暫時的
            if(tableNum.value=="A"){
                console.log('伺服器遊戲結果',gameResult.value)
                showGameResult()
            }
            // }
        })
        function showGameResult () {
                // isWait.value = false //關閉Loading效果
                let result = document.querySelector('#result') as HTMLElement  //這是ul
                let gainMoney = document.querySelector('.gainMoney') as HTMLElement
                if(result){
                gameResult.value.forEach((i:any)=>{
                    switch(i){
                        case proto.dealer.Result.Banker:
                            let appendElement2 = document.createElement('LI') as HTMLElement
                            appendElement2.classList.add('font_yellow')
                            appendElement2.classList.add('result-text')
                            appendElement2.innerText="莊家贏"
                            result.appendChild(appendElement2)
                            break
                        case proto.dealer.Result.Player:
                            let appendElement3 = document.createElement('LI') as HTMLElement
                            appendElement3.classList.add('font_red')
                            appendElement3.classList.add('result-text')
                            appendElement3.innerText="閒家贏"
                            result.appendChild(appendElement3)
                            break
                        case proto.dealer.Result.BankerPair:
                            let appendElement4 = document.createElement('LI') as HTMLElement
                            appendElement4.classList.add('font_yellow')
                            appendElement4.classList.add('result-text')
                            appendElement4.innerText="莊對"
                            result.appendChild(appendElement4)
                            break
                        case proto.dealer.Result.Tie:
                            let appendElement1 = document.createElement('LI') as HTMLElement
                            appendElement1.classList.add('font_green')
                            appendElement1.classList.add('result-text')
                            appendElement1.innerText="和局"
                            result.appendChild(appendElement1)
                            break
                        case proto.dealer.Result.PlayerPair:
                            let appendElement5 = document.createElement('LI') as HTMLElement
                            appendElement5.classList.add('font_yellow')
                            appendElement5.classList.add('result-text')
                            appendElement5.innerText="閒對"
                            result.appendChild(appendElement5)
                            break
                    }
                    //    switch(i){
                    //     case 1:
                    //         let appendElement2 = document.createElement('LI') as HTMLElement
                    //         appendElement2.classList.add('font_yellow')
                    //         appendElement2.classList.add('result-text')
                    //         appendElement2.innerText="莊家贏"
                    //         result.appendChild(appendElement2)
                    //         break
                    //     case 2:
                    //         let appendElement3 = document.createElement('LI') as HTMLElement
                    //         appendElement3.classList.add('font_red')
                    //         appendElement3.classList.add('result-text')
                    //         appendElement3.innerText="閒家贏"
                    //         result.appendChild(appendElement3)
                    //         break
                    //     case 3:
                    //         let appendElement4 = document.createElement('LI') as HTMLElement
                    //         appendElement4.classList.add('font_yellow')
                    //         appendElement4.classList.add('result-text')
                    //         appendElement4.innerText="莊對"
                    //         result.appendChild(appendElement4)
                    //         break
                    //     case 4:
                    //         let appendElement1 = document.createElement('LI') as HTMLElement
                    //         appendElement1.classList.add('font_green')
                    //         appendElement1.classList.add('result-text')
                    //         appendElement1.innerText="和局"
                    //         result.appendChild(appendElement1)
                    //         break
                    //     case 5:
                    //         let appendElement5 = document.createElement('LI') as HTMLElement
                    //         appendElement5.classList.add('font_red')
                    //         appendElement5.classList.add('result-text')
                    //         appendElement5.innerText="閒對"
                    //         result.appendChild(appendElement5)
                    //         break
                    // }
                })
                if(winMoney.value!==0 &&  winMoney.value!==null) {
                     gainMoney.innerHTML = `贏得籌碼:${winMoney.value}`
                }
               }
        }
        function resetGameResult () {
            let result = document.querySelector('#result') as HTMLElement  //這是ul
            let gainMoney = document.querySelector('.gainMoney') as HTMLElement
            if(result){
                result.innerHTML = ""
                store.commit("dealer/resetGameResults")  //記得清空Vuex裡面的遊戲結果
            }
            if(gainMoney){
                gainMoney.innerHTML = ""
            }
        }
        return{
            //data
            hasGameResult,
        }
    }
})
</script>

<style>
  
</style>