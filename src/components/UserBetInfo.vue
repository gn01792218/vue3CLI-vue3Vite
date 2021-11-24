<template>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">玩家下注資訊</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <h2 class="modal-body"></h2>
                    <ul class="userBetInfo">
                        當前回合
                        <li>場次:{{userInfoArray[0].gameUuid}}</li>
                        <li>遊戲輸贏:{{userInfoArray[0].gameResult}}</li>
                        <li>贏得金錢:{{userInfoArray[0].gainMoney}}</li>
                        <li>下注:{{userInfoArray[0].totalBet}}</li>
                        ----------------------------------------------
                    </ul>
                    <ul class="userBetInfo">
                        <!-- <li>場次:{{gameUuid}}</li> -->
                        上一回合
                        <li>場次:{{userInfo.gameUuid}}</li>
                        <li>遊戲單:</li>
                        <li>時間:<Date/></li>
                        <div class="d-flex">
                            <ul class="userInfoBetResult">
                                <!-- <li>遊戲輸贏:{{gameResultText}}</li> -->
                                <li>遊戲輸贏:{{userInfo.gameResult}}</li>
                            </ul>
                        </div>
                        <!-- <li>贏得金錢:{{winMoney}}</li>
                        <li>下注:{{totalBet}}</li> -->
                        <li>贏得金錢:{{userInfo.gainMoney}}</li>
                        <li>下注:{{userInfo.totalBet}}</li>
                    </ul>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent,computed, ref, watch, reactive} from 'vue'
import {useStore} from 'vuex'
import Date from '@/components/Date.vue'
import proto from '../assets/js/bundle'
interface userInfo{
    gameUuid:string,
    time?:Date,
    gameResult:string,
    gainMoney:number,
    totalBet:number,
}
export default defineComponent({
    components:{
        Date
    },
    setup(){
        const store = useStore()
        const gameUuid = computed(()=>{
            return store.state.game.gameUuid
        })
        const gameResultText = ref()
        const userWinMoney = ref()
        const gameResultRecall = computed(()=>{ //回傳的是陣列
            return store.state.dealer.BroadcastGameResult.results
        })
        const winMoney = computed(()=>{
            return store.state.dealer.BroadcastGameResult.totalWin
        })
        const totalBet = computed(()=>{
            return store.state.bet.totalBets
        })
        const userInfoArray = reactive<userInfo[]>([{
            gameUuid:"初始化",
            gameResult:"",
            gainMoney:0,
            totalBet:0
        }])
        const userInfo = ref<userInfo>({
            gameUuid:"",
            gameResult:"",
            gainMoney:0,
            totalBet:0
        })
        watch(gameUuid,()=>{
            userInfo.value.gameUuid = gameUuid.value
            userInfoArray.push({
                gameUuid:gameUuid.value,
                gameResult:"",
                gainMoney:0,
                totalBet:0
            })
            userInfo.value = userInfoArray.shift() as userInfo
            resetUserInfo()  
        })
        watch(totalBet,()=>{
            userInfoArray[0].totalBet = totalBet.value
        })
        watch(gameResultRecall,()=>{
            if(userInfoArray[0])
            displayGameResult()
        })
        watch(winMoney,()=>{
            userInfoArray[0].gainMoney = winMoney.value
        })
        function displayGameResult () {
            gameResultRecall.value.forEach((i:any)=>{
                // switch(i){  //後端改好後用這個
                //         case proto.dealer.Result.Banker:
                //             gameResultText.value+="莊家 "
                //             break
                //         case proto.dealer.Result.Player:
                //            gameResultText.value+="閒家 "
                //             break
                //         case proto.dealer.Result.BankerPair:
                //             gameResultText.value+="莊對 "
                //             break
                //         case proto.dealer.Result.Tie:
                //             gameResultText.value+="和局 "
                //             break
                //         case proto.dealer.Result.PlayerPair:
                //             gameResultText.value+="閒對 "
                //             break
                // }
                if(i!==undefined){
                    switch(i){
                    case 2:
                        userInfoArray[0].gameResult+="莊家"
                        gameResultText.value+="莊家 "
                        break
                    case 1:
                        userInfoArray[0].gameResult+="閒家"
                        gameResultText.value+="閒家 "
                        break
                    case 5:
                        userInfoArray[0].gameResult+="莊對"
                        gameResultText.value+="莊對 "
                        break
                    case 4:
                        userInfoArray[0].gameResult+="和局"
                        gameResultText.value+="和局 "
                        break
                    case 3:
                        userInfoArray[0].gameResult+="閒對"
                        gameResultText.value+="閒對 "
                        break
                }
                }
                
            })
        }
        function resetUserInfo () {
            // userInfoArray.shift()  //把第一筆資料噴出去
            // gameResultText.value = ""
        }
        //  function showGameResult () {
        //     //   isWait.value = false //關閉Loading效果
        //         let result = document.querySelector('#userInfoBetResult') as HTMLElement  //這是ul
        //         let gainMoney = document.querySelector('.gainMoney') as HTMLElement
        //        if(result){
        //         gameResult.value.forEach((i:any)=>{
        //             switch(i){
        //                 case 1:
        //                     let appendElement2 = document.createElement('LI') as HTMLElement
        //                     appendElement2.classList.add('font_yellow')
        //                     appendElement2.classList.add('result-text')
        //                     appendElement2.innerText="莊家贏"
        //                     result.appendChild(appendElement2)
        //                     break
        //                 case 2:
        //                     let appendElement3 = document.createElement('LI') as HTMLElement
        //                     appendElement3.classList.add('font_red')
        //                     appendElement3.classList.add('result-text')
        //                     appendElement3.innerText="閒家贏"
        //                     result.appendChild(appendElement3)
        //                     break
        //                 case 3:
        //                     let appendElement4 = document.createElement('LI') as HTMLElement
        //                     appendElement4.classList.add('font_yellow')
        //                     appendElement4.classList.add('result-text')
        //                     appendElement4.innerText="莊對"
        //                     result.appendChild(appendElement4)
        //                     break
        //                 case 4:
        //                     let appendElement1 = document.createElement('LI') as HTMLElement
        //                     appendElement1.classList.add('font_green')
        //                     appendElement1.classList.add('result-text')
        //                     appendElement1.innerText="和局"
        //                     result.appendChild(appendElement1)
        //                     break
        //                 case 5:
        //                     let appendElement5 = document.createElement('LI') as HTMLElement
        //                     appendElement5.classList.add('font_yellow')
        //                     appendElement5.classList.add('result-text')
        //                     appendElement5.innerText="閒對"
        //                     result.appendChild(appendElement5)
        //                     break
        //             }
        //         })
        //         if(winMoney.value) {
        //              gainMoney.innerHTML = `贏得籌碼:${winMoney.value}`
        //         }
        //        }
        // }
        return{
            //data
            gameUuid,winMoney,gameResultText,totalBet,userInfoArray,userInfo
            //methods
        }
    }
})
</script>

<style>
.modal-header{
    background-color:#644d31;
}
.modal-body{
    color:black;
    text-align: center;
}
.userBetInfo{
    list-style: none;
    text-align: left;
}
.userInfoBetResult{

}
</style>