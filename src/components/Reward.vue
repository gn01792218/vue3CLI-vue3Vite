<template>
<div class="reward">
    <div class="modal fade" id="reward" tabindex="-1" aria-labelledby="rewardLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered position-relative">
            <div class="modal-content">
            <div class="modal-header">
               <div class="close position-absolute d-flex justify-content-center" data-dismiss="modal">
                    <div class="position-absolute">x</div>
                </div>
            </div>
            <div class="modal-body">
                <div class="d-flex align-items-center justify-content-center">
                    <h1>金額</h1>
                    <div v-if="totalReward==0" class="totalReward noreward">{{totalReward}}</div>
                    <div v-else class="totalReward">{{totalReward}}</div>
                </div>
                <div class="rewardBtnList d-flex justify-content-center">
                    <div v-for="(i,index) in rewardList" :key="index" class="reward-btn p-2 mr-2" @click="addReward(i)" >{{i}}</div>
                </div>
            </div>
            <div class="modal-footer d-flex justify-content-center">
                <button type="button" class="btn w-75 reward-confirm-btn" @click="sendReward" data-dismiss="modal">送出</button>
            </div>
            </div>
        </div>
    </div>
</div>
</template>

<script lang="ts">
import { table } from '@/assets/js/bundle'
import {defineComponent , reactive, ref , computed} from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import {chatContent,tableName} from '../types/global'
export default defineComponent({
   setup(){
       //基本資料
       const totalReward = ref(0)
       const rewardList = reactive([500,1000,5000])
       //router
       const route = useRoute()
       const tableNum = computed(()=>{
           return route.params.tableId as any
       })
       //vuex
       const store = useStore()
       const userName = computed(()=>{
           return store.state.auth.UserInfo.user.name
       })
       //暫時性:之後要傳送資料給server start
       const chatContentArr = computed<chatContent[]>(()=>{ 
           return store.state.chat.chatContentArr
       })
       //暫時性end
       function addReward(reward:number){
           totalReward.value += reward
        }
       function sendReward(){
           if(totalReward.value>0){
               //傳送資料給server
                //測試start:
                let chatTable:chatContent | undefined= chatContentArr.value.find((i:chatContent)=>{
                    return i.table == tableNum.value 
                })
                if(chatTable){
                    chatTable.chatMsgArr.push({
                        content:`玩家${userName.value}:送了${totalReward.value}`,
                        textColor:'yellow',
                    })
                }
                //測試end
                totalReward.value = 0
           }
           
        }
        return {
            //data
            totalReward,
            rewardList,
            //methods
            addReward,
            sendReward,
        }
    }
})
</script>