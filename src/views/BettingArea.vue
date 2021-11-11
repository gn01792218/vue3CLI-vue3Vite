<template>
    <GameresultSound/>
    <div class="betArea">
        <!-- PC版本注區 -->
        <div class="betArea-pc position-relative">
            <ul class="betError position-absolute">
                <transition-group @enter="betErrorAnimation">
                    <li v-for="(betErr,index) in betErrorArray" :key="index">{{betErr}}</li>
                </transition-group>
            </ul>
                <div class="betArea-pc-container">
                    <div :class ="[`betArea-item${index+1}`,i.configClass,'col-6']" v-for ="(i,index) in coinPosition.slice(0,2)" :key ="index" @click ="bet($event,index)" >{{i.host}}<br>{{i.odds}}
                        <span class="betStatus" v-if="i.betStatus>0">{{i.betStatus}}</span>
                        <ul class="coinPosition">
                            <transition-group  v-if="i.coinArray.length>=0" @enter="generateCoinAnimate">
                                <li v-for="(coin,index)  in i.coinArray" :key="index" :class="[coin,`index${index}`]"></li>
                            </transition-group>
                        </ul>
                    </div>
                </div>  
                <div class="betArea-pc-container">
                    <div :class="[`betArea-item${index+3}`,i.configClass,'col-4']" v-for="(i,index) in coinPosition.slice(2,coinPosition.length)" :key="index" @click="bet($event,index+2)" >{{i.host}}<br>{{i.odds}}
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
            <ul class="betError position-absolute">
                <transition-group @enter="betErrorAnimation">
                    <li v-for="(betErr,index) in betErrorArray" :key="index">{{betErr}}</li>
                </transition-group>
            </ul>
            <div class="betArea-mobile-container d-flex">
                <div :class ="[`betArea-item${index+1}`,i.configClass,{'col-6':index===0 | index===1},{'col-4':index!==0 | index!==1}]" v-for ="(i,index) in coinPosition" :key ="index" @click ="bet($event,index)" >{{i.host}}<br>{{i.odds}}
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
        <div class="em font-total">
            Total Bet {{total}}
        </div>
        <!-- coin -->
        <div class="coinArea">
            <!-- coin list -->
            <div :id='`defaultCoin${index+1}`' v-for="(coin,index) in coinList" :key="index" :class="[`coin-menu${index+1}`,coin.point===currentCoint.point ? `coin-menu${index+1}-current` :'']" @click="chooseCoint(index,$event)"></div>
            <!-- coin ammo -->
            <ul class="shotCoinUl d-flex position-absolute">
                <div v-for="coin,index in coinList" :key="index">
                    <transition-group  v-if="coin.ammo.length>=0" @enter="cointAnimate">
                        <div :class="[ammo,'shotCoinPice',`ammo${coin.point}`]" v-for="(ammo,index) in coin.ammo" :key="index"></div>
                    </transition-group>
                </div>
            </ul>
        </div>
        <GameResult/>
        <button class="test position-absolute" @click="getAllBetBack">還我$$$$$$$$$</button>
    </div>
</template>

