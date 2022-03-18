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
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { sendTableJoinCall } from "../socketApi";
//初始化
onMounted(async () => {
  // console.log("創建遊戲桌",tables.value)
  if (tables.value == undefined) {
    alert("請關閉遊戲，重新登入遊戲");
  }
  let table = await tables;
  tableJoin();
});
//基本資料
const vipCounter = ref<number | null>(null)
//路由處理，取得當前桌號
const route = useRoute();
const tableNum = computed(() => {
  return route.params.tableId;
});
//vuex資料
const store = useStore();
const tables = computed(() => {
  //桌號uuid
  return store.state.lobby.LobbyInfo.tables;
});
const roundUuid = computed(() => {
  //遊戲回合的Uuid
  return store.state.game.gameUuid;
});

//監聽
watch(tableNum, () => {
  //偵測到換桌
  // console.log('偵測到換桌')
  store.commit("table/setCurrentTable", tableNum.value);
  tableJoin();
});
watch(roundUuid,()=>{
  //換桌的時候就重新計算時間
  // clearTimer(vipCounter.value as number)
  // setVipCounter(vipCounter)
})
window.addEventListener("reConnect", () => {
  //重新連接的時候
  tableJoin();
});
function tableJoin() {
  //上桌請求
  tables.value.find((i: any) => {
    if (i.name == tableNum.value) {
      sendTableJoinCall({
        uuid: i.uuid,
      });
      // console.log('發送TableJoin',tableNum.value)
      console.log(
        `請求${tableNum.value}桌`,
        "桌號:" + i.name,
        "uuid:" + i.uuid,
        "Loby資訊:",
        tables.value
      );
    }
    return i.name == tableNum;
  });
}
function clearTimer(timer:number){
  if(timer===null)return
  clearInterval(timer)
}
function setVipCounter(timer:Ref){
  if(timer.value===null) return
  timer.value = setInterval(()=>{
    //跳出提醒10分鐘(600000)未下注了
    alert('您已經10分鐘未下注了')
  },1000) 
  console.log('執行計時器')
}
</script>
