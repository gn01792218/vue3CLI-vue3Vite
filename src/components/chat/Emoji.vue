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
  "๐๐ป",
  "๐๐ป",
  "๐",
  "๐",
  "๐",
  "๐",
  "๐",
  "๐",
  "๐",
  "๐คฃ",
  "๐",
  "๐",
  "๐",
  "๐",
  "๐",
  "๐",
  "๐ฅฐ",
  "๐",
  "๐",
  "๐",
  "๐ฎโโ๏ธ",
  "๐",
  "๐",
  "๐ฐ",
  "๐ฃ",
  "โค๏ธ",
  "๐",
  "๐",
  "๐ข",
  "๐ถ",
  "๐๏ธ",
  "๐",
  "๐",
  "๐",
  "๐",
  "๐",
  "๐คช",
  "๐คจ",
  "๐ง",
  "๐ค",
  "๐",
  "๐คฉ",
  "๐ฅณ",
  "๐",
  "๐",
  "๐",
  "๐",
  "โน๏ธ",
  "๐",
  "๐ซ",
  "๐ฉ",
  "๐ฅบ",
  "๐ข",
  "๐ญ",
  "๐ค",
  "๐ ",
  "๐ก",
  "๐คฌ",
  "๐คฏ",
  "๐ณ",
  "๐ฅต",
  "๐ฅถ",
  "๐ฑ",
  "๐จ",
  "๐ฐ",
  "๐ฅ",
  "๐",
  "๐ค",
  "๐ค",
  "๐คญ",
  "๐คซ",
  "๐ฌ",
  "๐",
  "๐ฏ",
  "๐ฒ",
  "๐ด",
  "๐คค",
  "๐ช",
  "๐ต",
  "๐ค",
  "๐คฎ",
  "๐ท",
  "๐ค",
  "๐ค",
  "๐ค ",
  "๐",
  "๐น",
  "๐บ",
  "๐คก",
  "๐ฉ",
  "๐ป",
  "๐",
  "โ ๏ธ",
  "๐ฝ",
  "๐",
  "๐บ",
  "๐ธ",
  "๐น",
  "๐ป",
  "๐",
  "๐ฟ",
  "๐พ",
];
const store = useStore();
const showEmoji = computed(() => {
  return store.state.chat.showEmoji;
});
function addEmoji(emoji: string) {
  //addEmoji
  emit("selectEmoji", emoji);
  //่ผธๅฅๆก่ชๅ็ฒๅ็ฆ้ป
  let input = document.getElementById("chatInputElement");
  input?.focus();
}
function emojiListUnfocusListener() {
  document.addEventListener("click", (e) => {
    if (showEmoji.value) {
      //็ถ้ขๆฟ่ขซๆ้ๆ
      let emojiList = document.querySelector(".emojiList");
      let emojiBtn = document.querySelector(".bi-emoji-smile");
      let target = e.target;
      if (
        //ๅๅฆ้ปๆ็็ฎๆจ้่กจๆๅ่กจๆฌ่บซ ไนไธๆฏ ่กจๆๆ้ ไนไธๆฏ ่กจๆๅ่กจ่ฃก้ข็ๅญ้ ็ฎ
        emojiList !== target &&
        target !== emojiBtn &&
        !emojiList?.contains(target as HTMLElement)
      ) {
        store.commit("chat/setShowEmoji", false); //้้่กจๆๅ่กจ
      }
    }
  });
}
</script>
