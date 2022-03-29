<template>
  <div class="leave position-absolute">
    <h1>{{ text }}</h1>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
onMounted(() => {
  if (isKickout.value) {
    //假如是被斷線來的，顯示斷線訊息
    text.value = textArr[1];
  }
});
const store = useStore();
const isKickout = computed(() => {
  return store.state.kick.isKickout;
});
store.commit("announcement/setShowannouncement", false);
const textArr = ["您已離開此遊戲，請關閉網頁"];
const text = ref(textArr[0]);
</script>
