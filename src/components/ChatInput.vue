<template>
  <div v-if="tableNum" class="chat-input position-relative">
    <input
      @keyup.enter="sendChatMsg"
      type="text"
      class=""
      placeholder="你目前沒有發言權限"
      aria-label="Username"
      aria-describedby="basic-addon1"
      v-model="chatMsg"
    />
    <div class="input-emoji position-absolute">
      <i class="bi bi-emoji-smile"></i>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { chatContent, tableName } from "../types/global";
export default defineComponent({
  setup() {
    //基本資料
    const chatMsg = ref("");
    const typeTimer = ref();
    const canType = ref(true);
    //路油資料
    const route = useRoute();
    const tableNum = computed(() => {
      return route.params.tableId;
    });
    //vuex資料
    const store = useStore();
    const user = computed(() => {
      return store.state.auth.UserInfo.user;
    });
    //暫時性:之後要傳送資料給server start
    const chatContentArr = computed<chatContent[]>(() => {
      return store.state.chat.chatContentArr;
    });
    //function
    function setTypeTimer() {
      //防止連按function
      canType.value = false;
      typeTimer.value = setInterval(() => {
        clearInterval(typeTimer.value);
        canType.value = true;
      }, 1000);
    }
    //
    function sendChatMsg() {
      if (chatMsg.value.length < 20 && canType.value) {
        //設置防止連按
        setTypeTimer();
        //傳送訊息給serve
        //以下測試start
          let chatTable: chatContent | undefined = chatContentArr.value.find(
            (i: chatContent) => {
              return i.table == tableNum.value;
            }
          );
          if (chatTable) {
            chatTable.chatMsgArr.push({
              content: `玩家${user.value.name}:${chatMsg.value}`,
              textColor: "white",
            });
          }
        //測試end
        chatMsg.value = "";
      } else {
        if (chatMsg.value.length > 20) {
          alert("請勿輸入超過20字");
          chatMsg.value = "";
        } else if (!canType.value) {
          alert("輸入間隔過短!");
        }
      }
    }
    return {
      //data
      tableNum,
      chatMsg,
      //methods
      setTypeTimer,
      sendChatMsg,
    };
  },
});
</script>
