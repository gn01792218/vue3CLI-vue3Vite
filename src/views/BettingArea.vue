<template>
    <GameresultSound/>
    <div class="betArea">
        <!-- PC版本注區 -->
        <div class="betArea-pc position-relative">
            <GameResultLoading/>
            <ul class="betError position-absolute">
                <transition-group @enter="betErrorAnimation">
                    <li v-for="(betErr,index) in betErrorArray" :key="index">{{betErr}}</li>
                </transition-group>
            </ul>
                <div class="betArea-pc-container">
                    <div :class ="[`betArea-item${index+1}`,i.configClass,'col-6']" v-for ="(i,index) in coinPosition.slice(0,2)" :key ="index" @click ="sendBetData($event,index)" >{{i.host}}<br>{{i.odds}}
                        <span class="betStatus" v-if="i.betStatus>0">{{i.betStatus}}</span>
                        <ul class="coinPosition">
                            <transition-group  v-if="i.coinArray.length>=0" @enter="generateCoinAnimate">
                                <li v-for="(coin,index)  in i.coinArray" :key="index" :class="[coin,`index${index}`]"></li>
                            </transition-group>
                        </ul>
                    </div>
                </div>  
                <div class="betArea-pc-container">
                    <div :class="[`betArea-item${index+3}`,i.configClass,'col-4']" v-for="(i,index) in coinPosition.slice(2,coinPosition.length)" :key="index" @click="sendBetData($event,index+2)" >{{i.host}}<br>{{i.odds}}
                        <span class="betStatus" v-if="i.betStatus>0">{{i.betStatus}}</span>
                        <ul class="coinPosition">
                            <transition-group  v-if="i.coinArray.length>=0" @enter="generateCoinAnimate">
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
            </ul>
            <div class="betArea-mobile-container d-flex">
                <div :class ="[`betArea-item${index+1}`,i.configClass,{'col-6':index===0 | index===1},{'col-4':index!==0 | index!==1}]" v-for ="(i,index) in coinPosition" :key ="index" @click ="sendBetData($event,index)" >{{i.host}}<br>{{i.odds}}
                    <span class="betStatus" v-if="i.betStatus>0">{{i.betStatus}}</span>
                    <ul class="coinPosition">
                        <transition-group  v-if="i.coinArray.length>=0" @enter="generateCoinAnimate">
                            <li v-for="(coin,index)  in i.coinArray" :key="index" :class="[coin,`index${index}`]"></li>
                        </transition-group>
                    </ul>
                </div>
            </div>
        </div>
        <!-- total Bet -->
        <div class="bettingArea-betInfo em font-total">
            <p class="mobilTableInfo yellow">莊:XX</p>
            <p class="mobilTableInfo red">閒:XX</p>
            <p class="mobilTableInfo green">和:XX</p>
            <p class="mobilTableInfo yellow">莊對:XX</p>
            <p class="mobilTableInfo red">閒對:XX</p>
            <p class="d-none d-lg-block">本次注額{{total}}</p>
        </div>
        <!-- coin -->
        <div class="coinArea position-relative">
            <LightBox/>
            <!-- coin list -->
            <div :id='`defaultCoin${index+1}`' v-for="(coin,index) in coinList" :key="index"  
            :class="[coin.point===currentCoint.point ? `coin-menu${index+1}-current` :'',`coin-menu${index+1}`]" 
            @click="chooseCoint(index,$event)"></div>
            <!-- coin ammo -->
            <ul class="shotCoinUl d-flex position-absolute">
                <div v-for="coin,index in coinList" :key="index">
                    <transition-group  v-if="coin.ammo.length>=0" @enter="cointAnimate">
                        <!-- <div :class="[ammo,'shotCoinPice',`ammo${coin.point}`]" v-for="(ammo,index) in coin.ammo" :key="index"></div> -->
                        <div :class="[ammo,'shotCoinPice',`ammo${coin.num}`]" v-for="(ammo,index) in coin.ammo" :key="index"></div>
                    </transition-group>
                </div>
            </ul>
        </div>
        <GameResult/>
        <!-- <button class="test position-absolute" @click="getAllBetBack">還我$$$$$$$$$</button> -->
    </div>
</template>

