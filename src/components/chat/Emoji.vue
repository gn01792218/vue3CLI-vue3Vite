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

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
onMounted(() => {
  emojiListUnfocusListener();
});
const emit = defineEmits(["selectEmoji"]);
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
  "💋",
  "😍",
  "🥰",
  "😘",
  "😗",
  "😙",
  "👮‍♂️",
  "👑",
  "💎",
  "🎰",
  "💣",
  "❤️",
  "💔",
  "🔞",
  "📢",
  "🈶",
  "🈚️",
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
  "😬",
  "🙄",
  "😯",
  "😲",
  "😴",
  "🤤",
  "😪",
  "😵",
  "🤐",
  "🤮",
  "😷",
  "🤒",
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
const showEmoji = computed(() => {
  return store.state.chat.showEmoji;
});
function addEmoji(emoji: string) {
  //addEmoji
  emit("selectEmoji", emoji);
  //輸入框自動獲取焦點
  let input = document.getElementById("chatInputElement");
  input?.focus();
}
function emojiListUnfocusListener() {
  document.addEventListener("click", (e) => {
    if (showEmoji.value) {
      //當面板被打開時
      let emojiList = document.querySelector(".emojiList");
      let emojiBtn = document.querySelector(".bi-emoji-smile");
      let target = e.target;
      if (
        //假如點擊的目標非表情列表本身 也不是 表情按鈕 也不是 表情列表裡面的子項目
        emojiList !== target &&
        target !== emojiBtn &&
        !emojiList?.contains(target as HTMLElement)
      ) {
        store.commit("chat/setShowEmoji", false); //關閉表情列表
      }
    }
  });
}
</script>
