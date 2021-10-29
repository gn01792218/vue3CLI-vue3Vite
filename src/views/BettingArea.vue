<template>
    <div class="betArea">
        <!-- PC版本注區 -->
        <div class="betArea-pc">
                <div class="betArea-pc-container">
                    <div :class ="[i.configClass,'col-6']" v-for ="(i,index) in coinPosition.slice(0,2)" :key ="index" @click ="bet($event,index)" >{{i.host}}<br>{{i.odds}}
                        <span class="betStatus" v-if="i.betStatus>0">{{i.betStatus}}</span>
                        <ul class="coinPosition">
                            <transition-group  v-if="i.coinArray.length>=0" @enter="generateCoin">
                                <li v-for="(coin,index)  in i.coinArray" :key="index" :class="[coin,`index${index}`]"></li>
                            </transition-group>
                        </ul>
                    </div>
                </div>  
                <div class="betArea-pc-container">
                    <div :class="[i.configClass,'col-4']" v-for="(i,index) in coinPosition.slice(2,coinPosition.length)" :key="index" @click="bet($event,index+2)" >{{i.host}}<br>{{i.odds}}
                        <span class="betStatus" v-if="i.betStatus>0">{{i.betStatus}}</span>
                        <ul class="coinPosition">
                            <transition-group  v-if="i.coinArray.length>=0" @enter="generateCoin">
                                <li v-for="(coin,index)  in i.coinArray" :key="index" :class="[coin,`index${index}`]"></li>
                            </transition-group>
                        </ul>
                    </div>
                </div>
        </div>
        <!-- mobile注區 -->
        <div class="betArea-mobile">
            <div class="betArea-mobile-container d-flex">
                <div :class ="[i.configClass,{'col-6':index===0 | index===1},{'col-4':index!==0 | index!==1}]" v-for ="(i,index) in coinPosition" :key ="index" @click ="bet($event,index)" >{{i.host}}<br>{{i.odds}}
                    <span class="betStatus" v-if="i.betStatus>0">{{i.betStatus}}</span>
                    <ul class="coinPosition">
                        <transition-group  v-if="i.coinArray.length>=0" @enter="generateCoin">
                            <li v-for="(coin,index)  in i.coinArray" :key="index" :class="[coin,`index${index}`]"></li>
                        </transition-group>
                    </ul>
                </div>
            </div>
        </div>
        <!-- total Bet -->
        <div class="em font-total">
            Total Bet <TotalBet/>
        </div>
        <!-- coin -->
        <div class="coinArea">
            <!-- coin list -->
            <div v-for="(coin,index) in coinList" :key="index" :class="[`coin-menu${index+1}`,coin.point===currentCoint.point ? `coin-menu${index+1}-current` :'','coin']" @click="chooseCoint(index,$event)"></div>
            <!-- coin ammo -->
            <ul class="shotCoinUl d-flex position-absolute">
                <div v-for="coin,index in coinList" :key="index">
                    <transition-group  v-if="coin.ammo.length>=0" @enter="cointAnimate">
                        <div :class="[ammo,'shotCoinPice',`ammo${coin.point}`]" v-for="(ammo,index) in coin.ammo" :key="index"></div>
                    </transition-group>
                </div>
            </ul>
        </div>
    </div>
    
</template>

