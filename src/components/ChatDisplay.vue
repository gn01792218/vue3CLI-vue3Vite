<template>
    <div class="chatDisplay position-relative">
        <ul v-for="(i,index) in chatContentArr" :key="index" v-show="tableNum==i.table">
            <!-- {{i.table}} -->
            <transition-group @enter="msgAnimate" tag="ul">
                <li class="chatMsg position-absolute" v-for="(chatMsg) in i.chatMsgArr" :key="chatMsg" :class="{'rewardMsg':chatMsg.textColor=='yellow'}">{{chatMsg.content}}</li>
            </transition-group>
        </ul>
    </div>
</template>

<script lang="ts">
import {defineComponent , reactive, ref , computed, watch} from 'vue'
import gsap from 'gsap'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import {chatContent} from '../types/global'
export default defineComponent({
   setup(){
       //路由資料
       const route = useRoute()
       const tableNum = computed(()=>{
        return route.params.tableId
       })
       //vuex
       const store = useStore()
       const chatContentArr = computed<chatContent[]>(()=>{  //資料來源: 取得lobby資料時，就會初始化各桌聊天室物件
           return store.state.chat.chatContentArr
       })
       function msgAnimate(e:HTMLElement){
           console.log('啟動訊息動畫',e)
           gsap.fromTo(e,{opacity:1},{duration:10,y:-200,opacity:0})
           .then(()=>{
               //刪除該元素
               let parent = e.parentElement
               parent?.removeChild(e)
               //刪除該資料
               let chatTable = chatContentArr.value.find((i:any)=>{
                   return i.table == tableNum.value
               })
               chatTable?.chatMsgArr.shift()
           })
       }
        return {
            //data
            // tableList,
            tableNum,
            chatContentArr,
            //methods
            msgAnimate,
        }
    }
})
</script>