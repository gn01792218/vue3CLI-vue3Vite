<template>
  <div class="chatDisplay position-relative">
    <ul
      v-for="(i, index) in chatContentArr"
      :key="index"
      v-show="tableNum == i.table"
    >
      <transition-group @enter="msgAnimate" tag="ul">
        <li
          class="chatMsg position-absolute"
          v-for="chatMsg in i.chatMsgArr"
          :key="chatMsg"
          :class="{ rewardMsg: chatMsg.textColor == 'yellow' }"
        >
          {{ chatMsg.content }}
        </li>
      </transition-group>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from "vue";
import gsap from "gsap";
import { useStore } from "vuex";
import useTable from '@/composables/table/useTable'
import { chatContent, chatMsg } from "../../types/global";
//vuex
const store = useStore();
const chatRecall = computed(() => {
  return store.state.chat.BroadcastChat;
});
const chatContentArr = computed<chatContent[]>(() => {
  //資料來源: 取得lobby資料時，就會初始化各桌聊天室物件
  return store.state.chat.chatContentArr;
});
//useTable
const { tableNum } = useTable(store)
watch(chatRecall, () => {
  //收到server回傳的chat資料，push到該桌聊天陣列中
  pushChatData(chatRecall.value);
});
function pushChatData(chatRecall: any) {
  //找到目前是哪桌
  let chatTable: chatContent | undefined = chatContentArr.value.find(
    (i: chatContent) => {
      return i.table == tableNum.value;
    }
  );
  //假如存在該桌
  if (chatTable) {
    //建立chatMsg物件
    let chatObject: chatMsg = {
      content: "",
      textColor: "",
    };
    //依照chatType判斷顯示何種顏色
    switch (chatRecall.type) {
      case 1:
        chatObject = {
          content: `玩家${chatRecall.player} : ${chatRecall.message}`,
          textColor: "white",
        };
        break;
      case 2:
        chatObject = {
          content: `玩家${chatRecall.player} : 送了${chatRecall.message}`,
          textColor: "yellow",
        };
        break;
    }
    //假如聊天陣列中已經多餘一則，就要delay push Data避免黏在一起
    if (chatTable.chatMsgArr.length > 0) {
      //陣列中如果有多餘一則留言的話，就必須要有一點delay
      setTimeout(() => {
        chatTable?.chatMsgArr.push(chatObject);
      }, 700);
    } else {
      chatTable?.chatMsgArr.push(chatObject);
    }
  }
}
function msgAnimate(e: HTMLElement) {
  gsap
    .fromTo(e, { opacity: 1 }, { duration: 60, y: -300, opacity: 0 })
    .then(() => {
      //刪除該元素
      let parent = e.parentElement;
      parent?.removeChild(e);
      //刪除該資料
      let chatTable = chatContentArr.value.find((i: any) => {
        return i.table == tableNum.value;
      });
      //從聊天陣列中移除
      chatTable?.chatMsgArr.shift();
    });
}
</script>
