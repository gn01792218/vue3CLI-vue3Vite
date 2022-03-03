<template>
  <div class="reward">
    <div
      class="modal fade"
      id="reward"
      tabindex="-1"
      aria-labelledby="rewardLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered position-relative">
        <div class="modal-content">
          <div class="modal-header">
            <div
              class="close position-absolute d-flex justify-content-center"
              data-dismiss="modal"
            >
              <div class="position-absolute">x</div>
            </div>
          </div>
          <div class="modal-body">
            <div class="d-flex align-items-center justify-content-center">
              <h1 class="mr-1 reward-title">金額</h1>
              <div v-if="totalReward == 0" class="totalReward noreward">
                {{ totalReward }}
              </div>
              <div v-else class="totalReward">{{ totalReward }}</div>
            </div>
            <div class="rewardBtnList d-flex justify-content-center">
              <div
                v-for="(i, index) in rewardList"
                :key="index"
                class="reward-btn p-2 mr-2"
                @click="addReward(i)"
              >
                {{ i }}
              </div>
            </div>
          </div>
          <div class="rewardError">
            <p v-show="!donatErr">{{errorMsg}}</p>
          </div>
          <div class="modal-footer justify-content-center flex-nowrap">
            <button
              type="button"
              class="btn w-75 reward-confirm-btn"
              @click="sendReward"
            >
              <!-- data-dismiss="modal" -->
              送出
            </button>
            <button
              type="button"
              class="btn w-75 reward-confirm-btn"
              @click="reSetReward"
            >
              重設
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed, watch } from "vue";
import { useStore } from "vuex";
import { sendDonat } from "../../socketApi";
export default defineComponent({
  setup() {
    //基本資料
    const totalReward = ref(0);
    const rewardList = reactive([500, 1000, 5000]);
    const donatErr = ref(true);
    const errorMsg = ref("");
    //vuex
    const store = useStore();
    const userWallet = computed(() => {
      return store.state.auth.UserInfo.user.wallet;
    });
    const donatError = computed(() => {
      return store.state.donat.donatErr;
    });
    watch(donatError, () => {
      if (donatError.value == 3) {
        console.log(donatError.value)
        setErrorMsg("此帳號無打賞權限!",donatError.value)
        // donatErr.value = false;
        // errorMsg.value = "此帳號無打賞權限!";
        // setTimeout(() => {
        //   donatErr.value = true;
        //   errorMsg.value = "";
        //   store.commit("donat/reSetDonatErr");
        // }, 500);
      }
    });
    function addReward(reward: number) {
      if (userWallet.value >= reward) {
        totalReward.value += reward;
      } else {
        //沒錢的話跳警告提示
        setErrorMsg("餘額不足!")
      }
    }
    function setErrorMsg(errMsg: string,ErroroCode?:number) {
      donatErr.value = false;
      errorMsg.value = errMsg;
      console.log(ErroroCode,errMsg)
      if(ErroroCode && ErroroCode == 3){
          store.commit("donat/reSetDonatErr");
      }
      setTimeout(() => {
        donatErr.value = true;
        errorMsg.value = "";
      }, 500);
    }
    function sendReward() {
      // if (totalReward.value > 0) {
      //傳送資料給server
      sendDonat({
        points: `${totalReward.value}`,
      });
      totalReward.value = 0;
      // }
    }
    function reSetReward() {
      totalReward.value = 0;
    }
    return {
      //data
      totalReward,
      rewardList,
      donatErr,
      errorMsg,
      //methods
      addReward,
      sendReward,
      reSetReward,
    };
  },
});
</script>
