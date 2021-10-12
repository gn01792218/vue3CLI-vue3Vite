<template>
  <!--- tab --->
    <div class="tabs-area">
        <div class="tabs-bottom">
            <div v-for="(tab,index) in tabArray" :key="index" @click="switchTab(tab)" :class="{onclick:onClickTab===tab}" >{{tab}}</div>
        </div>
        <ul class="demo">
            <li v-show="onClickTab===tabArray[0]">
                <section>
                    <div class="row">
                        <div class="col-6 text-md-left">
                            <li class="font-red">Banker 52%</li>    
                            <li class="font-yellow">Player 46%</li> 
                            <li class="font-green">Tie 2%</li> 
                            <li class="font-red">Banker Pair</li> 
                            <li class="font-yellow">Player Pair</li> 
                            <li class="font-red">Banker Natural</li> 
                            <li class="font-yellow">Player Natural</li>
                        </div>
                        <div class="col-6 text-md-right" v-if="betInfo">
                            <li>{{betInfo.Banker}}</li> 
                            <li>{{betInfo.Player}}</li> 
                            <li>{{betInfo.Tie}}</li> 
                            <li>{{betInfo.PlayerPair}}</li> 
                            <li>{{betInfo.BankerPair}}</li> 
                            <li>{{betInfo.BankerNatural}}</li> 
                            <li>{{betInfo.PlayerNatural}}</li>
                        </div>
                    </div>
                </section>
            </li>
            <li v-show="onClickTab===tabArray[1]">
                <button @click="showCards">取得當前卡牌</button>
                <section class="card-container">
                    <div class="row" v-if="cards.banker.length">
                        <div :class="['col-6',{'card-item-w col-7':index === 0}]"  v-for="(card,index) in cards.banker" :key="index">
                            <div :class="[`bankPoker${index}`,'poker']"></div>
                            <!-- <img :src="require(`../images/poker/${card}.png`)" :alt="card" width=373 height=556> -->
                        </div>
                    </div>
                    <div class="row" v-if="cards.player.length">
                       <div :class="['col-6',{'card-item-w col-7':index === 0}]"  v-for="(card,index) in cards.player" :key="index">
                           <div :class="[`playerPoker${index}`,'poker']"></div>
                            <!-- <img :src="require(`../images/poker/${card}.png`)"> -->
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
        const switchTab = (tab) => {
            onClickTab.value = tab
        }
        //撲克牌業務代碼
        const cards = reactive({
            banker:[
                
            ],
            player:[],
        })
        // const pushCards = ()=>{
        //     //1.假如可以開牌，從Vuex中取得卡牌資訊
        //     cards.banker = ['0-11','2-7','3-9']
        //     cards.player = ['3-10','2-9','1-13']
        // }
        const showCards = () => {
            // pushCards()
            const bc = ['0-11','2-7','3-9']
            const pc = ['3-10','2-9','1-13']
            const uw = 373
            const uh = 556
            //2.顯示卡牌
            for(let i = 0 ; i <3 ;i++){
                cards.banker[i] = bc[i]
                cards.player[i] = pc[i]
                const bcArr = cards.banker[i].split("-")
                const  pcArr = cards.player[i].split("-")
                nextTick(()=>{
                let bankPoker = document.querySelector(`.bankPoker${i}`)
                let playerPoker = document.querySelector(`.playerPoker${i}`)
                bankPoker.style.backgroundPosition = `-${(bcArr[1]-1)*uw}px -${bcArr[0]*uh}px` 
                playerPoker.style.backgroundPosition = `-${(pcArr[1]-1)*uw}px -${pcArr[0]*uh}px` 
                })
            }
        }
        return{
            //data
            tabArray,onClickTab,cards,betInfo,
            //methods
            switchTab,showCards
        }
    }
})
</script>

<style lang="scss">
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
    .card-item-w{
        transform: rotate(90deg) translateY(-30%);
    }
    .poker{
        width:373px;
        height:556px;
        background-image:url('../images/poker.png');
        zoom:0.25;  //這個方式的話 必須要每種此吋下去塞選
    }
</style>