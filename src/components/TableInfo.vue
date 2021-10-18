<template>
  <!--- tab --->
    <div class="tabs-area">
        <div class="tabs-bottom">
            <div v-for="(tab,index) in tabArray" :key="index" @click="switchTab(tab)" :class="{onclick:onClickTab===tab}" >{{tab}}</div>
        </div>
        <ul class="demo">
            <li class="tbTab" v-show="onClickTab===tabArray[0]">
                <section>
                    <div class="row">
                        <div class="col-6 text-md-left ulstynone">
                            <li class="font-red">Banker 52%</li>    
                            <li class="font-yellow">Player 46%</li> 
                            <li class="font-green">Tie 2%</li> 
                            <li class="font-red">Banker Pair</li> 
                            <li class="font-yellow">Player Pair</li> 
                            <li class="font-red">Banker Natural</li> 
                            <li class="font-yellow">Player Natural</li>
                        </div>
                        <div class="col-6 text-md-right ulstynone" v-if="betInfo">
                            <li v-for="(i,index) in betInfo" :key="index">{{i}}</li>
                        </div>
                    </div>
                </section>
            </li>
            <li v-show="onClickTab===tabArray[1]">
                <button class="shocardBtn" @click="showCards">取得當前卡牌</button>
                <section class="card-container justify-content-center">
                    <div class="row card-box">
                        <div :class="['caritem',{'card-item-w col-9':index === 0}]"  v-for="(card,index) in cards.banker" :key="index">
                            <div :class="[`bankPoker${index}`]"></div>
                        </div>
                    </div>
                    <div class="row card-box">
                       <div :class="['caritem',{'card-item-w col-9':index === 0}]"  v-for="(card,index) in cards.player" :key="index">
                           <div :class="[`playerPoker${index}`]"></div>
                       </div>
                    </div>
                </section>
            </li>  
        </ul>
    </div>
</template>

<script>
import {defineComponent, reactive, ref,nextTick,computed} from 'vue'
import {useStore} from 'vuex'
export default defineComponent({
     props: {
        betStatus:{
            type:Object,
            default:{},
        }
    },
    setup(){
        // vuex
        const store = useStore()
        const betInfo = computed(()=>{
            return store.state.table.TableJoinRecall.table.betStatus
        })

        //切換TableInfo頁籤
        const tabArray = reactive(["Table Info","Cards"]) //將來有需要可以再增加
        const onClickTab = ref("Cards") //預設是Cards
        function switchTab (tab) {
             onClickTab.value = tab
        }
        
        //撲克牌業務代碼
        const cards = reactive({  //內含莊閒的卡牌陣列
            banker:new Array(3),
            player:new Array(3),
        })
        const cardCound = ref(0) //計算開第幾張牌了
        function pushCards () {
            //回合結束時開牌，
            //1.假如可以開牌，從Vuex中取得卡牌資訊
            if(cardCound.value<3){
                cards.banker[cardCound.value] = '0-11'
                cards.player[cardCound.value] = '3-9'
            }
            cardCound.value++
        }
        function resetCards () {
            //到時應該是回合結束時開牌，新回合開始時reset
            cardCound.value=0
            for(let i=0 ;i<3;i++){
                cards.banker[i]=null
                cards.player[i]=null
                let bankPoker = document.querySelector(`.bankPoker${i}`)
                let playerPoker = document.querySelector(`.playerPoker${i}`)
                bankPoker.classList.remove('poker')
                playerPoker.classList.remove('poker')
            }
        }
        function showCards () { //每次開牌，伺服器就會傳一次，server給的陣列固定長度3，還沒開牌的給空值即可
            pushCards()
            const uw = 373
            const uh = 556
            //2.顯示卡牌
            //  //其實這裡只需要每次跑陣列就可以
            if(cardCound.value<=3){
                for(let i =0; i<3; i++){
                //前兩張從index 1 2
                    let bankPoker = document.querySelector(`.bankPoker${i+1}`)
                    let playerPoker = document.querySelector(`.playerPoker${i+1}`)
                        if(i===2){ //最後一張要放在第一格
                            bankPoker = document.querySelector('.bankPoker0') 
                            playerPoker = document.querySelector('.playerPoker0')
                        }
                        if(cards.banker[i] && cards.player[i]){
                            const bcArr = cards.banker[i].split("-")
                            const pcArr = cards.player[i].split("-")
                            bankPoker.classList.add('poker')
                            playerPoker.classList.add('poker')
                            bankPoker.style.backgroundPosition = `-${(bcArr[1]-1)*uw}px -${bcArr[0]*uh}px`
                            playerPoker.style.backgroundPosition = `-${(pcArr[1]-1)*uw}px -${pcArr[0]*uh}px`
                        }
                }
            }else{
                resetCards()
            }
        }
        return{
            //data
            tabArray,onClickTab,cards,betInfo,cardCound,
            //methods
            switchTab,showCards
        }
    }
})
</script>

<style lang="scss">
    .tbTab{
        list-style: none;
    }
    .tabs-bottom{
        display: flex;
        div{
            cursor: pointer;
            padding:10px 35px;
        }
    }
    .onclick{
        background-color: black;
    }
    .card-container{
        display: flex;
    }    
    .card-box{
        // border:yellow 1px solid;
        justify-content: center;
    }
    .caritem{
        pointer-events: none; //使能被穿透
        width:373px;
        height:566px;
        zoom:0.25; //這個方式的話 必須要每種此吋下去塞選
        //預設margin，響應式的時候可以依照情況拿掉
        margin-right:40px;
        margin-left:40px;
    }
    .card-item-w{
        display: flex;
        transform: rotate(90deg);
        justify-content: center;
    }
    .poker{
        width:373px;
        height:556px;
        background-image:url('../images/poker.png');
    }
    .ulstynone{
        list-style: none;
    }
    .shocardBtn{
        position: absolute;
    }
</style>