<template>
  <!--- tab --->
    <div class="tabsArea">
        <div class="tabsArea-btn d-flex">
            <div v-for="(tab,index) in tabArray" :key="index" @click="switchTab(tab)" :class="{onclickTab:onClickTab===tab}" >{{tab}}</div>
        </div>
        <div class="tabsArea-showItem">
            <BetInfor v-show="onClickTab===tabArray[0]"/>
            <div v-show="onClickTab===tabArray[1]"> 
                <CardInfo />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {computed, defineComponent, reactive, ref, watch} from 'vue'
import CardInfo from '@/components/CardInfo.vue'
import BetInfor from '@/components/BetInfor.vue'
import {useStore} from 'vuex'
export default defineComponent({
    components:{
        CardInfo,
        BetInfor,
    },
    setup(){
        // vuex
        const store = useStore()
        const DrawCard = computed(()=>{
            return store.state.dealer.Draw
        })
        const gameUuid = computed(()=>{
            return store.state.game.gameUuid
        })
        const lastDrawCard = computed(()=>{ //陣列:進場前補畫的牌
        return store.state.game.GameStatus
        })
        //切換TableInfo頁籤
        const tabArray = reactive(["統計資訊","遊戲結果"]) //將來有需要可以再增加
        const onClickTab = ref("統計資訊") //預設是Table Info
        function switchTab (tab:string) {
             onClickTab.value = tab
        }
        watch(DrawCard,()=>{ //開始開牌時切換到遊戲結果標籤
            if(onClickTab.value!="遊戲結果"){
                // console.log('進遊戲結果',DrawCard.value,lastDrawCard.value)
                onClickTab.value = "遊戲結果"
            }
        })
        watch(lastDrawCard,()=>{ //上桌或換桌時，會取得已畫過的卡牌(可能為空陣列)
            if(onClickTab.value!="遊戲結果" && lastDrawCard.value.draws.length>0){ //若不是空陣列才要切換到遊戲結果
                // console.log('進遊戲結果',DrawCard.value,lastDrawCard.value)
                onClickTab.value = "遊戲結果"
            }
        })
        watch(gameUuid,()=>{
            if(onClickTab.value!="統計資訊"){  //每局開始時都會自動切換到統計資訊
                // console.log('進統計資訊',DrawCard.value,lastDrawCard.value)
                onClickTab.value = "統計資訊"
            }
        })
        return{
            //data
            tabArray,onClickTab,
            //methods
            switchTab
        }
    }
})
</script>
