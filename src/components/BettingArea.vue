<template>
    <div class="stand-box">
        <div class="flex">
            <div  :id="i.id" :class="i.configClass" v-for="(i,index) in coinPosition.slice(0,2)" :key="index" @click="bet($event,index)" >{{i.host}}<br>{{i.odds}}
                <ul class="coinPosition">
                    <transition-group  v-if="i.coinArray.length>=0" @enter="generateCoin">
                        <li v-for="(coin,index)  in i.coinArray" :key="index" :class="coin"></li>
                    </transition-group>
                </ul>
            </div>
        </div>  
        <div class="flex">
            <div  :id="i.id" :class="i.configClass" v-for="(i,index) in coinPosition.slice(2,coinPosition.length)" :key="index" @click="bet($event,index+2)" >{{i.host}}<br>{{i.odds}}
                <ul class="coinPosition">
                    <transition-group  v-if="i.coinArray.length>=0" @enter="generateCoin">
                        <li v-for="(coin,index)  in i.coinArray" :key="index" :class="coin"></li>
                    </transition-group>
                </ul>
            </div>
        </div>
        <div class="em font-totel">Total Bet {{totalBet}}</div>
    </div>
    <div class="coin-area">
        <button @click="resetGame">重置遊戲</button>
        <!-- 籌碼列表 -->
        <div v-for="(coin,index) in coin" :key="index" class="coin" :class="[`coin-menu${index+1}`,coin.point===currentCoint.point ? `coin-menu${index+1}-current` :'']" @click="chooseCoint(index,$event)"></div>
        <!-- 籌碼子彈 -->
        <ul class="shotCoinUl">
            <div v-for="coin,index in coin" :key="index">
            <transition-group  v-if="coin.ammo.length>=0" @enter="cointAnimate">
                <div :class="[ammo,'shotCoinPice',`ammo${coin.point}`]" v-for="(ammo,index) in coin.ammo" :key="index+1"></div>
            </transition-group>
            </div>
        </ul>
    </div>
</template>

<script>
import {computed, defineComponent, reactive, ref} from 'vue'
import {gsap,Power4} from 'gsap'
export default defineComponent({
    setup(){
        //下注額度
        let totalBet = ref(0)
        //籌碼動畫、注區動畫
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
            point:Number | null,
            x:Number | null, //起飛的x
            y:Number | null, //起飛的y
        });  
        const target = reactive({ //目標位置
            x:Number | null,
            y:Number | null,
        })
        const coinPosition = reactive([//注區
            {
                id:"one",
                initBottom:0,  //初始化的bottom值
                coinArray:[],//生籌碼的地方
                odds:"1:0.95",
                host:"莊家",
                configClass:"item flex-1"
                
            },
            {
                id:"two",
                initBottom:0,
                coinArray:[],
                odds:"1:1",
                host:"閒家",
                configClass:"item flex-2"
            },
            {
                id:"three",
                initBottom:0,
                coinArray:[],
                odds:"1:11",
                host:"莊對",
                configClass:"item yellow"
            },
            {
                id:"four",
                initBottom:0,
                coinArray:[],
                odds:"1:8",
                host:"和局",
                configClass:"item green"
            },
            {
                id:"five",
                initBottom:0,
                coinArray:[],
                odds:"1:11",
                host:"閒對",
                configClass:"item yellow"
            },
        ]) 
        const chooseCoint = (index,e)=>{ //點選籌碼的設置
            currentCoint.coinElement=e.target; //得到該元素
            currentCoint.x=e.x;  //設置籌碼起始座標點
            currentCoint.y=e.y;
            switch(index){  //設置點數
                case 0:
                    currentCoint.point = coin[0].point;
                    break;
                case 1:
                    currentCoint.point = coin[1].point;
                    break;
                case 2:
                    currentCoint.point = coin[2].point;
                    break;
                case 3:
                    currentCoint.point = coin[3].point;
                    break;
                case 4:
                    currentCoint.point = coin[4].point;
                    break;
            }
        }
        const cointAnimate = (e)=>{  //籌碼飛的動畫
            gsap
            .to(e,{
                keyframes:[
                    {
                    scale:1.1,
                    },
                    {duration:0.5,
                    ease:Power4.easeIn,
                    scale:0.5,
                    x:target.x-currentCoint.x,
                    y:target.y-currentCoint.y,
                    zIndex:"1",
                    },
                    {
                        display:"none"
                    }
                ]
            })
        }
        const generateCoin = (e)=>{
            console.log("啟動動畫")
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
        const loadCoin = ()=>{
            switch(currentCoint.point){  //子彈裝到子彈陣列
                case 5:
                    coin[0].ammo.push(currentCoint.coinElement.className)
                    break;
                case 10:
                    coin[1].ammo.push(currentCoint.coinElement.className)
                    break;
                case 50:
                    coin[2].ammo.push(currentCoint.coinElement.className)
                    break;
                case 100:
                    coin[3].ammo.push(currentCoint.coinElement.className)
                    break;
                case 500:
                    coin[4].ammo.push(currentCoint.coinElement.className)
                    break;
            }
        }
        const setCoinPosition=(cp,positionCoinElement)=>{
            cp.coinArray.push(currentCoint.coinElement.className)
            cp.initBottom+=5;
            if(positionCoinElement.nodeName !== '#text'){
                    positionCoinElement.style.bottom=`${cp.initBottom}px`
                    }  
        }
        const bet = (e,index)=>{  //下注!
            //下注額度改變
            totalBet.value+=currentCoint.point
            //裝子彈，就會啟動籌碼飛的動畫
            loadCoin()  
            let rect = e.target.getBoundingClientRect();  //固定飛到點擊區域的左下方
            target.x = rect.left;
            target.y = rect.bottom;
            let cp =coinPosition[index]; //用來存點選到的注區
            let positionCoinElement = e.target.lastChild.lastChild.previousSibling; //撈取最後一個li元素；第一次點會是text
            setCoinPosition(cp,positionCoinElement)  //在駐區生成籌碼並設置起始位置
        }
        const resetGame = ()=>{
            //重置totalBet
            totalBet.value = 0
            //清空注區籌碼
            coinPosition.forEach(i=>{
                i.coinArray=[]
            })
            //清空籌碼飛彈槍管
            coin.forEach(i=>{
                i.ammo = []
            })
        }
        return{
            //data
            totalBet,coin,currentCoint,coinPosition,
            //methods
            chooseCoint,cointAnimate,generateCoin,bet,resetGame
        }
    }
})
</script>

<style lang="scss">
    .item,.s{
        cursor: pointer;
    }
    .coin-area{
        position: relative;
        .coin{
            cursor: pointer;
        }
    }
    .shotCoinUl{  
        display: flex;
        position: absolute;
        .shotCoinPice{
            position: absolute;
            transform: scale(0.7);
        }
        .ammo5{
            left:0px;
        }
        .ammo10{
            left:65px;
        }
        .ammo50{
            left:130px;
        }
        .ammo100{
            left:197px;
        }
        .ammo500{
           left:260px;
        }
    }
    #one,#two,#three,#four,#five{
        position: relative;
    }
    .coinPosition{
            li{
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
</style>