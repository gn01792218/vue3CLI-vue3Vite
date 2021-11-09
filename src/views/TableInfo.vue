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
import {useStore} from 'vuex'
import CardInfo from '../components/CardInfo.vue'
import BetInfor from '../components/BetInfor.vue'
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
        //切換TableInfo頁籤
        const tabArray = reactive(["Table Info","Cards"]) //將來有需要可以再增加
        const onClickTab = ref("Table Info") //預設是Table Info
        function switchTab (tab:string) {
             onClickTab.value = tab
        }
        watch(DrawCard,()=>{
            if(onClickTab.value!="Cards"){
                onClickTab.value = "Cards"
            }
        })
        watch(gameUuid,()=>{
            if(onClickTab.value!="Table Info"){
                onClickTab.value = "Table Info"
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

<style lang="scss">
    .tabsArea-btn{
        div{
            cursor: pointer;
            padding:10px 35px;
        }
    }
    .onclickTab{
        background-color: black;
    }
</style>