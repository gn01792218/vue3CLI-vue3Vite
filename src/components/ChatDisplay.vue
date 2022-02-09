<template>
    <div class="chatDisplay">
        <ul v-for="(i,index) in chatContentArr" :key="index" v-show="tableNum==i.table">
            {{i.table}}
            <transition-group>
                <li v-for="(i,index) in i.chatContent" :key="index">{{i}}</li>
            </transition-group>
        </ul>
    </div>
</template>

<script lang="ts">
import {defineComponent , reactive, ref , computed, watch} from 'vue'
import gsap from 'gsap'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
interface chatContent{
    table:string,
    chatContent:string[]
}
export default defineComponent({
   setup(){
       //路由資料
       const route = useRoute()
       const tableNum = computed(()=>{
        return route.params.tableId
       })
       //vuex
       const store = useStore()
       const chatContentArr = computed(()=>{  //資料來源: 取得lobby資料時，就會初始化各桌聊天室物件
           return store.state.chat.chatContentArr
       })
       function pushMsg(msg:string){
        //    chatContentArr[tableNum.value as string].push(msg)
       }
        return {
            //data
            // tableList,
            tableNum,
            chatContentArr,
        }
    }
})
</script>