<template>
<div class="reward">
    <div class="modal fade" id="reward" tabindex="-1" aria-labelledby="rewardLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered position-relative">
            <div class="modal-content">
            <div class="modal-header">
                <!-- <h5 class="modal-title" id="rewardLabel">打賞</h5> -->
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
import {defineComponent , reactive, ref} from 'vue'
export default defineComponent({
   setup(){
       const totalReward = ref(0)
       const rewardList = reactive([500,1000,5000])
       function addReward(reward:number){
           totalReward.value += reward
        }
       function sendReward(){
           //傳送資料給server
           totalReward.value = 0
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