<script lang="ts">
import {computed, defineComponent, reactive, ref, watch} from 'vue'
import {gsap,Power4} from 'gsap'
import {sendBetCall,sendBetResetCall} from '../socketApi'
import {useStore} from 'vuex'
import GameResult from '@/components/GameResult.vue'
import GameresultSound from '@/components/GameResultSound.vue'
interface currentCoint {
    coinElement:any | null , //選擇的籌碼div元素
    num:number | null,  //儲存點到的是第幾個
    point:number | null,
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
}
interface coinPosition {
    initBottom:number,  //初始化的bottom值
    coinArray:string[],//生籌碼的地方
    odds:string,
    host:string,
    configClass:string,
    betStatus:number //目前這一回合的下注狀況
}
export default defineComponent({
    components:{
        GameResult,GameresultSound,
    },
    setup(){
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
        const total = ref<number>(0)
        const totalBetInfo = computed({  //每次下注的時候都更新totalBet
            get(){
                return store.state.bet.totalBets
            },
            set(num:number){
                total.value = num
            }
            
        })
        
        //監聽
        watch(betStatus,()=>{  //更新每次下注後顯示在注區的數字
            if(betResult.value!==-1){
                coinPosition[0].betStatus = betStatus.value.Banker
                coinPosition[1].betStatus = betStatus.value.Player
                coinPosition[2].betStatus = betStatus.value.BankerPair
                coinPosition[3].betStatus = betStatus.value.Tie
                coinPosition[4].betStatus = betStatus.value.PlayerPair
            }   
        })
        watch(roundUuid,()=>{  //回合開始時重置遊戲
            console.log("開始下注")
            reSetBetAreaAnimation()
            resetGame()
        })
        watch(betResetresult,()=>{  //玩家反悔收回籌碼的動作
            if(betResetresult.value===1){
                 resetGame()
            }
        })
        watch(totalBetInfo,()=>{  //下注總額的更新
            total.value = totalBetInfo.value
        })
        watch(gameResult,()=>{
            clearLoseArea(gameResult.value)
            showResult()
            winCoinAnimation()
        })
        //籌碼動畫、下注邏輯
        const coinList = reactive<coint[]>([  //籌碼基本資料
                    {
                    point:5,
                    ammo:[], //子彈陣列
                    },
                    {
                    point:10,
                    ammo:[], //子彈陣列
                    },
                    {
                    point:50,
                    ammo:[], //子彈陣列
                    },
                    {
                    point:100,
                    ammo:[], //子彈陣列
                    },
                    {
                    point:500,
                    ammo:[], //子彈陣列
                    }
                ])
        const currentCoint = reactive<currentCoint>({ 
            coinElement:null, //選擇的籌碼元素
            num:null,  //儲存點到的是第幾個
            point:null,
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
                initBottom:0,  //初始化的bottom值
                coinArray:[],//生籌碼的地方
                odds:"1:0.95",
                host:"莊家",
                configClass:"betArea-item yellow",
                betStatus:0 //目前這一回合的下注狀況
            },
            {
                initBottom:0,
                coinArray:[],
                odds:"1:1",
                host:"閒家",
                configClass:"betArea-item red",
                betStatus:0 //目前這一回合的下注狀況
            },
            {
                initBottom:0,
                coinArray:[],
                odds:"1:11",
                host:"莊對",
                configClass:"betArea-item yellow",
                betStatus:0 //目前這一回合的下注狀況
            },
            {
                initBottom:0,
                coinArray:[],
                odds:"1:8",
                host:"和局",
                configClass:"betArea-item green",
                betStatus:0 //目前這一回合的下注狀況
            },
            {
                initBottom:0,
                coinArray:[],
                odds:"1:11",
                host:"閒對",
                configClass:"betArea-item yellow",
                betStatus:0 //目前這一回合的下注狀況
            },
        ]) 
        const betErrorArray = ref<Array<string>>([])
        function chooseCoint (index:number,e:MouseEvent) {
            currentCoint.coinElement = e.target; //得到該元素
            currentCoint.x = e.x;  //設置籌碼起始座標點
            currentCoint.y = e.y;
            currentCoint.num = index;
            currentCoint.point = coinList[index].point
        }
        function betErrorAnimation (e:HTMLElement) {
            gsap
            .fromTo(e,{opacity:0},{opacity:1,y:-100,ease:Power4.easeOut,display:"none"})
        }
        function getCenterPoint (leftOrTop:number,rightOrBottom:number):number{
            return leftOrTop+(rightOrBottom-leftOrTop)/2
        }
        function goDefaultCoinPosition(Coin1Rect:DOMRect,liRect:DOMRect,liElement:HTMLElement){
            if(Coin1Rect && liRect){
                let coinX =getCenterPoint(Coin1Rect.left,Coin1Rect.right)
                let coinY =getCenterPoint(Coin1Rect.top,Coin1Rect.bottom)
                let liX = getCenterPoint(liRect.left,liRect.right)
                let liY = getCenterPoint(liRect.top,liRect.bottom)
                console.log("目標",coinX,coinY,"起點",liX,liY)
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
                let betArea = document.querySelectorAll(`.betArea-item${betAreaIndex}`) as NodeListOf<Element>
                betArea.forEach((i)=>{
                     let ul = i.children[2]   //這裡假如沒有下注的時候，會是1
                if(ul){
                    console.log(ul.children)
                    let liList = ul.children as HTMLCollection
                    for(let i = liList.length-1 ; i>=0 ; i--){  //這裡有問題，會數到-1
                        console.log(liList[i])
                        console.log(liList[i].className.split(" ")[0])   //獲得coin-menu4  coin-menu2
                        //問題:會全部解讀成最後一個li的籌碼!!!怪!!!
                        switch(liList[i].className.split(" ")[0]){
                            case 'coin-menu1':
                                let Coin1Rect = document.querySelector('#defaultCoin1')?.getBoundingClientRect() as DOMRect //取得籌碼的正方形
                                let liRect1 = liList[i].getBoundingClientRect() as DOMRect
                                goDefaultCoinPosition(Coin1Rect,liRect1,liList[i] as HTMLElement)
                                console.log("執行coin-menu1動畫")
                                break
                            case 'coin-menu2':
                                let Coin2Rect = document.querySelector('#defaultCoin2')?.getBoundingClientRect() as DOMRect //取得籌碼的正方形
                                let liRect2 = liList[i].getBoundingClientRect() as DOMRect
                                goDefaultCoinPosition(Coin2Rect,liRect2,liList[i] as HTMLElement)
                                console.log("執行coin-menu2動畫")
                                break
                            case 'coin-menu3':
                                let Coin3Rect = document.querySelector('#defaultCoin3')?.getBoundingClientRect() as DOMRect //取得籌碼的正方形
                                let liRect3 = liList[i].getBoundingClientRect() as DOMRect
                                goDefaultCoinPosition(Coin3Rect,liRect3,liList[i] as HTMLElement)
                                console.log("執行coin-menu4動畫")
                                break
                            case 'coin-menu4':
                                let Coin4Rect = document.querySelector('#defaultCoin4')?.getBoundingClientRect() as DOMRect //取得籌碼的正方形
                                let liRect4 = liList[i].getBoundingClientRect() as DOMRect
                                goDefaultCoinPosition(Coin4Rect,liRect4,liList[i] as HTMLElement)
                                console.log("執行coin-menu4動畫")
                                break
                            case 'coin-menu5':
                                let Coin5Rect = document.querySelector('#defaultCoin5')?.getBoundingClientRect() as DOMRect //取得籌碼的正方形
                                let liRect5 = liList[i].getBoundingClientRect() as DOMRect
                                goDefaultCoinPosition(Coin5Rect,liRect5,liList[i] as HTMLElement)
                                console.log("執行coin-menu2動畫")
                                break
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
                // x:-10,
                y:-coinPosition[currentBetPosition.betAreaIndex].initBottom,
                opacity:1,
                display:"block"}
                ]
                
            })
        }
        function loadCoin () {
            if(currentCoint.num!==null){
                coinList[currentCoint.num].ammo.push(currentCoint.coinElement.className)
            }
        }
        function setCoinPosition (cp:coinPosition,e:any) {
            let positionCoinElement = e.target.lastChild.lastChild; //撈取最後一個li元素；第一次點會是text
            if(currentCoint.coinElement){  //有選擇籌碼時，才會生籌碼
                cp.coinArray.push(currentCoint.coinElement.className)  //添加class名稱到注區
                console.log(positionCoinElement.nodeName)
                    cp.initBottom += 5;  //修改樣式
            }
        }
        function bet (e:any,index:number) {
            //使用者的$$如果變成0將不會進入判斷!!!!!
             if(currentCoint.coinElement && currentCoint.point){
                 if(user.value.wallet>=currentCoint.point){
                     //發送下注請求
                    sendBetCall({
                    gameUuid:roundUuid.value,
                    betIndex:currentCoint.num,
                    betArea:index+1,
                    })
                    if(betResult.value!==-1){
                    //裝子彈，就會啟動籌碼飛的動畫
                    loadCoin()  
                    let rect = e.target.getBoundingClientRect();  //固定飛到點擊區域的左下方
                    target.x = rect.left;
                    target.y = rect.bottom;
                    let cp = coinPosition[index]; //用來存點選到的注區
                    currentBetPosition.betAreaIndex = index   //測試用
                    setCoinPosition(cp,e)  //在駐區生成籌碼並設置起始位置 
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
                    }
                }else{
                    betErrorArray.value?.push('餘額不足')
                }
            }
        }
        function getAllBetBack(){
            sendBetResetCall({
                 gameUuid:roundUuid.value,
            })
        }
        function clearLoseArea (winAreaArray:Array<number>) {
            let winArea1 = winAreaArray[0]-1
            let winArea2 = winAreaArray[1]-1  //若沒有，就是undefined
             //清空注區籌碼，除了贏的
            coinPosition.forEach((i,index) => {
                if(index!==winArea1 && index!==winArea2){
                    i.coinArray = []
                    i.initBottom = 0
                    i.betStatus = 0 
                }
            })
        }
        function resetGame () {
            total.value = 0
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
                // }
            })
            //清空籌碼飛彈槍管
            coinList.forEach(i => {
                i.ammo = []
            })
            store.commit('bet/setBetResultRest')
        }
        function showResult () { 
            //為贏的注區套上閃爍動畫
            gameResult.value.forEach((i:number)=>{
                let betArea = document.querySelectorAll(`.betArea-item${i}`) as NodeListOf<HTMLElement>
                betArea.forEach((i:HTMLElement)=>{
                    i.classList.add('winAnimation')
                    i.children[1].classList.add('winCoin')  //取得注區數字
                })
            })
            let betAreaMoney = document.querySelectorAll('.betStatus') as NodeListOf<HTMLElement>
            betAreaMoney.forEach((i:HTMLElement)=>{
                if(!i.className.includes('winCoin'))
                     i.style.color = "grey"
            })
        }
        function reSetBetAreaAnimation(){
            if(gameResult.value){
                gameResult.value.forEach((i:number)=>{
                let betArea = document.querySelectorAll(`.betArea-item${i}`) as NodeListOf<HTMLElement>
                 betArea.forEach((i:HTMLElement)=>{
                    i.classList.remove('winAnimation')
                })
            })
            }
        }
        return{
            //data
            coinList,currentCoint,coinPosition,betStatus,total,betErrorArray,
            //methods
            chooseCoint,cointAnimate,generateCoinAnimate,bet,resetGame,showResult,getAllBetBack,betErrorAnimation,
        }
    }
})
</script>