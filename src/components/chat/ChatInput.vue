<template>
  <div v-if="tableNum" class="chat-input position-relative">
    <div class="chatInput-erroeMsg">
      <ul>
        <transition-group @enter="inputErrAnimate">
          <li class="position-absolute" v-for="err in inputErrArr" :key="err">{{err}}</li>
        </transition-group>
      </ul>
    </div>
    <Emoji class="chatInput-emoji position-absolute" v-show="showEmoji" @selectEmoji="addEmoji"/>
    <div class="chat-input-wrap pl-2">
        <input
        enterkeyhint="send"
        @keyup.enter="sendChatMsg"
        type="text"
        id="chatInputElement"
        v-model="chatMsg"
      />
      <div class="input-emoji position-absolute">
        <i class="bi bi-cursor-fill mr-1" @click="sendChatMsg"></i>
        <i class="bi bi-emoji-smile" @click="emojiListControl(!showEmoji)"></i>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, reactive } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { chatContent, tableName } from "../../types/global";
import Emoji from "@/components/chat/Emoji.vue";
import {sendChat} from '../../socketApi'
import {gsap,Power4} from 'gsap'
export default defineComponent({
  components: {
    Emoji,
  },
  setup() {
    //基本資料
    const chatMsg = ref("");
    const typeTimer = ref();
    const canType = ref(true);
    const inputErrArr = reactive<string[]>([])
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
          inputErrArr.push('請勿輸入超過20個字元!')
          // alert("請勿輸入超過20字");
          chatMsg.value = "";
        } else if (!canType.value) {
          inputErrArr.push('輸入間隔過短!')
          // alert("輸入間隔過短!");
        }
      }
    }
    function addEmoji(emoji:string){
      chatMsg.value+=emoji
    }
    function emojiListControl(show: boolean) {
      store.commit("chat/setShowEmoji", show);
    }
    function inputErrAnimate(e:HTMLElement){
      gsap.fromTo(e,{},{duration:5,y:-10,opacity:0,ease:Power4.easeOut}).then(()=>{
        //移除文字
        inputErrArr.shift()
      })
    }
    return {
      //data
      tableNum,
      chatMsg,
      showEmoji,
      inputErrArr,
      //methods
      setTypeTimer,
      sendChatMsg,
      emojiListControl,
      addEmoji,
      inputErrAnimate,
    };
  },
});
</script>
