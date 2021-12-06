<template>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title userBetInfoTitle" id="exampleModalLabel">玩家下注資訊</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <!-- <h2 class="modal-body"></h2> -->
                    <!-- <ul class="userBetInfo">
                        當前回合
                        <li>場次:{{userInfoArray[0].gameUuid}}</li>
                        <li>遊戲輸贏:{{userInfoArray[0].gameResult}}</li>
                        <li>贏得金錢:{{userInfoArray[0].gainMoney}}</li>
                        <li>下注:{{userInfoArray[0].totalBet}}</li>
                        ----------------------------------------------
                    </ul> -->
                    <!-- 日期 時間 靴號 局號 下注 輸贏 牌局結果 -->
                    <ul class="userBetInfo-ul list-group list-group-horizontal">
                        <li class="userBetInfo-title list-group-item">靴號</li>
                        <li class="userBetInfo-content list-group-item">{{userInfo.gameUuid}}</li>
                    </ul>
                    <ul class="userBetInfo-ul list-group list-group-horizontal">
                        <li class="userBetInfo-title list-group-item">遊戲局號</li>
                        <li class="userBetInfo-content list-group-item">{{numOfround}}</li>
                    </ul>
                    <ul class="userBetInfo-ul list-group list-group-horizontal">
                        <li class="userBetInfo-title list-group-item">時間</li>
                        <li class="userBetInfo-content list-group-item"><Date/></li>
                    </ul>
                    <ul class="userBetInfo-ul list-group list-group-horizontal">
                        <li class="userBetInfo-title list-group-item">遊戲輸贏</li>
                        <li class="userBetInfo-content list-group-item">{{userInfo.gameResult}}</li>
                    </ul>
                    <ul class="userBetInfo-ul list-group list-group-horizontal">
                        <li class="userBetInfo-title list-group-item">贏得金錢</li>
                        <li class="userBetInfo-content list-group-item">{{userInfo.gainMoney}}</li>
                    </ul>
                    <ul class="userBetInfo-ul list-group list-group-horizontal">
                        <li class="userBetInfo-title list-group-item">下注</li>
                        <li class="userBetInfo-content list-group-item">{{userInfo.totalBet}}</li>
                    </ul>
                    <!-- <ul class="userBetInfo">
                        上一回合
                        <li>場次:{{userInfo.gameUuid}}</li>
                        <li>遊戲單:</li>
                        <li>時間:<Date/></li>
                        <div class="d-flex">
                            <ul class="userInfoBetResult">
                                <li>遊戲輸贏:{{userInfo.gameResult}}</li>
                            </ul>
                        </div>
                        <li>贏得金錢:{{userInfo.gainMoney}}</li>
                        <li>下注:{{userInfo.totalBet}}</li>
                    </ul> -->
                </div>
                <div class="userBetInfo-footer modal-footer">
                    <nav aria-label="Page navigation example">
                        <ul class="pagination pagination-sm">
                            <li class="page-item disabled">
                            <a class="page-link" href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                            </li>
                            <li class="page-item" 
                            :class="{'active':index==currentPagination}" @click="currentPagination=index" v-for="index in 3" :key="index">
                                <a class="page-link" href="#"> {{index}}</a>
                            </li>
                            <!-- <li class="page-item"><a class="page-link" href="#">1</a></li>
                            <li class="page-item"><a class="page-link" href="#">2</a></li>
                            <li class="page-item"><a class="page-link" href="#">3</a></li> -->
                            <li class="page-item">
                            <a class="page-link" href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                            </li>
                        </ul>
                    </nav>
                    <!-- <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> -->
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
        const numOfround = computed(()=>{
            return store.state.game.numOfRound
        })
        const numOfShoe = computed(()=>{
            return store.state.game.numOfShoe
        })
        const gameResultText = ref()
        const userWinMoney = ref()
        const currentPagination = ref(0)
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
        return{
            //data
            gameUuid,
            winMoney,
            gameResultText,
            totalBet,
            userInfoArray,
            userInfo,
            currentPagination,
            numOfround,
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