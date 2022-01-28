<template>
    <GameresultSound/>
    <div class="betArea">
        <!-- PC版本注區 -->
        <div class="betArea-pc position-relative">
            <GameResultLoading/>
            <ul class="betInfortext-ul position-absolute">
                <transition-group @enter="betErrorAnimation">
                    <li v-for="(betErr,index) in betErrorArray" :key="index">{{betErr}}</li>
                </transition-group>
                <li id="betConfirm">確認下注!!</li>
                <li id="cancleBet">取消下注!!</li>
            </ul>
                <div class="betArea-pc-container">
                    <div :class ="[`betArea-item${index+1}`,i.configClass,'col-6 d-flex flex-column justify-content-around']" v-for ="(i,index) in coinPosition.slice(0,2)" :key ="index" @click ="sendBetData($event,index)" >
                        <div class="betArea-item-top position-absolute d-flex flex-column">
                            <span>{{i.host}}</span>
                            <span class="betRatioText">{{i.odds}}</span>
                        </div>
                        <div class="betArea-item-bottom position-absolute">
                            <p class="betStatus" v-show="i.betStatus>0">{{i.betStatus}}</p>
                            <!-- <p class="table-total-betStatus">總注額:{{i.tableAllPlayerBetStatus}}</p> -->
                        </div>
                        <ul class="coinPosition">
                            <transition-group  @enter="generateCoinAnimate">
                                <li v-for="(coin,index)  in i.coinArray" :key="index" :class="[coin,`index${index}`]"></li>
                            </transition-group>
                        </ul>
                    </div>
                </div>  
                <div class="betArea-pc-container">
                    <div :class="[`betArea-item${index+3}`,i.configClass,'col-4 d-flex flex-column justify-content-center']" v-for="(i,index) in coinPosition.slice(2,coinPosition.length)" :key="index" @click="sendBetData($event,index+2)" >
                        <div class="betArea-item-top position-absolute d-flex flex-column">
                            <span>{{i.host}}</span>
                            <span class="betRatioText">{{i.odds}}</span>
                        </div>
                        <div class="betArea-item-bottom position-absolute">
                            <p class="betStatus" v-show="i.betStatus>0">{{i.betStatus}}</p>
                            <!-- <p class="table-total-betStatus">總注額:{{i.tableAllPlayerBetStatus}}</p> -->
                        </div>
                        <ul class="coinPosition">
                            <transition-group @enter="generateCoinAnimate">
                                <li v-for="(coin,index)  in i.coinArray" :key="index" :class="[coin,`index${index}`]"></li>
                            </transition-group>
                        </ul>
                    </div>
                </div>
        </div>
        <!-- mobile注區 -->
        <div class="betArea-mobile position-relative">
            <GameResultLoading/>
            <ul class="betError position-absolute">
                <transition-group @enter="betErrorAnimation">
                    <li v-for="(betErr,index) in betErrorArray" :key="index">{{betErr}}</li>
                </transition-group>
                <li id="betConfirm">確認下注!!</li>
                <li id="cancleBet">取消下注!!</li>
            </ul>
            <div class="betArea-mobile-container d-flex">
                <div :class ="[`betArea-item${index+1}`,i.configClass,{'col-6':index===0 | index===1},{'col-4':index!==0 | index!==1},'d-flex flex-column justify-content-center']" v-for ="(i,index) in coinPosition" :key ="index" @click ="sendBetData($event,index)" >
                    <div class="betArea-item-top position-absolute d-flex flex-column">
                        <span>{{i.host}}</span>
                        <span class="betRatioText">{{i.odds}}</span>
                    </div>
                    <div class="betArea-item-bottom position-absolute">
                        <p class="betStatus" v-show="i.betStatus>0">{{i.betStatus}}</p>
                        <!-- <p class="table-total-betStatus">總注額:{{i.tableAllPlayerBetStatus}}</p> -->
                    </div>
                    <ul class="coinPosition">
                        <transition-group  @enter="generateCoinAnimate">
                            <li v-for="(coin,index)  in i.coinArray" :key="index" :class="[coin,`index${index}`]"></li>
                        </transition-group>
                    </ul>
                </div>
            </div>
        </div>
        <!-- total Bet -->
        <div class="bettingArea-betInfo em font-total">
            <p id="totalBet" class="d-none d-lg-block">本次注額{{total}}</p>
            <ul class="d-block d-lg-none">
                <section class="d-flex" v-if="betInfo">
                    <li class="mobilTableInfo font_yellow">莊家 : {{betInfo.banker}}</li>    
                    <li class="mobilTableInfo font_red">閒家 : {{betInfo.player}}</li> 
                    <li class="mobilTableInfo font_green">和局 : {{betInfo.tie}}</li> 
                    <li class="mobilTableInfo font_yellow">莊對 : {{betInfo.bankerPair}}</li> 
                    <li class="mobilTableInfo font_red">閒對 : {{betInfo.playerPair}}</li> 
                    <!-- <li v-if="totalRound>0">總局數 : {{totalRound}}</li> -->
                </section>
                <section class="d-flex" v-else>
                    <li class="mobilTableInfo font_yellow">莊家 : 0</li>    
                    <li class="mobilTableInfo font_red">閒家 : 0</li> 
                    <li class="mobilTableInfo font_green">和局 : 0</li> 
                    <li class="mobilTableInfo font_yellow">莊對 : 0</li> 
                    <li class="mobilTableInfo font_red">閒對 : 0</li> 
                    <!-- <li v-if="totalRound>0">總局數 : 0</li> -->
                </section>
            </ul>
        </div>
        <!-- coin -->
        <div class="coinArea position-relative">
            <LightBox/>
            <!-- coin list -->
            <div :id='`defaultCoin${index+1}`' v-for="(coin,index) in coinList" :key="index"  
            :class="[coin.point===currentCoint.point ? `coin-${coin.point}-current` :'',`coin-${coin.point}`]" 
            @click="chooseCoint(index,$event)"></div>
            <!-- coin ammo -->
            <ul class="shotCoinUl d-flex position-absolute">
                <div v-for="coin,index in coinList" :key="index">
                    <transition-group  v-if="coin.ammo.length>=0" @enter="cointAnimate">
                        <div :class="[ammo,'shotCoinPice',`ammo${coin.num}`]" v-for="(ammo,index) in coin.ammo" :key="index"></div>
                    </transition-group>
                </div>
            </ul>
        </div>
        <div class="bettingArea-btn d-flex justify-content-between align-items-center p-2 position-relative">
            <LightBox/>
            <div class="bettingArea-btn-left d-flex justify-content-around align-items-center">
                <div class="bettingArea-btn-gitbackAllCoin d-flex justify-content-center align-items-center" @click="getAllBetBack"><i class="bi bi-arrow-counterclockwise"></i>取消</div>
                <div class="d-flex">
                    <div class="bettingArea-btn-betInfo d-xl-none d-flex align-items-center p-1 pl-2 pr-2 mr-1">
                        <span>{{numberFormat(minBetLimit)}}-<br>{{numberFormat(maxBetLimit)}}</span>
                        <!-- <span>在線10000人</span> -->
                    </div>
                    <!-- <div class="bettingArea-btn-betInfo d-xl-none d-flex align-items-center p-1 pl-2 pr-2">
                        <span>在線<br>{{onlinePlayersNumber}}人</span>
                    </div> -->
                </div>
                
              <div class="bettingArea-btn-check d-flex justify-content-center align-items-center" @click="sendConfirmBetCall"><i class="bi bi-check-circle"></i>確定</div>
            </div>
            <div class="askRoad d-flex">
                <div class="askRoad-player p-1 mr-2" @click="askRoad(2)">
                    <p>閒問路</p>
                    <div class="d-flex justify-content-around p-1">
                        <div id="bigEyeRoad-2" ></div>
                        <div id="smallRoad-2" ></div>
                        <div id="cockroachRoad-2" ></div> 
                    </div>
                </div>
                <div class="askRoad-banker p-1" @click="askRoad(1)">
                    <p>莊問路</p>
                    <div class="d-flex justify-content-around p-1">
                        <div id="bigEyeRoad-1"></div>
                        <div id="smallRoad-1"></div>
                        <div id="cockroachRoad-1"></div>
                    </div>
                </div>
            </div>
        </div>
        <GameResult/>
    </div>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, reactive, ref, watch} from 'vue'
