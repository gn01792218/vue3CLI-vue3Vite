<template>
  <div class="emojiList p-3">
    <ul class="d-flex flex-wrap justify-content-start">
      <li
        class="emoji"
        @click="addEmoji(emoji)"
        v-for="emoji in emojiList"
        :key="emoji"
      >
        {{ emoji }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
export default defineComponent({
  setup(props, { emit }) {
    const emojiList = [
      "👍🏻",
      "👎🏻",
      "😀",
      "😀",
      "😄",
      "😁",
      "😆",
      "😅",
      "😂",
      "🤣",
      "😊",
      "😇",
      "😉",
      "😌",
      "😍",
      "🥰",
      "😘",
      "😗",
      "😙",
      "👮‍♂️",
      "😚",
      "😋",
      "😛",
      "😝",
      "😜",
      "🤪",
      "🤨",
      "🧐",
      "🤓",
      "😎",
      "🤩",
      "🥳",
      "😏",
      "😒",
      "😞",
      "😕",
      "☹️",
      "😖",
      "😫",
      "😩",
      "🥺",
      "😢",
      "😭",
      "😤",
      "😠",
      "😡",
      "🤬",
      "🤯",
      "😳",
      "🥵",
      "🥶",
      "😱",
      "😨",
      "😰",
      "😥",
      "😓",
      "🤗",
      "🤔",
      "🤭",
      "🤫",
      "🤥",
      "😐",
      "😬",
      "🙄",
      "😯",
      "😧",
      "😲",
      "🥱",
      "😴",
      "🤤",
      "😪",
      "😵",
      "🤐",
      "🤢",
      "🤮",
      "😷",
      "🤒",
      "🤕",
      "🤑",
      "🤠",
      "😈",
      "👹",
      "👺",
      "🤡",
      "💩",
      "👻",
      "💀",
      "☠️",
      "👽",
      "👾",
      "🤖",
      "🎃",
      "😺",
      "😸",
      "😹",
      "😻",
      "🙀",
      "😿",
      "😾",
    ];
    const store = useStore();
    function addEmoji(emoji: string) {
      console.log(emoji);
      //addEmoji
      emit("selectEmoji", emoji);
      //關閉emoji
      store.commit("chat/setShowEmoji", false);
      //輸入框自動獲取焦點
      let input = document.getElementById('chatInputElement')
      input?.focus()
    }
    return {
      //data
      emojiList,
      //methods
      addEmoji,
    };
  },
});
</script>
