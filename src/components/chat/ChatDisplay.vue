<template>
  <div class="chatDisplay position-relative">
    <ul
      v-for="(i, index) in chatContentArr"
      :key="index"
      v-show="tableNum == i.table"
    >
      <!-- {{i.table}} -->
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

<script lang="ts">
import { defineComponent, reactive, ref, computed, watch } from "vue";
import gsap from "gsap";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { chatContent, chatMsg } from "../../types/global";
export default defineComponent({
  setup() {
    //路由資料
    const route = useRoute();
    const tableNum = computed(() => {
      return route.params.tableId;
    });
    //vuex
    const store = useStore();
    const chatRecall = computed(() => {
      return store.state.chat.BroadcastChat;
    });
    const donatRecall = computed(() => {
      return store.state.donat.DonateRecall;
    });
    const chatContentArr = computed<chatContent[]>(() => {
      //資料來源: 取得lobby資料時，就會初始化各桌聊天室物件
      return store.state.chat.chatContentArr;
    });
    // watch(donatRecall, () => {
    //   if (donatRecall.value.error) {
    //     let chatTable: chatContent | undefined = chatContentArr.value.find(
    //       (i: chatContent) => {
    //         return i.table == tableNum.value;
    //       }
    //     );
    //     if (chatTable) {
    //       let chatObject = {
    //         content: `玩家${chatRecall.value.player} : 送了${chatRecall.value.message}`,
    //         textColor: "yellow",
    //       };
    //       if (chatTable.chatMsgArr.length > 0) {
    //         //陣列中如果有多餘一則留言的話，就必須要有一點delay
    //         console.log(chatTable.chatMsgArr.length, "要delay");
    //         setTimeout(() => {
    //           chatTable?.chatMsgArr.push(chatObject);
    //         }, 500);
    //       } else {
    //         chatTable.chatMsgArr.push(chatObject);
    //       }
    //     }
    //   }
    // });
    watch(chatRecall, () => {
      let chatTable: chatContent | undefined = chatContentArr.value.find(
        (i: chatContent) => {
          return i.table == tableNum.value;
        }
      );
      if (chatTable) {
        let chatObject: chatMsg 
        = {
          content:'',
          textColor:'',
        };
        switch (chatRecall.value.type) {
          case 1:
            chatObject = {
              content: `玩家${chatRecall.value.player} : ${chatRecall.value.message}`,
              textColor: "white",
            };
            break;
          case 2:
            chatObject = {
              content: `玩家${chatRecall.value.player} : 送了${chatRecall.value.message}`,
              textColor: "yellow",
            };
            console.log('斗內',chatObject)
            break;
        }
        if (chatTable.chatMsgArr.length > 0) {
          //陣列中如果有多餘一則留言的話，就必須要有一點delay
          setTimeout(() => {
            chatTable?.chatMsgArr.push(chatObject);
          }, 500);
        } else {
          chatTable?.chatMsgArr.push(chatObject);
        }
      }
    });
    function msgAnimate(e: HTMLElement) {
      //  console.log('啟動訊息動畫',e)
      gsap
        .fromTo(e, { opacity: 1 }, { duration: 10, y: -200, opacity: 0 })
        .then(() => {
          //刪除該元素
          let parent = e.parentElement;
          parent?.removeChild(e);
          //刪除該資料
          let chatTable = chatContentArr.value.find((i: any) => {
            return i.table == tableNum.value;
          });
          chatTable?.chatMsgArr.shift();
        });
    }
    //假如收到的陣列 : 送出聊天訊息
    // function testSendMsg() {
    //   let chatTable: chatContent | undefined = chatContentArr.value.find(
    //     (i: chatContent) => {
    //       return i.table == tableNum.value;
    //     }
    //   );
    //   if (chatTable) {
    //     let msgArr = [
    //       { content: "測試", textColor: "yellow" },
    //       { content: "AAA", textColor: "yellow" },
    //       { content: "CKJHDJSHSJDH", textColor: "yellow" },
    //     ];
    //     let count = 0;
    //     setInterval(() => {
    //       if (count < msgArr.length) {
    //         chatTable?.chatMsgArr.push(msgArr[count++]);
    //       }
    //     }, 500);
    //   }
    // }
    //暫時性end
    return {
      //data
      // tableList,
      tableNum,
      chatContentArr,
      //methods
      msgAnimate,
    };
  },
});
</script>