import GameResult from '@/components/GameResult.vue'
import GameresultSound from '@/components/GameResultSound.vue'
import GameResultLoading from '@/components/GameResultLoading.vue'
import LightBox from '@/components/LightBox.vue'
import {gsap,Power4} from 'gsap'
import {sendBetCall,sendBetResetCall,sendAskRoadCall,sendBetConfirmCall} from '../socketApi'
import {useStore} from 'vuex'
import {useRoute } from 'vue-router'
import proto from '../assets/js/bundle'
interface currentCoint {
    coinElement:any | null , //選擇的籌碼div元素
    num:number | null,  //儲存點到的是第幾個
    point:number,
    x:number, //起飛的x
    y:number, //起飛的y
}
interface target {
    x : number,
    y : number,
}
// interface coint {
//   point:number,
//   ammo:string[],
//   num:number,
// }
interface coinPosition {
    initBottom:number,  //初始化的bottom值
    initX:number, //水平初始位置
    coinArray:string[],//生籌碼的地方
    odds:string,
    host:string,
    configClass:string,
    betStatus:number //目前這一回合的下注狀況
    tableAllPlayerBetStatus:number,
    maxBet:number //最大限注
}
export default defineComponent({
    components:{
        GameResult,GameresultSound,GameResultLoading,LightBox,
    },
    setup(){
        //初始化
        onMounted(()=>{
            //初始化籌碼
            setDefaultCoin()
            //初始化注區的最大最小檯紅(給手機顯示用的)
            getBetLimit(tableInfoData.value)
            //設置取消紐的顏色
            setCancleBetBtnColor()
            // setMinBetCoinUnusable()
        })
        //路由
        const route = useRoute()
        const tableNum = computed(()=>{  //當前桌號
            return route.params.tableId
        })
        //vuex資料
        const store = useStore();
        const user = computed(()=>{
            return store.state.auth.UserInfo.user
        })
        const betStatus = computed(()=>{  //玩家在各注區的下注額
            return store.state.bet.betstatus
        })
        const broadcastBetstatus = computed(()=>{ //此桌所有玩家的下注額
            return store.state.bet.BroadcastBetstatus
        })
        const betCallArray = computed(()=>{  //換桌時，server會回傳此桌的歷史下注資訊(哪個注區下了多少某種籌碼)
            return store.state.bet.BetRecall.betCall   //回傳陣列
        })
        const betResult = computed(()=>{ //下注成功否的狀態
            return store.state.bet.BetRecall.result
        })
        const betResetresult = computed(()=>{ //取消下注成功與否
            return store.state.bet.BetResetRecall.result
        })
        const betConfirmRecall = computed(()=>{ //確認下注成功與否
            return store.state.bet.BetConfirmRecall
        })
        const betError = computed(()=>{ //錯誤訊息
            return store.state.bet.BetRecall.betError
        })
        const roundUuid = computed(()=>{ //遊戲回合的Uuid
            return store.state.game.gameUuid
        })
        const gameResult = computed(()=>{ //回傳的是陣列
            return store.state.dealer.BroadcastGameResult.results
        })
        const gameStatus = computed(()=>{ //遊戲狀態 1.下注中 2.開牌中 3.等待中
            return store.state.game.GameStatus.status
        })
        const betInfo = computed(()=>{  //莊家閒家等輸贏次數統計數字
            return store.state.game.gameResultCount
        })
        const total = computed(()=>{ //玩家此局的總下注額
            return store.state.bet.totalBets
        })
        const gameEnd = computed(()=>{  //換靴
            return store.state.dealer.end
        })
        const gameEndUuid = computed(()=>{ //下注結束
            return store.state.game.gameEndUuid
        })
        const askRoadRecall = computed(()=>{ //問路recall
          return store.state.roadmap.askRoadReCall
        })
        const roundAskBanker = computed(()=>{ //回合自動問莊的recall
            return store.state.game.askBankByRoundStart
        }) 
        const roundAskPlayer = computed(()=>{ //回合自動問閒的recall
            return store.state.game.askPlayerByRoundStart
        })
        const isConfirmed = computed(()=>{ //確認鈕狀態
            return store.state.bet.isConfirmed
        })
        const coinList = computed(()=>{ //該桌籌碼陣列
            return store.state.table.tableCoinData[tableNum.value as string]
        })
        const tableInfoData = computed(()=>{  //該桌檯桌資訊
            return store.state.table.tableInfoData[tableNum.value as string]
        })
        const onlinePlayersNumber = computed(()=>{ //在線人數
          return store.state.lobby.BroadcastTotalPlayersOnline.numberOfPlayers
        })
        //基本資料
        const canBet = ref(true)  //是否可以下注
        const betCallTemp = ref({}) //發送betCall時紀錄哪個注區、下了哪種coin的暫存資料
        let betArray = reactive<Array<any>>([]) //紀錄下注元素和區域的籌碼動畫陣列
        const currentAskRoadSide = ref(0) //當前問的是哪一家的路(1莊 2閒)
        const currentCoint = reactive<currentCoint>({  //玩家選擇的籌碼
            coinElement:document.querySelector('#defaultCoin4'), //選擇的籌碼元素
            num:3,  //儲存點到的是第幾個
            point:coinList.value[3].point, //預設是100點ㄉ
            x:0, //起飛的x
            y:0, //起飛的y
        });  
        const currentBetPosition = reactive({  //玩家選擇的注區
            betAreaIndex:-1,
        })
        const target = reactive<target>({ //籌碼飛向的目標位置
            x : 0,
            y : 0,
        })
        const coinPosition = reactive<coinPosition[]>([   //注區Data
            {
                initBottom:0,
                initX:0,
                coinArray:[],
                odds:"1:1",
                host:"閒",
                configClass:"betArea-item red alertFont",
                betStatus:0,
                tableAllPlayerBetStatus:0,
                maxBet:100000, //目前這一回合的下注狀況
            },
            {
                initBottom:0,  //初始化的bottom值
                initX:0,
                coinArray:[],//生籌碼的地方
                odds:"1:0.95",
                host:"莊",
                configClass:"betArea-item yellow alertFont",
                betStatus:0, //目前這一回合的下注狀況
                tableAllPlayerBetStatus:0,
                maxBet:100000,
            },
             {
                initBottom:0,
                initX:0,
                coinArray:[],
                odds:"1:11",
                host:"閒對",
                configClass:"betArea-item red",
                betStatus:0, //目前這一回合的下注狀況
                tableAllPlayerBetStatus:0,
                maxBet:9000,
            },
            {
                initBottom:0,
                initX:0,
                coinArray:[],
                odds:"1:8",
                host:"和",
                configClass:"betArea-item green alertFont",
                betStatus:0, //目前這一回合的下注狀況
                tableAllPlayerBetStatus:0,
                maxBet:12500,
            },
            {
                initBottom:0,
                initX:0,
                coinArray:[],
                odds:"1:11",
                host:"莊對",
                configClass:"betArea-item yellow",
                betStatus:0, //目前這一回合的下注狀況
                tableAllPlayerBetStatus:0,
                maxBet:9000,
            },
        ]) 
        const betErrorArray = ref<Array<string>>([])  //噴錯誤訊息用的陣列
        const minBetLimit = ref(999999999) //手機版本顯示檯紅最小
        const maxBetLimit = ref(-1) //手機版本顯示檯紅最大
        //監聽
        watch(tableNum,()=>{  //換桌
            //重置遊戲相關
            reSetBetAreaAnimation()
            resetGame()
            setDefaultCoin()
            //取得注區的最大最小檯紅(給手機顯示用的)
            getBetLimit(tableInfoData.value)
        })
        watch(betConfirmRecall,()=>{ //收到server回應的確認下注，做確認鈕動作
             confirmBet()
        })
        watch(isConfirmed,()=>{ //根據是否按過確認鍵，更換相關顏色
            setBetStatusTextColor() 
            setConfirmBtnColor()
            setCancleBetBtnColor()
        })
        watch(betResetresult,()=>{  //玩家反悔收回籌碼的動作
            if(betResetresult.value===1){
                resetGame()
            }
        })
        watch(roundAskBanker,()=>{ //每局開始時自動問莊
            // console.log('回合莊問路',roundAskBanker.value.askRoadCall.block.symbol,roundAskBanker.value)
            changeAskRoadBtnView(roundAskBanker.value.askRoadCall.block.symbol,roundAskBanker.value)
        })
        watch(roundAskPlayer,()=>{  //每局開始時自動問閒
            // console.log('回合閒問路',roundAskPlayer.value.askRoadCall.block.symbol,roundAskPlayer.value)
            changeAskRoadBtnView(roundAskPlayer.value.askRoadCall.block.symbol,roundAskPlayer.value)
        })
        watch(askRoadRecall,()=>{ //玩家點擊問路
            // console.log('按鈕問路reCall','問哪一路',currentAskRoadSide.value,'問路結果',askRoadRecall.value)
            changeAskRoadBtnView(currentAskRoadSide.value,askRoadRecall.value)
        })
        watch(betStatus,()=>{  //更新每次下注後顯示在注區的數字
            if(betResult.value!==-1 && betStatus.value){ 
                coinPosition[0].betStatus = betStatus.value.Player
                coinPosition[1].betStatus = betStatus.value.Banker
                coinPosition[2].betStatus = betStatus.value.PlayerPair
                coinPosition[3].betStatus = betStatus.value.Tie
                coinPosition[4].betStatus = betStatus.value.BankerPair
                // for(let i = 0 ; i<5 ;i++){
                //     console.log(coinPosition[i].betStatus)
                // }
            }   
        })
        watch(broadcastBetstatus,()=>{ //更新該桌的所有玩家總注額
            coinPosition[0].tableAllPlayerBetStatus = broadcastBetstatus.value.Player
            coinPosition[1].tableAllPlayerBetStatus = broadcastBetstatus.value.Banker
            coinPosition[2].tableAllPlayerBetStatus = broadcastBetstatus.value.PlayerPair
            coinPosition[3].tableAllPlayerBetStatus = broadcastBetstatus.value.Tie
            coinPosition[4].tableAllPlayerBetStatus = broadcastBetstatus.value.BankerPair
        })
        watch(gameEnd,()=>{ //換靴時也要重置，並且無法下注
            // console.log("換靴重置BettingArear")
            reSetBetAreaAnimation()
            resetGame()
            canBet.value = false
        })
        watch(roundUuid,()=>{  //回合開始時重置遊戲；也可能是換桌
            reSetBetAreaAnimation()
            resetGame()
        })
        watch(gameEndUuid,()=>{ //停止下注，在開牌之前
            canBet.value = false
        })
        watch(betError,()=>{ //更新錯誤訊息
            if(betError.value){
                // console.log('進到-1',betError.value.error)
                switch(betError.value.error){
                    case 1:
                        betErrorArray.value?.push('下注失敗')
                        break
                    case 2:
                        betErrorArray.value?.push('非法的籌碼')
                        break
                    case 3:
                        betErrorArray.value?.push(betError.value.errorMessage)
                        break
                    case 4:
                        betErrorArray.value?.push(betError.value.errorMessage)
                        break
                    case 5:
                        betErrorArray.value?.push('非法遊戲局')
                        break
                    case 6:
                        betErrorArray.value?.push('餘額不足')
                        break
                }
                store.commit('bet/resetBetResult') //重置result狀態
            } 
        })
        watch(betResult,()=>{  //偵測伺服器的下注回應，來做出籌碼動畫
            // if(betResult.value!==0 && betResult.value!=-1 && !isConfirmed.value){ //並且還沒按下確定鈕的時候才要產生動畫
            //     betArray.push(betCallTemp.value) //確認server回傳為1才推入陣列中
            //     let betArrayShift = betArray.shift()
            //     betResultAction(betArrayShift.betAreaElement,betArrayShift.betAreaIndex)
            // }
        })
        watch(gameResult,()=>{ //更新遊戲結果
            clearLoseArea(gameResult.value)
            showResult()
            winCoinAnimation()
            store.commit('bet/setIsConfirmed',false) //重置按紐
        })
        function setBetStatusTextColor(){ //更換bstStatus和totalBet的顏色
            let betStatusText = document.querySelectorAll('.betStatus') as NodeListOf<HTMLElement>
            let totalBet = document.querySelector('#totalBet') as HTMLElement
            if(isConfirmed.value){ //按過了是灰色
                //字變成白色
                betStatusText.forEach((i:HTMLElement)=>{
                    i.style.color = 'white'
                })
                totalBet.style.color = 'white'
            }else{
                //字變成灰色
                betStatusText.forEach((i:HTMLElement)=>{
                    i.style.color = 'gray'
                })
                totalBet.style.color = 'gray'
            }
        }
        function setConfirmBtnColor(){ //更換確認紐顏色
            let confirmBtn = document.querySelector('.bettingArea-btn-check') as HTMLElement
            if(isConfirmed.value){ //按過了是灰色
                //按鈕變成灰色
                confirmBtn.style.background = 'rgb(80, 78, 78)'
            }else{
                //按鈕變成原本顏色
                confirmBtn.style.background = 'rgba(128, 0, 128, 0.829)'
            }
        }
        function setCancleBetBtnColor(){
            let cancleBtn = document.querySelector('.bettingArea-btn-gitbackAllCoin') as HTMLElement
            // console.log('設置取消按鈕顏色',isConfirmed.value)
            if(!isConfirmed.value){ //沒按過確認紐的時候是灰色的
                //按鈕變成灰色
                cancleBtn.style.background = 'rgb(80, 78, 78)'
            }else{
                //按鈕變成原本顏色
                cancleBtn.style.background = 'rgba(0,0,255,.692)'
            }
        }
        function getBetLimit (tableBetIndoData:any){
            //每次都把最大最小基準值恢復，再比大小
            minBetLimit.value = 999999999
            maxBetLimit.value = -1
            let keyList = Object.keys(tableBetIndoData)
            keyList.filter((i)=>{
                return i=='playerMin' || i=='playerMax' || i=='bankerMin' || i=='bankerMax'
            }).forEach((i:any)=>{
                if(tableBetIndoData[i]<minBetLimit.value){
                    minBetLimit.value = tableBetIndoData[i]
                }
                if(tableBetIndoData[i]>maxBetLimit.value){
                    maxBetLimit.value = tableBetIndoData[i]
                }
            })
            // console.log(minBetLimit.value,maxBetLimit.value)
        }
        function numberFormat(number:number):string{
            return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1,')
        }
        function setDefaultCoin(){
            let defaultCoin = document.querySelector('#defaultCoin1') as HTMLElement
            let rect = defaultCoin.getBoundingClientRect()
            currentCoint.coinElement = defaultCoin
            currentCoint.x = rect.left;  //設置籌碼起始座標點
            currentCoint.y = rect.top;
            currentCoint.point = coinList.value[0].point
            currentCoint.num = 0
        }
        function chooseCoint (index:number,e:MouseEvent) {
            currentCoint.coinElement = e.target; //得到該元素
            currentCoint.x = e.x;  //設置籌碼起始座標點
            currentCoint.y = e.y;
            currentCoint.num = index;
            currentCoint.point = coinList.value[index].point
        }
        function betErrorAnimation (e:HTMLElement) {
            gsap
            .fromTo(e,{opacity:0},{duration:1.5,opacity:1,y:-100,ease:Power4.easeOut,display:"none"})
        }
        function getCenterPoint (leftOrTop:number,rightOrBottom:number):number{
            return leftOrTop+(rightOrBottom-leftOrTop)/2
        }
        function goDefaultCoinPosition(Coin1Rect:DOMRect,liRect:DOMRect,liElement:HTMLElement){  //籌碼飛回的動畫
            if(Coin1Rect && liRect){
                let coinX =getCenterPoint(Coin1Rect.left,Coin1Rect.right)
                let coinY =getCenterPoint(Coin1Rect.top,Coin1Rect.bottom)
                let liX = getCenterPoint(liRect.left,liRect.right)
                let liY = getCenterPoint(liRect.top,liRect.bottom)
                gsap.to(liElement,{
                    delay:0.1,
                    duration:1,
                    x:coinX-liX,
                    y:coinY-liY,
                    ease:Power4.easeIn,
                    display:'none'
                })
            }
        }
        function winCoinAnimation () {
            //啟動時機:1.得到betResult之後；並且在reset之前!  2.有按確認下注
            if(gameResult.value && isConfirmed.value){
                gameResult.value.forEach((betAreaIndex:number)=>{
                    let betArea  = {} as NodeListOf<Element>
                    switch(betAreaIndex){
                        case proto.dealer.Result.Banker:
                            betArea = document.querySelectorAll(`.betArea-item2`) as NodeListOf<Element>
                            break
                        case proto.dealer.Result.Player:
                            betArea = document.querySelectorAll(`.betArea-item1`) as NodeListOf<Element>
                            break
                        case proto.dealer.Result.BankerPair:
                            betArea = document.querySelectorAll(`.betArea-item5`) as NodeListOf<Element>
                            break
                        case proto.dealer.Result.Tie:
                            betArea = document.querySelectorAll(`.betArea-item4`) as NodeListOf<Element>
                            break
                        case proto.dealer.Result.PlayerPair:
                            betArea = document.querySelectorAll(`.betArea-item3`) as NodeListOf<Element>
                            break
                    }
                betArea.forEach((i)=>{
                    let ul = i.children[2]   //這裡假如沒有下注的時候，會是1
                    if(ul){
                        let liList = ul.children as HTMLCollection
                        for(let i = liList.length-1 ; i>=0 ; i--){  
                            switch(liList[i].className.split(" ")[1]){
                                case `coin-${coinList.value[0].point}`:
                                    let Coin1Rect = document.querySelector('#defaultCoin1')?.getBoundingClientRect() as DOMRect //取得籌碼的正方形
                                    let liRect1 = liList[i].getBoundingClientRect() as DOMRect
                                    goDefaultCoinPosition(Coin1Rect,liRect1,liList[i] as HTMLElement)
                                    break
                                case `coin-${coinList.value[1].point}`:
                                    let Coin2Rect = document.querySelector('#defaultCoin2')?.getBoundingClientRect() as DOMRect //取得籌碼的正方形
                                    let liRect2 = liList[i].getBoundingClientRect() as DOMRect
                                    goDefaultCoinPosition(Coin2Rect,liRect2,liList[i] as HTMLElement)
                                    break
                                case `coin-${coinList.value[2].point}`:
                                    let Coin3Rect = document.querySelector('#defaultCoin3')?.getBoundingClientRect() as DOMRect //取得籌碼的正方形
                                    let liRect3 = liList[i].getBoundingClientRect() as DOMRect
                                    goDefaultCoinPosition(Coin3Rect,liRect3,liList[i] as HTMLElement)
                                    break
                                case `coin-${coinList.value[3].point}`:
                                    let Coin4Rect = document.querySelector('#defaultCoin4')?.getBoundingClientRect() as DOMRect //取得籌碼的正方形
                                    let liRect4 = liList[i].getBoundingClientRect() as DOMRect
                                    goDefaultCoinPosition(Coin4Rect,liRect4,liList[i] as HTMLElement)
                                    break
                                case `coin-${coinList.value[4].point}`:
                                    let Coin5Rect = document.querySelector('#defaultCoin5')?.getBoundingClientRect() as DOMRect //取得籌碼的正方形
                                    let liRect5 = liList[i].getBoundingClientRect() as DOMRect
                                    goDefaultCoinPosition(Coin5Rect,liRect5,liList[i] as HTMLElement)
                                    break
                                case `coin-${coinList.value[5].point}`:
                                    let Coin6Rect = document.querySelector('#defaultCoin6')?.getBoundingClientRect() as DOMRect //取得籌碼的正方形
                                    let liRect6 = liList[i].getBoundingClientRect() as DOMRect
                                    goDefaultCoinPosition(Coin6Rect,liRect6,liList[i] as HTMLElement)
                            }
                        }
                    }
                })
            })
            }
        }
        function cointAnimate (e:HTMLElement) {
            gsap
            .to(e,{
                keyframes:[
                    {
                    // scale:1.1,
                    },
                    {duration:0.8,
                    ease:Power4.easeIn,
                    scale:0.5,
                    x:target.x-currentCoint.x+20,
                    y:target.y-currentCoint.y-50,
                    zIndex:"1",
                    },
                    {
                        display:"none"
                    }
                ]
            })
        }
        async function generateCoinAnimate (e:HTMLElement) {
            // console.log('2.再執行動畫',e,coinPosition[currentBetPosition.betAreaIndex].initBottom)
            await gsap
            .to(e,{
                keyframes:[
                    {display:"none"},
                    {delay:0.75,
                    duration:0.5,
                    x:coinPosition[currentBetPosition.betAreaIndex].initX,
                    y:-coinPosition[currentBetPosition.betAreaIndex].initBottom,
                    opacity:1,
                    display:"block"}
                    ]
            })
        }
        function loadCoin () {
            if(currentCoint.num!==null){
                // console.log("裝入",currentCoint.coinElement.classList[0])
                coinList.value[currentCoint.num].ammo.push(currentCoint.coinElement.classList[0])
            }
        }
        function setCoinPosition (cp:coinPosition) {
            if(currentCoint.coinElement){  //有選擇籌碼時，才會生籌碼
             cp.coinArray.push(currentCoint.coinElement.className)  //添加class名稱到注區
            //  console.log(cp.coinArray.length%10)
                if((cp.coinArray.length%10)==0){ //每10個橫移一次
                    cp.initX +=10;
                    cp.initBottom = 0
                }else{
                    cp.initBottom += 5;  //修改樣式
                }
                // console.log(cp.initBottom,cp.initX)
            }
        }
        function sendBetData(e:MouseEvent,index:number){  //push紀錄注區元素和注區index
            if(canBet.value && !isConfirmed.value){ //下注期間，且是還沒按下確認鍵時
                sendBetCall({
                    gameUuid:roundUuid.value,
                    betIndex:currentCoint.num,
                    betArea:index+1,
                })
                if(user.value.wallet>=currentCoint?.point){  //餘額大於等於當前所選籌碼才要放動畫
                    betCallTemp.value = { //資料暫存起來，後面確定betResult為1的時候才推入籌碼動畫陣列
                     'betAreaElement':e.target,
                     'betAreaIndex':index,
                    }
                }
            }else{ //if 停止下注時，就不要送了，改為betErrorArray.value?.push('下注失敗')
                if(isConfirmed.value){
                    betErrorArray.value?.push('已確認過下注，若要再次下注，請按取消鈕')
                }else{
                    betErrorArray.value?.push('下注失敗')
                }   
            }
        }
        function betResultAction(betAreaElement:HTMLElement,index:number){  //監聽betResult時shift從頭拿取 紀錄的注區元素和注區index
            if(betResult.value==1){   
                //裝子彈，就會啟動籌碼飛的動畫
                loadCoin()   
                let rect = betAreaElement?.getBoundingClientRect();  //固定飛到點擊區域的左下方
                target.x = rect.left;
                target.y = rect.bottom;
                let cp = coinPosition[index]; //用來存點選到的注區
                currentBetPosition.betAreaIndex = index   
                setCoinPosition(cp)  //在駐區生成籌碼並設置起始位置 
                store.commit('bet/resetBetResult') //重置result狀態
            }
        }
        function getAllBetBack(){
            if(canBet.value && gameStatus.value==1){  //可以下注，且遊戲狀態是下注中
                if(coinPosition[0].betStatus!=0 || coinPosition[1].betStatus!=0 ||
                  coinPosition[2].betStatus!=0 || coinPosition[3].betStatus!=0 || coinPosition[4].betStatus!=0){
                      sendBetResetCall({
                        gameUuid:roundUuid.value,
                    })
                    gsap
                    .fromTo('#cancleBet',{opacity:1,y:0,scale:1,color:'yellow'},{duration:2,scale:3,opacity:0,ease:Power4.easeOut})
                    store.commit('bet/setIsConfirmed',false)
                  }else{
                       betErrorArray.value?.push('尚未下注')
                  }
            }else {
                switch(gameStatus.value){
                    case 2:
                        betErrorArray.value?.push('開牌中，無法取消')
                        break
                    case 3:
                        betErrorArray.value?.push('等待中，無法取消')
                        break
                }
            }
        }
        function clearLoseArea (winAreaArray:Array<number>) {
            let winArea1 = winAreaArray[0]
            let winArea2 = winAreaArray[1]  //若沒有，就是undefined
             //清空注區籌碼，除了贏的
            switch(winArea1){
                case proto.dealer.Result.Banker:
                    winArea1 = 1
                    break
                case proto.dealer.Result.Player:
                    winArea1 = 0
                    break
                case proto.dealer.Result.Tie:
                    winArea1 = 3
                    break
                case proto.dealer.Result.BankerPair:
                    winArea1 = 4
                    break
                case proto.dealer.Result.PlayerPair:
                    winArea1 = 2
                    break
            }
            switch(winArea2){
                case proto.dealer.Result.Banker:
                    winArea2 = 1
                    break
                case proto.dealer.Result.Player:
                    winArea2 = 0
                    break
                case proto.dealer.Result.Tie:
                    winArea2 = 3
                    break
                case proto.dealer.Result.BankerPair:
                    winArea2 = 4
                    break
                case proto.dealer.Result.PlayerPair:
                    winArea2 = 2
                    break
            }
            coinPosition.forEach((i,index) => {
                if(index!==winArea1 && index!==winArea2){
                    i.coinArray = []
                    i.initBottom = 0
                    i.betStatus = 0 
                }
            })
        }
        function resetGame () {
            store.commit('bet/resetTotalBets')
            //清空注區籌碼，最後只需要清除贏
            coinPosition.forEach((i) => {
                    i.coinArray = []
                    i.initBottom = 0
                    i.betStatus = 0 
                    i.tableAllPlayerBetStatus = 0
                    i.initX = 0
            })
            //清空籌碼飛彈槍管
            coinList.value.forEach((i:any) => {
                i.ammo = []
            })
            store.commit('bet/setBetResultRest')
            canBet.value = true
            betArray = []
        }
        function showResult () { 
            //為贏的注區套上閃爍動畫
            gameResult.value.forEach((i:number)=>{
                switch(i){
                    case proto.dealer.Result.Banker:
                      let betArea2 = document.querySelectorAll('.betArea-item2') as NodeListOf<HTMLElement>
                        betArea2.forEach((i:HTMLElement)=>{
                            i.classList.add('winAnimation')
                            if(i.children[1].className=='betStatus'){
                                i.children[1].classList.add('winCoin')  //取得注區數字
                            }
                        })
                        break
                    case proto.dealer.Result.Player:
                        let betArea1 = document.querySelectorAll('.betArea-item1') as NodeListOf<HTMLElement>
                        betArea1.forEach((i:HTMLElement)=>{
                            i.classList.add('winAnimation')
                            if(i.children[1].className=='betStatus'){
                            i.children[1].classList.add('winCoin')  //取得注區數字
                            }
                        })
                        break
                    case proto.dealer.Result.BankerPair:
                        let betArea5 = document.querySelectorAll('.betArea-item5') as NodeListOf<HTMLElement>
                        betArea5.forEach((i:HTMLElement)=>{
                            i.classList.add('winAnimation')
                            if(i.children[1].className=='betStatus'){
                            i.children[1].classList.add('winCoin')  //取得注區數字
                            }
                        })
                        break
                     case proto.dealer.Result.Tie:
                        let betArea4 = document.querySelectorAll('.betArea-item4') as NodeListOf<HTMLElement>
                        betArea4.forEach((i:HTMLElement)=>{
                            i.classList.add('winAnimation')
                            if(i.children[1].className=='betStatus'){
                            i.children[1].classList.add('winCoin')  //取得注區數字
                            }
                        })
                        break
                     case proto.dealer.Result.PlayerPair:
                        let betArea3 = document.querySelectorAll('.betArea-item3') as NodeListOf<HTMLElement>
                        betArea3.forEach((i:HTMLElement)=>{
                            i.classList.add('winAnimation')
                            if(i.children[1].className=='betStatus'){
                            i.children[1].classList.add('winCoin')  //取得注區數字
                            }
                        })
                        break
                }
            })
            let betAreaMoney = document.querySelectorAll('.betStatus') as NodeListOf<HTMLElement>
            betAreaMoney.forEach((i:HTMLElement)=>{
                if(!i.className.includes('winCoin'))
                     i.style.color = "grey"
            })
        }
        function reSetBetAreaAnimation(){ //移除贏的注區的 高亮顯示動畫
            if(gameResult.value){
                gameResult.value.forEach((i:number)=>{
                    switch(i){
                        case proto.dealer.Result.Banker:
                            let betArea2 = document.querySelectorAll('.betArea-item2') as NodeListOf<HTMLElement>
                            // let betRaitText = betArea2.forEach((i:HTML))
                            betArea2.forEach((i:HTMLElement)=>{
                            i.classList.remove('winAnimation')
                            })
                            break
                        case proto.dealer.Result.Player:
                            let betArea1 = document.querySelectorAll('.betArea-item1') as NodeListOf<HTMLElement>
                            betArea1.forEach((i:HTMLElement)=>{
                            i.classList.remove('winAnimation')
                            })
                            break
                        case proto.dealer.Result.BankerPair:
                            let betArea5 = document.querySelectorAll('.betArea-item5') as NodeListOf<HTMLElement>
                            betArea5.forEach((i:HTMLElement)=>{
                            i.classList.remove('winAnimation')
                            })
                            break
                        case proto.dealer.Result.Tie:
                            let betArea4 = document.querySelectorAll('.betArea-item4') as NodeListOf<HTMLElement>
                            betArea4.forEach((i:HTMLElement)=>{
                            i.classList.remove('winAnimation')
                            })
                            break
                        case proto.dealer.Result.PlayerPair:
                            let betArea3 = document.querySelectorAll('.betArea-item3') as NodeListOf<HTMLElement>
                            betArea3.forEach((i:HTMLElement)=>{
                            i.classList.remove('winAnimation')
                            })
                            break
                            
                    }
                
            })
            }
        }
        function askRoad(roadNum:number){
            currentAskRoadSide.value = roadNum
            store.commit('roadmap/setAskRoad',roadNum)
            sendAskRoadCall({
                symbol:roadNum
            })
        }
        function changeAskRoadBtnView(currentRoadNum:number,askRoadRecall:any){  //更換問路時候，按鈕上顯示的圖案
            let smallRoad = document.getElementById(`smallRoad-${currentRoadNum}`) as HTMLElement
            let bigEyes = document.getElementById(`bigEyeRoad-${currentRoadNum}`) as HTMLElement
            let cockroach = document.getElementById(`cockroachRoad-${currentRoadNum}`) as HTMLElement
            smallRoad.classList.remove(smallRoad.classList[0])
            bigEyes.classList.remove(bigEyes.classList[0])
            cockroach.classList.remove(cockroach.classList[0])
            if(askRoadRecall.smallRoadNext){
                switch(askRoadRecall.smallRoadNext.symbol){
                case 1:
                    smallRoad.classList.add('small-red-ask')
                    break
                case 2:
                    smallRoad.classList.add('small-blue-ask')
                    break
                }
            }
            if(askRoadRecall.bigEyeRoadNext){
                switch(askRoadRecall.bigEyeRoadNext.symbol){
                case 1:
                    bigEyes.classList.add('bigEye-red-ask') 
                    break
                case 2:
                    bigEyes.classList.add('bigEye-blue-ask') 
                    break
                }
            }
            if(askRoadRecall.cockroachRoadNext){
                switch(askRoadRecall.cockroachRoadNext.symbol){
                case 1:
                    cockroach.classList.add('cockroach-red-ask')
                    break
                case 2:
                    cockroach.classList.add('cockroach-blue-ask')
                    break
            }
            }
            // console.log('更換按鈕的下三路圖形:小路/大眼/蟑螂',askRoadRecall.smallRoadNext,askRoadRecall.bigEyeRoadNext,askRoadRecall.cockroachRoadNext)
        }
        function sendConfirmBetCall(){//發送確認下注請求
            //可以發出確認紐的時機:
            //1.canBet  2.玩家有下注在任一區域時  3.當局還沒按過確認鍵
            if(canBet.value && !isConfirmed.value && gameStatus.value==1){
                if(coinPosition[0].betStatus!=0 || coinPosition[1].betStatus!=0 ||
                  coinPosition[2].betStatus!=0 || coinPosition[3].betStatus!=0 || coinPosition[4].betStatus!=0){
                      sendBetConfirmCall({
                        gameUuid:roundUuid.value
                    })
                }else{
                    betErrorArray.value?.push('尚未下注')
                }
            }else {
                switch(gameStatus.value){
                    case 2:
                        betErrorArray.value?.push('開牌中，無法下注')
                        break
                    case 3:
                        betErrorArray.value?.push('等待中，無法下注')
                        break
                }
            }
        }
        function confirmBet(){ //收到serve確認下注時的動作
            if(canBet.value && !isConfirmed.value){ 
                //噴出確認下注的提示文字
                 gsap
                .fromTo('#betConfirm',{opacity:1,y:0,scale:1,color:'yellow'},{duration:2,scale:3,opacity:0,ease:Power4.easeOut})
                //不能下注，除非按取消
                store.commit('bet/setIsConfirmed',true)
            }
        }
        return{
            //data
            coinList,
            currentCoint,
            coinPosition,
            betStatus,
            total,
            betErrorArray,
            betInfo,
            minBetLimit,
            maxBetLimit,
            onlinePlayersNumber,
            //methods
            chooseCoint,
            cointAnimate,
            generateCoinAnimate,
            resetGame,
            showResult,
            getAllBetBack,
            betErrorAnimation,
            sendBetData,
            askRoad,
            numberFormat,
            sendConfirmBetCall,
        }
    }
})
</script>