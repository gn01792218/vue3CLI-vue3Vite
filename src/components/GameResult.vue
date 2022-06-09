<template>
  <div class="gameResult w-100 position-absolute">
    <section class="gameResult-content align-items-center flex-column">
      <p class="gainMoney"></p>
      <ul id="result"></ul>
    </section>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import useTable from '@/composables/table/useTable'
import proto from "../assets/js/bundle";
//vuex
const store = useStore();
const gameResult = computed(() => {
  //回傳的是陣列
  return store.state.dealer.BroadcastGameResult.results;
});
const winMoney = computed(() => {
  return store.state.dealer.BroadcastGameResult.totalWin;
});
const gameUuid = computed(() => {
  return store.state.game.gameUuid;
});
const gameEndUuid = computed(() => {
  return store.state.game.gameEndUuid;
});
const gameEnd = computed(() => {
  return store.state.dealer.end;
});
const gameState = computed(() => {
  //上桌時會得到遊戲狀態，要播放現在是什麼狀態
  //1.下注狀態 2.開牌狀態 3.等待狀態
  return store.state.game.GameStatus;
});
//useTable
const { tableNum } = useTable(store)
//基本資料
const hasGameResult = ref(false);
//監聽
watch(tableNum, () => {
  resetGameResult(); //每次換桌都resetGameResult
  hasGameResult.value = false;
});
watch(gameEnd, () => {
  // console.log('換薛時候要取消顯示輸贏')
  resetGameResult();
  hasGameResult.value = false;
});
watch(gameUuid, () => {
  resetGameResult(); //換桌的時候要先resetGameResult
  hasGameResult.value = false;
});
watch(gameEndUuid, () => {
  //倒數結束打開遊戲結果
  console.log("停止下注");
  //最外層的if是暫時的
  hasGameResult.value = true;
});
watch(gameResult, () => {
  //依據不同的情況，添加不同的顏色class
  // if(gameResult.value){
  // console.log('伺服器遊戲結果',gameResult.value)
  showGameResult();
  // }
});
function showGameResult() {
  let gameResultElement = document.querySelector('.gameResult') as HTMLElement
  let result = document.querySelector("#result") as HTMLElement; //這是ul
  let gainMoney = document.querySelector(".gainMoney") as HTMLElement;
  if (result) {
    gameResult.value.forEach((i: any) => {
      switch (i) {
        case proto.dealer.Result.Banker:
          gameResultElement.style.background ="linear-gradient(90deg,transparent 0%,red 50%,transparent 100%)"
          let appendElement2 = document.createElement("LI") as HTMLElement;
          appendElement2.classList.add("font_white");
          appendElement2.classList.add("result-text");
          appendElement2.innerText = "莊家贏";
          result.appendChild(appendElement2);
          break;
        case proto.dealer.Result.Player:
          gameResultElement.style.background ="linear-gradient(90deg,transparent 0%,blue 50%,transparent 100%)"
          let appendElement3 = document.createElement("LI") as HTMLElement;
          appendElement3.classList.add("font_white");
          appendElement3.classList.add("result-text");
          appendElement3.innerText = "閒家贏";
          result.appendChild(appendElement3);
          break;
        case proto.dealer.Result.BankerPair:
          let appendElement4 = document.createElement("LI") as HTMLElement;
          appendElement4.classList.add("font_white");
          appendElement4.classList.add("result-text");
          appendElement4.innerText = "莊對";
          result.appendChild(appendElement4);
          break;
        case proto.dealer.Result.Tie:
          gameResultElement.style.background ="linear-gradient(90deg,transparent 0%,rgb(141, 141, 3) 50%,transparent 100%)"
          let appendElement1 = document.createElement("LI") as HTMLElement;
          appendElement1.classList.add("font_white");
          appendElement1.classList.add("result-text");
          appendElement1.innerText = "和局";
          result.appendChild(appendElement1);
          break;
        case proto.dealer.Result.PlayerPair:
          let appendElement5 = document.createElement("LI") as HTMLElement;
          appendElement5.classList.add("font_white");
          appendElement5.classList.add("result-text");
          appendElement5.innerText = "閒對";
          result.appendChild(appendElement5);
          break;
      }
    });
    if (winMoney.value !== 0 && winMoney.value !== null) {
      gainMoney.innerHTML = `贏得籌碼:${winMoney.value}`;
    }
  }
}
function resetGameResult() {
  let result = document.querySelector("#result") as HTMLElement; //這是ul
  let gainMoney = document.querySelector(".gainMoney") as HTMLElement;
  if (result) {
    result.innerHTML = "";
    store.commit("dealer/resetGameResults"); //記得清空Vuex裡面的遊戲結果
  }
  if (gainMoney) {
    gainMoney.innerHTML = "";
  }
}
onMounted(()=>{
  hasGameResult.value = true;
})
</script>

<style>
</style>