<script lang="ts">
import {computed, defineComponent, nextTick, onMounted, reactive, ref, watch} from 'vue'
import {gsap,Power4} from 'gsap'
import {sendBetCall,sendBetResetCall} from '../socketApi'
import {useStore} from 'vuex'
import GameResult from '@/components/GameResult.vue'
import GameresultSound from '@/components/GameResultSound.vue'
import GameResultLoading from '@/components/GameResultLoading.vue'
import LightBox from '@/components/LightBox.vue'
import proto from '../assets/js/bundle'
import { configure } from 'protobufjs'
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
interface coint {
    point:number,
    ammo:string[],
    num:number,
}
interface coinPosition {
    initBottom:number,  //初始化的bottom值
    initX:number, //水平初始位置
    coinArray:string[],//生籌碼的地方
    odds:string,
    host:string,
    configClass:string,
    betStatus:number //目前這一回合的下注狀況
    maxBet:number //最大限注
}
export default defineComponent({
    components:{
        GameResult,GameresultSound,GameResultLoading,LightBox,
    },
    setup(){
        onMounted(()=>{
            //初始化籌碼
            setDefaultCoin()
            // setMinBetCoinUnusable()
        })
        //vuex
        const store = useStore();
        const user = computed(()=>{
            return store.state.auth.UserInfo.user
        })
        const betStatus = computed(()=>{  //各注區下注狀況
            return store.state.bet.BetRecall.betStatus
        })
        const betResult = computed(()=>{ //下注成功否的狀態
            return store.state.bet.BetRecall.result
        })
        const betResetresult = computed(()=>{
            return store.state.bet.BetResetRecall.result
        })
        const betError = computed(()=>{
            return store.state.bet.BetRecall.betError.error
        })
        const roundUuid = computed(()=>{ //遊戲回合的Uuid
            return store.state.game.gameUuid
        })
        const gameEndUuid = computed(()=>{
            return store.state.game.gameEndUuid
        })
        const gameResult = computed(()=>{ //回傳的是陣列
            return store.state.dealer.BroadcastGameResult.results
        })
        const total = computed(()=>{
            return store.state.bet.totalBets
        })
        const gameEnd = computed(()=>{
            return store.state.dealer.end
        })
        //基本資料
        const canBet = ref(true)
        const canUseSmallCoin = ref(false)
        //監聽
        watch(betStatus,()=>{  //更新每次下注後顯示在注區的數字
            if(betResult.value!==-1){ 
                coinPosition[0].betStatus = betStatus.value.Player
                coinPosition[1].betStatus = betStatus.value.Banker
                coinPosition[2].betStatus = betStatus.value.PlayerPair
                coinPosition[3].betStatus = betStatus.value.Tie
                coinPosition[4].betStatus = betStatus.value.BankerPair
            }   
        })
        watch(gameEnd,()=>{ //換薛時也要重置，並且無法下注
            // console.log("換靴重置BettingArear")
            reSetBetAreaAnimation()
            resetGame()
            canBet.value = false
        })
        watch(roundUuid,()=>{  //回合開始時重置遊戲
            // console.log("開始下注")
            reSetBetAreaAnimation()
            resetGame()
            
            // setDefaultCoin()
            // nextTick(()=>{
            //     setMinBetCoinUnusable()
            // })
        })
        watch(gameEndUuid,()=>{
            canBet.value = false
        })
        watch(betResult,()=>{  //偵測伺服器的下注回應，來做出籌碼動畫
            if(betResult.value!==0){
                let betArrayShift = betArray.shift()
                betResultAction(betArrayShift.betAreaElement,betArrayShift.betAreaIndex)
            }
        })
        watch(betResetresult,()=>{  //玩家反悔收回籌碼的動作
            if(betResetresult.value===1){
                 resetGame()
            }
        })
        watch(gameResult,()=>{
            clearLoseArea(gameResult.value)
            showResult()
            winCoinAnimation()
        })
        watch(total,()=>{
            console.log('下注總額變化提示:','所選注區',currentBetPosition.betAreaIndex)
            // if(currentBetPosition.betAreaIndex==0 || currentBetPosition.betAreaIndex==1){
            //     console.log('判斷莊閒區')
            //     if(parseInt(total.value)*1000>=coinList[3].point && !canUseSmallCoin.value){
            //         console.log('可以打開前三個籌碼')
            //         // setMinBetCoinUsable()
            //         canUseSmallCoin.value = true
            //     }
            // }
        })
        //籌碼動畫、下注邏輯
        const coinList = reactive<coint[]>([  //籌碼基本資料
                    {
                    point:100,
                    ammo:[], //子彈陣列
                    num:1,
                    },
                    {
                    point:500,
                    ammo:[], //子彈陣列
                    num:2,
                    },
                    {
                    point:1000,
                    ammo:[], //子彈陣列
                    num:3,
                    },
                    {
                    point:2000,
                    ammo:[], //子彈陣列
                    num:4,
                    },
                    {
                    point:10000,
                    ammo:[], //子彈陣列
                    num:5,
                    },
                    {
                    point:100000,
                    ammo:[],
                    num:6,
                    }
                ])
        const currentCoint = reactive<currentCoint>({ 
            coinElement:document.querySelector('#defaultCoin4'), //選擇的籌碼元素
            num:3,  //儲存點到的是第幾個
            point:coinList[3].point, //預設是100點ㄉ
            x:0, //起飛的x
            y:0, //起飛的y
        });  
        const currentBetPosition = reactive({
            betAreaIndex:-1,
        })
        const target = reactive<target>({ //目標位置
            x : 0,
            y : 0,
        })
        //coin-menu2 coin-menu2-current index0
        const coinPosition = reactive<coinPosition[]>([//注區
            {
                initBottom:0,
                initX:0,
                coinArray:[],
                odds:"1:1",
                host:"閒家",
                configClass:"betArea-item red alertFont",
                betStatus:0,
                maxBet:100000, //目前這一回合的下注狀況
            },
            {
                initBottom:0,  //初始化的bottom值
                initX:0,
                coinArray:[],//生籌碼的地方
                odds:"1:0.95",
                host:"莊家",
                configClass:"betArea-item yellow alertFont",
                betStatus:0, //目前這一回合的下注狀況
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
                maxBet:10000,
            },
            {
                initBottom:0,
                initX:0,
                coinArray:[],
                odds:"1:8",
                host:"和局",
                configClass:"betArea-item green",
                betStatus:0, //目前這一回合的下注狀況
                maxBet:20000,
            },
            {
                initBottom:0,
                initX:0,
                coinArray:[],
                odds:"1:11",
                host:"莊對",
                configClass:"betArea-item yellow",
                betStatus:0, //目前這一回合的下注狀況
                maxBet:10000,
            },
           
        ]) 
        const betErrorArray = ref<Array<string>>([])
        function setDefaultCoin(){
            let defaultCoin = document.querySelector('#defaultCoin1') as HTMLElement
            let rect = defaultCoin.getBoundingClientRect()
            currentCoint.coinElement = defaultCoin
            currentCoint.x = rect.left;  //設置籌碼起始座標點
            currentCoint.y = rect.top;
            currentCoint.point = coinList[0].point
            currentCoint.num = 0
            console.log()
        }
        function setMinBetCoinUsable(){
            //抓取前三個coin元素改變其外觀
            let defaultCoin1 = document.querySelector('#defaultCoin1') as HTMLElement
            let defaultCoin2 = document.querySelector('#defaultCoin2') as HTMLElement
            let defaultCoin3 = document.querySelector('#defaultCoin3') as HTMLElement
            defaultCoin1.classList.replace('coin-menu1-disable','coin-menu1')
            defaultCoin2.classList.replace('coin-menu2-disable','coin-menu2')
            defaultCoin3.classList.replace('coin-menu3-disable','coin-menu3')
            canUseSmallCoin.value = true
            // console.log('可否使用小籌碼',canUseSmallCoin.value)
        }
        function setMinBetCoinUnusable(){
            let defaultCoin1 = document.querySelector('#defaultCoin1') as HTMLElement
            let defaultCoin2 = document.querySelector('#defaultCoin2') as HTMLElement
            let defaultCoin3 = document.querySelector('#defaultCoin3') as HTMLElement
            defaultCoin1.classList.remove('coin-menu1-current')
            defaultCoin2.classList.remove('coin-menu2-current')
            defaultCoin3.classList.remove('coin-menu3-current')
            defaultCoin1.classList.remove('coin-menu1')
            defaultCoin2.classList.remove('coin-menu2')
            defaultCoin3.classList.remove('coin-menu3')
            defaultCoin1.classList.add('coin-menu1-disable')
            defaultCoin2.classList.add('coin-menu2-disable')
            defaultCoin3.classList.add('coin-menu3-disable')
            canUseSmallCoin.value = false
            // console.log(defaultCoin1.classList,defaultCoin2.classList,defaultCoin3.classList)
            // console.log('可否使用小籌碼',canUseSmallCoin.value)
        }
        function chooseCoint (index:number,e:MouseEvent) {
            currentCoint.coinElement = e.target; //得到該元素
            currentCoint.x = e.x;  //設置籌碼起始座標點
            currentCoint.y = e.y;
            currentCoint.num = index;
            currentCoint.point = coinList[index].point
            //超過最小下注額才可以使用前三個籌碼
            // if(canUseSmallCoin.value){
            //     console.log("可以選取前三個了",total.value)
            //     currentCoint.coinElement = e.target; //得到該元素
            //     currentCoint.x = e.x;  //設置籌碼起始座標點
            //     currentCoint.y = e.y;
            //     currentCoint.num = index;
            //     currentCoint.point = coinList[index].point
            // }else{
            //     //0 1 2不能選，只能選後面的籌碼
            //      console.log("不能選前三個")
            //     if(index!==0 && index!==1 && index!==2){
            //        console.log('可以選後面的')
            //         currentCoint.coinElement = e.target; //得到該元素
            //         currentCoint.x = e.x;  //設置籌碼起始座標點
            //         currentCoint.y = e.y;
            //         currentCoint.num = index;
            //         currentCoint.point = coinList[index].point
            //     }
            // }
        }
        function betErrorAnimation (e:HTMLElement) {
            gsap
            .fromTo(e,{opacity:0},{opacity:1,y:-100,ease:Power4.easeOut,display:"none"})
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
            //啟動時機:得到betResult之後；並且在reset之前!
            if(gameResult.value){
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
                                case 'coin-menu1':
                                    let Coin1Rect = document.querySelector('#defaultCoin1')?.getBoundingClientRect() as DOMRect //取得籌碼的正方形
                                    let liRect1 = liList[i].getBoundingClientRect() as DOMRect
                                    goDefaultCoinPosition(Coin1Rect,liRect1,liList[i] as HTMLElement)
                                    break
                                case 'coin-menu2':
                                    let Coin2Rect = document.querySelector('#defaultCoin2')?.getBoundingClientRect() as DOMRect //取得籌碼的正方形
                                    let liRect2 = liList[i].getBoundingClientRect() as DOMRect
                                    goDefaultCoinPosition(Coin2Rect,liRect2,liList[i] as HTMLElement)
                                    break
                                case 'coin-menu3':
                                    let Coin3Rect = document.querySelector('#defaultCoin3')?.getBoundingClientRect() as DOMRect //取得籌碼的正方形
                                    let liRect3 = liList[i].getBoundingClientRect() as DOMRect
                                    goDefaultCoinPosition(Coin3Rect,liRect3,liList[i] as HTMLElement)
                                    break
                                case 'coin-menu4':
                                    let Coin4Rect = document.querySelector('#defaultCoin4')?.getBoundingClientRect() as DOMRect //取得籌碼的正方形
                                    let liRect4 = liList[i].getBoundingClientRect() as DOMRect
                                    goDefaultCoinPosition(Coin4Rect,liRect4,liList[i] as HTMLElement)
                                    break
                                case 'coin-menu5':
                                    let Coin5Rect = document.querySelector('#defaultCoin5')?.getBoundingClientRect() as DOMRect //取得籌碼的正方形
                                    let liRect5 = liList[i].getBoundingClientRect() as DOMRect
                                    goDefaultCoinPosition(Coin5Rect,liRect5,liList[i] as HTMLElement)
                                    break
                                case 'coin-menu6':
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
        function generateCoinAnimate (e:HTMLElement) {
            //想要橫飛打開此選項，並且關閉下方y
            // e.style.bottom = `${coinPosition[currentBetPosition.betAreaIndex].initBottom}px`
            gsap
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
                console.log("裝入",currentCoint.coinElement.classList[0])
                // coinList[currentCoint.num].ammo.push(currentCoint.coinElement.className)
                coinList[currentCoint.num].ammo.push(currentCoint.coinElement.classList[0])
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
        const betArray = reactive<Array<any>>([]) //紀錄下注元素和區域
        function sendBetData(e:MouseEvent,index:number){  //push紀錄注區元素和注區index
            if(canBet.value){
                //每個注區都有自己的最大限注，而0和1注區則有最小限注的限制
                switch(index){
                    case 0:
                        //可以下注的情況為:1.當前選擇的籌碼大於2000；並且當前選擇的籌碼小於最大限注
                        if(coinPosition[0].betStatus+currentCoint.point>=coinList[3].point && coinPosition[0].betStatus+currentCoint.point<=coinPosition[0].maxBet){
                            sendBetCall({
                                gameUuid:roundUuid.value,
                                betIndex:currentCoint.num,
                                betArea:index+1,
                            })
                            if(user.value.wallet>=currentCoint?.point){  //餘額大於等於當前所選籌碼才要放動畫
                                betArray.push({   //當玩家餘額不足時不要推
                                    'betAreaElement':e.target,
                                    'betAreaIndex':index,
                                })
                            }
                        }else{
                            betErrorArray.value?.push('下注失敗')
                            if(coinPosition[0].betStatus+currentCoint.point<=coinList[3].point){ //小於最小限注
                                betErrorArray.value?.push(`閒注區最小下注額為${coinList[3].point}`)
                            }else if(coinPosition[0].betStatus+currentCoint.point>=coinPosition[0].maxBet){
                                betErrorArray.value?.push(`閒注區最大下注額為${coinPosition[0].maxBet}`)
                            }
                        }
                        break
                    case 1:
                        if(coinPosition[1].betStatus+currentCoint.point>=coinList[3].point && coinPosition[1].betStatus+currentCoint.point<=coinPosition[1].maxBet){
                            sendBetCall({
                                gameUuid:roundUuid.value,
                                betIndex:currentCoint.num,
                                betArea:index+1,
                            })
                            if(user.value.wallet>=currentCoint?.point){  //餘額大於等於當前所選籌碼才要放動畫
                                betArray.push({   //當玩家餘額不足時不要推
                                    'betAreaElement':e.target,
                                    'betAreaIndex':index,
                                })
                            }
                        }else{
                            betErrorArray.value?.push('下注失敗')
                            if(coinPosition[1].betStatus+currentCoint.point<=coinList[3].point){ //小於最小限注
                                betErrorArray.value?.push(`莊注區最小下注額為${coinList[3].point}`)
                            }else if(coinPosition[1].betStatus+currentCoint.point>=coinPosition[1].maxBet){
                                betErrorArray.value?.push(`莊注區最大下注額為${coinPosition[1].maxBet}`)
                            }
                        }
                        break
                    case 2:
                        if(coinPosition[2].betStatus+currentCoint.point<=coinPosition[2].maxBet){
                            sendBetCall({
                                gameUuid:roundUuid.value,
                                betIndex:currentCoint.num,
                                betArea:index+1,
                            })
                            if(user.value.wallet>=currentCoint?.point){  //餘額大於等於當前所選籌碼才要放動畫
                                betArray.push({   //當玩家餘額不足時不要推
                                    'betAreaElement':e.target,
                                    'betAreaIndex':index,
                                })
                            }
                        }else{
                            betErrorArray.value?.push(`閒對區最大下注額為${coinPosition[2].maxBet}`)
                        }
                        break
                    case 3:
                        if(coinPosition[3].betStatus+currentCoint.point<=coinPosition[3].maxBet){
                            sendBetCall({
                                gameUuid:roundUuid.value,
                                betIndex:currentCoint.num,
                                betArea:index+1,
                            })
                            if(user.value.wallet>=currentCoint?.point){  //餘額大於等於當前所選籌碼才要放動畫
                                betArray.push({   //當玩家餘額不足時不要推
                                    'betAreaElement':e.target,
                                    'betAreaIndex':index,
                                })
                            }
                        }else{
                            betErrorArray.value?.push(`和區最大下注額為${coinPosition[3].maxBet}`)
                        }
                        break
                    case 4:
                        if(coinPosition[4].betStatus+currentCoint.point<=coinPosition[4].maxBet){
                            sendBetCall({
                                gameUuid:roundUuid.value,
                                betIndex:currentCoint.num,
                                betArea:index+1,
                            })
                            if(user.value.wallet>=currentCoint?.point){  //餘額大於等於當前所選籌碼才要放動畫
                                betArray.push({   //當玩家餘額不足時不要推
                                    'betAreaElement':e.target,
                                    'betAreaIndex':index,
                                })
                            }
                        }else{
                            betErrorArray.value?.push(`莊對區最大下注額為${coinPosition[4].maxBet}`)
                        }
                        break

                }
            }else{ //if 停止下注時，就不要送了，改為betErrorArray.value?.push('下注失敗')
                betErrorArray.value?.push('下注失敗')
            }
        }
        function betResultAction(betAreaElement:HTMLElement,index:number){  //監聽betResult時shift從頭拿取 紀錄的注區元素和注區index
            if(betResult.value==1){   
                //裝子彈，就會啟動籌碼飛的動畫
                loadCoin()   
                let rect = betAreaElement.getBoundingClientRect();  //固定飛到點擊區域的左下方
                target.x = rect.left;
                target.y = rect.bottom;
                let cp = coinPosition[index]; //用來存點選到的注區
                currentBetPosition.betAreaIndex = index   
                setCoinPosition(cp)  //在駐區生成籌碼並設置起始位置 
                store.commit('bet/resetBetResult') //重置result狀態
            }else{
                switch(betError.value){
                    case 1:
                        betErrorArray.value?.push('下注失敗')
                        break
                    case 2:
                        betErrorArray.value?.push('非法的籌碼')
                        break
                    case 3:
                        betErrorArray.value?.push('非法的注區')
                        break
                    case 4:
                        betErrorArray.value?.push('超過最高下注額度')
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
        }
        function getAllBetBack(){
            sendBetResetCall({
                 gameUuid:roundUuid.value,
            })
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
            // total.value = 0
            store.commit('bet/resetTotalBets')
            //清空選取的籌碼
            // currentCoint.coinElement = null
            // currentCoint.point = null
            // currentCoint.num = null
            //清空注區籌碼，最後只需要清除贏
            coinPosition.forEach((i,index) => {
                // if(index==gameResult.value[0] || index==gameResult.value[1]){
                    i.coinArray = []
                    i.initBottom = 0
                    i.betStatus = 0 
                    i.initX = 0
                // }
            })
            //清空籌碼飛彈槍管
            coinList.forEach(i => {
                i.ammo = []
            })
            store.commit('bet/setBetResultRest')
            canBet.value = true
            canUseSmallCoin.value = false
        }
        function showResult () { 
            //為贏的注區套上閃爍動畫
            gameResult.value.forEach((i:number)=>{
                switch(i){
                    case proto.dealer.Result.Banker:
                      let betArea2 = document.querySelectorAll('.betArea-item2') as NodeListOf<HTMLElement>
                        betArea2.forEach((i:HTMLElement)=>{
                            i.classList.add('winAnimation')
                            i.children[1].classList.add('winCoin')  //取得注區數字
                        })
                        break
                    case proto.dealer.Result.Player:
                        let betArea1 = document.querySelectorAll('.betArea-item1') as NodeListOf<HTMLElement>
                        betArea1.forEach((i:HTMLElement)=>{
                            i.classList.add('winAnimation')
                            i.children[1].classList.add('winCoin')  //取得注區數字
                        })
                        break
                    case proto.dealer.Result.BankerPair:
                        let betArea5 = document.querySelectorAll('.betArea-item5') as NodeListOf<HTMLElement>
                        betArea5.forEach((i:HTMLElement)=>{
                            i.classList.add('winAnimation')
                            i.children[1].classList.add('winCoin')  //取得注區數字
                        })
                        break
                     case proto.dealer.Result.Tie:
                        let betArea4 = document.querySelectorAll('.betArea-item4') as NodeListOf<HTMLElement>
                        betArea4.forEach((i:HTMLElement)=>{
                            i.classList.add('winAnimation')
                            i.children[1].classList.add('winCoin')  //取得注區數字
                        })
                        break
                     case proto.dealer.Result.PlayerPair:
                        let betArea3 = document.querySelectorAll('.betArea-item3') as NodeListOf<HTMLElement>
                        betArea3.forEach((i:HTMLElement)=>{
                            i.classList.add('winAnimation')
                            i.children[1].classList.add('winCoin')  //取得注區數字
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
        return{
            //data
            coinList,currentCoint,coinPosition,betStatus,total,betErrorArray,
            //methods
            chooseCoint,cointAnimate,generateCoinAnimate,resetGame,showResult,getAllBetBack,betErrorAnimation,sendBetData,
        }
    }
})
</script>