<script lang="ts">
import {computed, defineComponent, reactive, ref, watch} from 'vue'
import {gsap,Power4} from 'gsap'
import {sendBetCall,sendBetResetCall} from '../socketApi'
import {useStore} from 'vuex'
import TotalBet from'@/components/ToTalBet.vue'
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
        TotalBet,
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
        const roundUuid = computed(()=>{ //遊戲回合的Uuid
            return store.state.game.gameUuid
        })
        const roundStatus = computed(()=>{ //遊戲回合狀態
            return 1
        })
        //基本資料
        const test = ref(false)
        //監聽
        watch(betStatus,()=>{
            coinPosition[0].betStatus = betStatus.value.Banker
            coinPosition[1].betStatus = betStatus.value.Player
            coinPosition[2].betStatus = betStatus.value.BankerPair
            coinPosition[3].betStatus = betStatus.value.Tie
            coinPosition[4].betStatus = betStatus.value.PlayerPair
        })
        watch(roundUuid,()=>{
            resetGame()
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
        const target = reactive<target>({ //目標位置
            x : 0,
            y : 0,
        })
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
        function chooseCoint (index:number,e:MouseEvent) {
            currentCoint.coinElement = e.target; //得到該元素
            currentCoint.x = e.x;  //設置籌碼起始座標點
            currentCoint.y = e.y;
            currentCoint.num = index;
            currentCoint.point = coinList[index].point
        }
        function cointAnimate (e:any) {
            gsap
            .to(e,{
                keyframes:[
                    {
                    // scale:1.1,
                    },
                    {duration:0.8,
                    ease:Power4.easeIn,
                    scale:0.5,
                    x:target.x-currentCoint.x,
                    y:target.y-currentCoint.y-50,
                    zIndex:"1",
                    },
                    {
                        display:"none"
                    }
                ]
            })
        }
        function generateCoin (e:HTMLElement) {
            gsap
            .to(e,{
                keyframes:[
                    {
                        duration:0.5,
                        x:-10,
                        opacity:1,
                        display:"block"
                    }
                ]
                    
            })
        }
        function loadCoin () {
            if(currentCoint.num!==null){
                coinList[currentCoint.num].ammo.push(currentCoint.coinElement.className)
            }
        }
        function setCoinPosition (cp:coinPosition,positionCoinElement:HTMLElement) {
            if(currentCoint.coinElement){
                 cp.coinArray.push(currentCoint.coinElement.className)
                if(positionCoinElement.nodeName !== '#text'){
                cp.initBottom += 5;
                positionCoinElement.style.bottom = `${cp.initBottom}px`
            }  
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
                    let positionCoinElement = e.target.lastChild.lastChild.previousSibling; //撈取最後一個li元素；第一次點會是text
                    setCoinPosition(cp,positionCoinElement)  //在駐區生成籌碼並設置起始位置 
                }else if(betResult.value===-1){
                    alert("伺服器忙碌中，請重下")
                }
                }else{
                if(currentCoint.point && user.value.wallet < currentCoint.point){
                     alert("餘額不足")
                }
                if(roundStatus.value!==1){
                    alert('非下注時間')
                }
            }
            }
        }
        function resetGame () {
            sendBetResetCall({
                 gameUuid:roundUuid.value,
            })
            //清空選取的籌碼
            currentCoint.coinElement = null
            currentCoint.point = null
            currentCoint.num = null
            //清空注區籌碼
            coinPosition.forEach(i => {
                i.coinArray = []
                i.initBottom = 0
                i.betStatus = 0 
            })
            //清空籌碼飛彈槍管
            coinList.forEach(i => {
                i.ammo = []
            })
        }
        return{
            //data
            coinList,currentCoint,coinPosition,betStatus,test,
            //methods
            chooseCoint,cointAnimate,generateCoin,bet,resetGame
        }
    }
})
</script>

<style lang="scss">
    .alert{
    position: absolute;
    top:0;
    left:0;
    }
    .shotCoinUl{  
        .shotCoinPice{
            pointer-events: none; //使能被穿透
            position: absolute;
            top:-25px;
        }
        .ammo5{
            left:-300px;
        }
        .ammo10{
            left:-150px;
        }
        .ammo50{
            left:-50px;
        }
        .ammo100{
            left:100px;
        }
        .ammo500{
           left:220px;
        }
    }
    .coinPosition{
            li{
                pointer-events: none; //使能被穿透
                position: absolute;
                transform: scale(0.5);
                clear: left;
                left:0;
                bottom:0;
            }
        }
    .activeCoin {
        box-shadow: 0px 0px 25px rgba(255, 255, 178, 1);
    }
    .betStatus{
        pointer-events: none; //使能被穿透
        color:white;
        position: absolute;
        bottom:0;
        font-size: 2rem;
        z-index:1;
    }
</style>