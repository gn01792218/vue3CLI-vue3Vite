<template>
  <div v-if="tableNum" class="chat-input position-relative">
    <Emoji class="chatInput-emoji position-absolute" v-show="showEmoji" @selectEmoji="addEmoji"/>
    <div class="chat-input-wrap pl-2">
        <input
        @keyup.enter="sendChatMsg"
        type="text"
        id="chatInputElement"
        v-model="chatMsg"
      />
      <div class="input-emoji position-absolute">
        <i class="bi bi-emoji-smile" @click="emojiListControl(!showEmoji)"></i>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { chatContent, tableName } from "../../types/global";
import Emoji from "@/components/chat/Emoji.vue";
import {sendChat} from '../../socketApi'
export default defineComponent({
  components: {
    Emoji,
  },
  setup() {
    //基本資料
    const chatMsg = ref("");
    const typeTimer = ref();
    const canType = ref(true);
    // const showEmoji = ref(false)
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
    const showEmoji = computed(() => {
      return store.state.chat.showEmoji;
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
    function copyInputText(dom:HTMLInputElement){
      dom.select()
      document.execCommand('copy')
    }
    function sendChatMsg() {
      if (chatMsg.value.length <= 20 && canType.value) {
        //設置防止連按
        setTypeTimer();
        //傳送訊息給serve
        sendChat({
          message:`${chatMsg.value}`
        })
        //複製剛剛輸入的文字
        copyInputText(document.getElementById('chatInputElement') as HTMLInputElement)
        chatMsg.value = "";
      } else {
        copyInputText(document.getElementById('chatInputElement') as HTMLInputElement)
        if (chatMsg.value.length > 20) {
          alert("請勿輸入超過20字");
          chatMsg.value = "";
        } else if (!canType.value) {
          alert("輸入間隔過短!");
        }
      }
    }
    function addEmoji(emoji:string){
      chatMsg.value+=emoji
    }
    function emojiListControl(show: boolean) {
      store.commit("chat/setShowEmoji", show);
    }
    return {
      //data
      tableNum,
      chatMsg,
      showEmoji,
      //methods
      setTypeTimer,
      sendChatMsg,
      emojiListControl,
      addEmoji,
    };
  },
});
</script>
