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
import { computed, onMounted, watch } from "vue";
import LiveVideo from "@/components/LiveVideo.vue";
import BettingArea from "@/views/BettingArea.vue";
import TableInfo from "@/views/TableInfo.vue";
import GameHistory from "@/components/GameHistory.vue";
import Counter from "@/components/Counter.vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { sendTableJoinCall } from "../socketApi";
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
//先送一次tableJoinCall
onMounted(async () => {
  // console.log("創建遊戲桌",tables.value)
  if (tables.value == undefined) {
    alert("請關閉遊戲，重新登入遊戲");
  }
  let table = await tables;
  tableJoin();
});
//監聽
watch(tableNum, () => {
  //偵測到換桌
  // console.log('偵測到換桌')
  store.commit("table/setCurrentTable", tableNum.value);
  tableJoin();
});
window.addEventListener("reConnect", () => {
  //重新連接的時候
  // console.log('重連換桌')
  // reConnectTimer.value = setInterval(()=>{
  tableJoin();
  // },1000)
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
</script>
