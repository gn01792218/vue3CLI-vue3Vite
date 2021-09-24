<template>
    <div class="stand-box">
        <div class="flex">
            <div id="one" class="item flex-1" @click="shot($event)">莊家1:0.95</div>
            <div id="two" class="item flex-2"  @click="shot($event)">閒家1:1</div>
        </div>  
        <div class="flex">
            <div id="three" class="item yellow"  @click="shot($event)">莊對1:11</div>
            <div id="four" class="item green"  @click="shot($event)">和局1:8</div>
            <div id="five" class="item yellow"  @click="shot($event)">閒對1:11</div>
        </div>
        <div class="em font-totel">Total Bet 0.00</div>
    </div>
    <div class="coin-area">
        <img class="s" :src=coin.url alt="" v-for="coin,index in coin" :key="index" @click="chooseCoint(index,$event)">
          <!-- 表情符號子彈 -->
        <ul class="shotCoinUl">
            <transition-group v-if="coinAmmo.coin5.length>0" @enter="cointAnimate">
                <img class="shotCoinPice coin5"  :src="coin.src" :alt="coin.point" v-for="coin,index in coinAmmo.coin5" :key="index+1">
            </transition-group>
            <transition-group v-if="coinAmmo.coin10.length>0" @enter="cointAnimate">
                <img class="shotCoinPice coin10"  :src="coin.src" :alt="coin.point" v-for="coin,index in coinAmmo.coin10" :key="index+1">
            </transition-group>
            <transition-group v-if="coinAmmo.coin50.length>0" @enter="cointAnimate">
                <img class="shotCoinPice coin50"  :src="coin.src" :alt="coin.point" v-for="coin,index in coinAmmo.coin50" :key="index+1">
            </transition-group>
            <transition-group v-if="coinAmmo.coin100.length>0" @enter="cointAnimate">
                <img class="shotCoinPice coin100"  :src="coin.src" :alt="coin.point" v-for="coin,index in coinAmmo.coin100" :key="index+1">
            </transition-group>
            <transition-group v-if="coinAmmo.coin500.length>0" @enter="cointAnimate">
                <img class="shotCoinPice coin500"  :src="coin.src" :alt="coin.point" v-for="coin,index in coinAmmo.coin500" :key="index+1">
            </transition-group>
        </ul>
    </div>
  
</template>

<script>
import {defineComponent, reactive, ref} from 'vue'
import {gsap,Power4} from 'gsap'
export default defineComponent({
    setup(){
        const coin = reactive([  //籌碼基本資料
                    {
                    url:require("../images/coin5.png"),
                    point:5,
                    },
                    {
                    url:require("../images/coin10.png"),
                    point:10,
                    },
                    {
                    url:require("../images/coin50.png"),
                    point:50,
                    },
                    {
                    url:require("../images/coin100.png"),
                    point:100,
                    },
                    {
                    url:require("../images/coin500.png"),
                    point:500,
                    }
                ])
        const coinAmmo = reactive({  //coin彈藥庫，shot的時候push填彈
            coin5:[],
            coin10:[],
            coin50:[],
            coin100:[],
            coin500:[],
        })
        const currentCoint = reactive({ //選擇的籌碼
            coinElement:HTMLElement | null, //選擇的img元素
            point:Number | null,
            x:Number | null, //起飛的x
            y:Number | null, //起飛的y
        });  
        const target = reactive({ //目標位置
            x:Number | null,
            y:Number | null,
        })
        const chooseCoint = (index,e)=>{ //點選籌碼的設置
            currentCoint.coinElement=e.target; //得到該元素
            currentCoint.x=e.x;
            currentCoint.y=e.y;
            switch(index){
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
        const cointAnimate = (e)=>{
            console.log("啟動動畫")
            gsap
            .to(e,{
                keyframes:[
                    {
                        scale:1.5,
                    },
                    {duration:0.8,
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
        const loadCoin = ()=>{
            switch(currentCoint.point){
                case 5:
                coinAmmo.coin5.push(currentCoint.coinElement)
                    break;
                case 10:
                coinAmmo.coin10.push(currentCoint.coinElement)
                    break;
                case 50:
                coinAmmo.coin50.push(currentCoint.coinElement)
                    break;
                case 100:
                coinAmmo.coin100.push(currentCoint.coinElement)
                    break;
                case 500:
                coinAmmo.coin500.push(currentCoint.coinElement)
                    break;
            }
        }
        const shot = (e)=>{  //點下注區的時候啟動shot
            loadCoin()  //把當前點選到的裝子彈
            cointAnimate(e)
            target.x = e.x;
            target.y = e.y;
            //假如要在該區域產生籌碼，在這裡產生
            // switch(e.target.id){  
            //     case "one":
                
            //         break;
            //     case "two":
                  
            //         break;
            //     case "three":
                     
            //         break;
            //     case "four":
                     
            //         break;
            //     case "five":
                    
            //         break;
            // }
        }
        return{
            coin,coinAmmo,currentCoint,target,chooseCoint,cointAnimate,loadCoin,shot
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
    }
    .shotCoinUl{  
        display: flex;
        position: absolute;
        top:0%;
        .shotCoinPice{
            position: absolute;
            left:0%;
            z-index:-1;
            transform: scale(0.7);
        }
        .coin5{
            left:-10px;
        }
        .coin10{
            left:45px;
        }
        .coin50{
            left:105px;
        }
        .coin100{
            left:162px;
        }
        .coin500{
           left:220px;
        }
    }
</style>