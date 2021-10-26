<template>
    <div class="betArea">
        <!-- PC版本注區 -->
        <div class="betArea-pc">
                <div class="betArea-pc-container">
                    <div :class ="i.configClass" v-for ="(i,index) in coinPosition.slice(0,2)" :key ="index" @click ="bet($event,index)" >{{i.host}}<br>{{i.odds}}
                        <span class="betStatus" v-if="i.betStatus>0">{{i.betStatus}}</span>
                        <ul class="coinPosition">
                            <transition-group  v-if="i.coinArray.length>=0" @enter="generateCoin">
                                <li v-for="(coin,index)  in i.coinArray" :key="index" :class="[coin,`index${index}`]"></li>
                            </transition-group>
                        </ul>
                    </div>
                </div>  
                <div class="betArea-pc-container">
                    <div :class="i.configClass" v-for="(i,index) in coinPosition.slice(2,coinPosition.length)" :key="index" @click="bet($event,index+2)" >{{i.host}}<br>{{i.odds}}
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
            <div class="betArea-mobile-container flexs">
                <div :class ="i.configClass" v-for ="(i,index) in coinPosition" :key ="index" @click ="bet($event,index)" >{{i.host}}<br>{{i.odds}}
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
            <TotalBet/>
        </div>
        <!-- coin -->
        <div class="coinArea">
            <!-- <button @click="resetGame">重置遊戲</button> -->
            <!-- coin list -->
            <div v-for="(coin,index) in coin" :key="index" :class="[`coin-menu${index+1}`,coin.point===currentCoint.point ? `coin-menu${index+1}-current` :'','coin']" @click="chooseCoint(index,$event)"></div>
            <!-- coin ammo -->
            <ul class="shotCoinUl d-flex position-absolute">
                <div v-for="coin,index in coin" :key="index">
                    <transition-group  v-if="coin.ammo.length>=0" @enter="cointAnimate">
                        <div :class="[ammo,'shotCoinPice',`ammo${coin.point}`]" v-for="(ammo,index) in coin.ammo" :key="index+1"></div>
                    </transition-group>
                </div>
            </ul>
        </div>
    </div>
    
</template>

<script>
import {computed, defineComponent, reactive, watch} from 'vue'
import {gsap,Power4} from 'gsap'
import {sendBetCall,sendBetResetCall} from '../socketApi'
import {useStore} from 'vuex'
import TotalBet from'@/components/ToTalBet.vue'
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

        })
        const roundStatus = computed(()=>{ //遊戲回合狀態
            
        })
        //監聽
        watch(betStatus,()=>{
            coinPosition[0].betStatus = betStatus.value.Banker
            coinPosition[1].betStatus = betStatus.value.Player
            coinPosition[2].betStatus = betStatus.value.BankerPair
            coinPosition[3].betStatus = betStatus.value.Tie
            coinPosition[4].betStatus = betStatus.value.PlayerPair
        })
        //籌碼動畫、下注邏輯
        const coin = reactive([  //籌碼基本資料
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
        const currentCoint = reactive({ //選擇的籌碼
            coinElement:HTMLElement | null, //選擇的籌碼div元素
            num:Number | null,  //儲存點到的是第幾個
            point:Number | null,
            x:Number | null, //起飛的x
            y:Number | null, //起飛的y
        });  
        const target = reactive({ //目標位置
            x : Number | null,
            y : Number | null,
        })
        const coinPosition = reactive([//注區
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
        function chooseCoint (index,e) {
            currentCoint.coinElement = e.target; //得到該元素
            currentCoint.x = e.x;  //設置籌碼起始座標點
            currentCoint.y = e.y;
            currentCoint.num = index;
            currentCoint.point = coin[index].point
        }
        function cointAnimate (e) {
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
        function generateCoin (e) {
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
            coin[currentCoint.num].ammo.push(currentCoint.coinElement.className)
        }
        function setCoinPosition (cp,positionCoinElement) {
            cp.coinArray.push(currentCoint.coinElement.className)
                if(positionCoinElement.nodeName !== '#text'){
                cp.initBottom += 5;
                positionCoinElement.style.bottom = `${cp.initBottom}px`
            }  
        }
        function bet (e,index) {
             if(currentCoint.coinElement && user.value.wallet>=currentCoint.point){
                //發送下注請求
                sendBetCall({
                    gameUuid:'@13E2F345FF6p7890',
                    betIndex:currentCoint.num,
                    betArea:index+1,
                })
                if(betResult.value!==-1){
                    //下注額度改變
                    // totalBet.value += currentCoint.point
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
            }else if(user.value.wallet<currentCoint.point){
                    alert("餘額不足")
            }else if(roundStatus.value!==1){
                alert('非下注時間')
            }
        }
        function resetGame () {
            sendBetResetCall({
                 gameUuid:'@13E2F345FF6p7890',
            })
            //重置totalBet-->到時候
            // totalBet.value = 0
            //清空選取的籌碼
            currentCoint.coinElement = null
            currentCoint.point = null
            //清空注區籌碼
            coinPosition.forEach(i => {
                i.coinArray = []
                i.initBottom = 0
                i.betStatus = 0 
            })
            //清空籌碼飛彈槍管
            coin.forEach(i => {
                i.ammo = []
            })
        }
        return{
            //data
            coin,currentCoint,coinPosition,betStatus,
            //methods
            chooseCoint,cointAnimate,generateCoin,bet,resetGame
        }
    }
})
</script>

<style lang="scss">
    .shotCoinUl{  
        .shotCoinPice{
            pointer-events: none; //使能被穿透
            position: absolute;
            top:-25px;
        }
        .ammo5{
            left:10px;
        }
        .ammo10{
            left:85px;
        }
        .ammo50{
            left:165px;
        }
        .ammo100{
            left:247px;
        }
        .ammo500{
           left:330px;
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