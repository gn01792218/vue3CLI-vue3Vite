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
                    <h1 class="mr-1 reward-title">金額</h1>
                    <div v-if="totalReward==0" class="totalReward noreward">{{totalReward}}</div>
                    <div v-else class="totalReward">{{totalReward}}</div>
                </div>
                <div class="rewardBtnList d-flex justify-content-center">
                    <div v-for="(i,index) in rewardList" :key="index" class="reward-btn p-2 mr-2" @click="addReward(i)" >{{i}}</div>
                </div>
            </div>
            <div class="rewardError">
                    <p v-show="!userhasMoney">餘額不足!</p>
            </div>
            <div class="modal-footer d-flex justify-content-center">
                <button type="button" class="btn w-75 reward-confirm-btn" @click="sendReward" data-dismiss="modal">送出</button>
                <button type="button" class="btn w-75 reward-confirm-btn" @click="reSetReward" data-dismiss="modal">重設</button>
            </div>
            </div>
        </div>
    </div>
</div>
</template>

<script lang="ts">
import {defineComponent , reactive, ref , computed} from 'vue'
import { useStore } from 'vuex'
import {sendDonat} from '../socketApi'
export default defineComponent({
   setup(){
       //基本資料
       const totalReward = ref(0)
       const rewardList = reactive([500,1000,5000])
       const userhasMoney = ref(true)
       //vuex
       const store = useStore()
       const userWallet = computed(()=>{
           return store.state.auth.UserInfo.user.wallet
       })
       function addReward(reward:number){
           if(userWallet.value>=reward){
               totalReward.value += reward
           }else{  //沒錢的話跳警告提示
               userhasMoney.value = false
               setTimeout(()=>{
                   userhasMoney.value = true
               },500)
           }
        }
       function sendReward(){
           if(totalReward.value>0){
               //傳送資料給server
               sendDonat({
                   points:`${totalReward.value}`
               })
                totalReward.value = 0
           }
        }
        function reSetReward(){
            totalReward.value = 0
        }
        return {
            //data
            totalReward,
            rewardList,
            userhasMoney,
            //methods
            addReward,
            sendReward,
            reSetReward,
        }
    }
})
</script>