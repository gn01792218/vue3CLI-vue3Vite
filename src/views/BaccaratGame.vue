<template>
  <div class="mainGame">
    <Counter class="counter" />
    <LiveVideo />
    <BettingArea />
    <GameHistory />
    <TableInfo />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, Ref, ref, watch } from "vue";
import LiveVideo from "@/components/LiveVideo.vue";
import BettingArea from "@/components/bettingArea/BettingArea.vue";
import TableInfo from "@/views/TableInfo.vue";
import GameHistory from "@/components/GameHistory.vue";
import Counter from "@/components/Counter.vue";
import { useStore } from "vuex";
import useTable from "../composables/table/useTable";
import $ from "jquery";
//基本資料
const vipCounter = ref<number | null>(null);

//vuex資料
const store = useStore();
const { tableNum, tables, tableJoin, tableReload } = useTable(store);
const roundUuid = computed(() => {
  //遊戲回合的Uuid
  return store.state.game.gameUuid;
});
const flayCardRecall = computed(() => {
  return store.state.game.flyCardRecall;
});
const confirmBetStatus = computed(() => {
  return store.state.bet.isConfirmed;
});
//監聽
watch(tableNum, () => {
  //偵測到換桌
  // console.log('偵測到換桌')
  store.commit("table/setCurrentTable", tableNum.value);
  tableJoin();
});
watch(roundUuid, () => {
  //換桌的時候就重新計算時間
  if (!tableNum.value.includes("VIP")) {
    //不是VIP桌的話不需要設置計時器
    clearTimer(vipCounter.value as number);
    return;
  }
  clearTimer(vipCounter.value as number);
  setVipCounter(vipCounter);
});
watch(flayCardRecall, () => {
  //只要聽到飛牌reCall表示玩家要飛牌，所以清除計時器
  clearTimer(vipCounter.value as number);
});
watch(confirmBetStatus, () => {
  //聽到按下確認紐，以要停止計時器
  if (!confirmBetStatus.value) return;
  clearTimer(vipCounter.value as number);
});
window.addEventListener("reConnect", () => {
  //重新連接的時候
  console.log('重新上桌')
  tableReload();
});
function clearTimer(timer: number) {
  if (timer === null) return;
  clearInterval(timer);
}
function setVipCounter(timer: Ref) {
  timer.value = setInterval(() => {
    store.commit("game/setGameMsg", "您未下注已達10分鐘，請下注");
    $("#gameMsg").modal("show");
  }, 600000);
}
//初始化
onMounted(async () => {
  // console.log("創建遊戲桌",tables.value)
  if (tables.value == undefined) {
    alert("請關閉遊戲，重新登入遊戲");
  }
  let table = await tables;
  tableJoin();
});
</script>
