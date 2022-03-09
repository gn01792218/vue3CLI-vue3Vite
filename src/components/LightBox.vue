<template>
  <div class="lightBox position-absolute" v-show="showCardInfo">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
const store = useStore();
const Draw = computed(() => {
  return store.state.dealer.Draw;
});
const roundUuid = computed<string>(() => {
  return store.state.game.gameUuid;
});
const showCardInfo = ref(false);
const mqlMax1024 = window.matchMedia("(max-width :1024px)");
//初始化
onMounted(() => {
  if (mqlMax1024.matches) {
    console.log("要監聽1024以下的遮罩");
    watch(Draw, () => {
      //之後監聽game狀態來判定是否顯示卡牌
      if (mqlMax1024.matches) {
        showCardInfo.value = true;
      }
    });
    watch(roundUuid, () => {
      if (mqlMax1024.matches) {
        showCardInfo.value = false;
      }
    });
  } else {
    showCardInfo.value = false;
  }
  mqlMax1024.addEventListener("change", () => {
    if (mqlMax1024.matches) {
      console.log("要監聽1024以下的遮罩");
      watch(Draw, () => {
        //之後監聽game狀態來判定是否顯示卡牌
        if (mqlMax1024.matches) {
          showCardInfo.value = true;
        }
      });
      watch(roundUuid, () => {
        if (mqlMax1024.matches) {
          showCardInfo.value = false;
        }
      });
    } else {
      showCardInfo.value = false;
    }
  });
});
</script>
