<template>
  <!--- tab --->
    <div class="tabs-area">
        <div class="tabs-bottom">
            <div v-for="(tab,index) in tabArray" :key="index" @click="switchTab(tab)" :class="{onclick:onClickTab===tab}" >{{tab}}</div>
        </div>
        <div class="ulstynone">
            <BetInfor v-if="onClickTab===tabArray[0]"/>
            <CardInfo v-if="onClickTab===tabArray[1]"/>
        </div>
    </div>
</template>

<script>
import {defineComponent, reactive, ref,computed} from 'vue'
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
        //切換TableInfo頁籤
        const tabArray = reactive(["Table Info","Cards"]) //將來有需要可以再增加
        const onClickTab = ref("Cards") //預設是Cards
        function switchTab (tab) {
             onClickTab.value = tab
        }
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
    .ulstynone{
        // list-style: none;
        height: 250px;
    }
</style>