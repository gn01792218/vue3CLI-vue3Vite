<template>
  <!-- 按鈕區 -->
  <div
    class="bettingArea-btn d-flex justify-content-between align-items-center p-2 position-relative"
  >
    <LightBox />
    <div
      class="bettingArea-btn-left d-flex justify-content-around align-items-center"
    >
      <div
        class="bettingArea-btn-gitbackAllCoin d-flex justify-content-center align-items-center"
        @click="getAllBetBack"
      >
        <i class="bi bi-arrow-counterclockwise"></i>取消
      </div>
      <div class="d-flex align-items-center">
        <!-- 飛牌鈕，VIP才有 -->
        <div
          v-if="tableNum.includes('VIP')"
          @click="flyCard"
          class="fly-card bettingArea-btn-center cursor-point d-flex align-items-center justify-content-center p-1 pl-2 pr-2 mr-1"
        >
          <span>飛</span>
        </div>
        <!-- 打賞按鈕 -->
        <div
          class="bettingArea-btn-betInfo bettingArea-btn-reward cursor-point d-flex align-items-center justify-content-center p-1 pl-2 pr-2 mr-1"
          data-toggle="modal"
          data-target="#reward"
        >
          <span><i class="bi bi-gift"></i></span>
        </div>
        <!-- 咪牌按鈕 ，VIP才有-->
        <div
          v-if="tableNum.includes('VIP')"
          id="watchCard-btn"
          @click="watchCard"
          class="bettingArea-btn-center cursor-point d-flex align-items-center justify-content-center p-1 pl-2 pr-2 mr-1"
        >
          <span class="d-flex align-item-center"
            ><i class="bi bi-eye" v-show="watchCardStatus"></i
          >
          <i class="bi bi-eye-slash" v-show="!watchCardStatus"></i>
          </span>
        </div>
        <!-- 手機版本才會出現的檯紅顯示 -->
        <div
          class="bettingArea-btn-betInfo bettingArea-btn-betrule  d-flex align-items-center p-1 pl-2 pr-2 mr-1"
        >
          <span
            >{{ numberFormat(minBetLimit) }}-<br />{{
              numberFormat(maxBetLimit)
            }}</span
          >
        </div>
      </div>
      <div
        class="bettingArea-btn-check d-flex justify-content-center align-items-center"
        @click="sendConfirmBetCall"
      >
        <i class="bi bi-check-circle"></i>確定
      </div>
      <div class="askRoad d-flex">
        <div class="askRoad-player cursor-point p-1 mr-2" @click="askRoad(2)">
          <p>閒問路</p>
          <div class="d-flex justify-content-around p-1 askRoad-border">
            <div id="bigEyeRoad-2"></div>
            <div id="smallRoad-2"></div>
            <div id="cockroachRoad-2"></div>
          </div>
        </div>
        <div class="askRoad-banker cursor-point p-1" @click="askRoad(1)">
          <p>莊問路</p>
          <div class="d-flex justify-content-around p-1 askRoad-border">
            <div id="bigEyeRoad-1"></div>
            <div id="smallRoad-1"></div>
            <div id="cockroachRoad-1"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import LightBox from '@/components/LightBox.vue'
import { gsap, Power4 } from "gsap";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import {
  sendBetResetCall,
  sendAskRoadCall,
  sendBetConfirmCall,
  sendFlyCardCall,
  sendWatchCardCall,
} from "../../socketApi";
//初始化
onMounted(() => {
  //初始化注區的最大最小檯紅(給手機顯示用的)
  getBetLimit(tableInfoData.value);
  //設置取消紐的顏色
  setCancleBetBtnColor();
});
//路由
const route = useRoute();
const tableNum = computed(() => {
  //當前桌號
  return route.params.tableId;
});
//基本資料
const minBetLimit = ref(999999999); //手機版本顯示檯紅最小
const maxBetLimit = ref(-1); //手機版本顯示檯紅最大
const currentAskRoadSide = ref(0); //當前問的是哪一家的路(1莊 2閒)
//vuex
const store = useStore();
const canBet = computed(() => {
  return store.state.bet.canBet;
});
const tableInfoData = computed(() => {
  //該桌檯桌資訊
  return store.state.table.tableInfoData[tableNum.value as string];
});
const coinPosition = computed(() => {
  return store.state.bet.coinPosition;
});
const gameStatus = computed(() => {
  //遊戲狀態 1.下注中 2.開牌中 3.等待中
  return store.state.game.GameStatus.status;
});
const roundUuid = computed(() => {
  //遊戲回合的Uuid
  return store.state.game.gameUuid;
});
const betErrorArray = computed(() => {
  return store.state.bet.betErrorArray;
});
const canConfirm = computed(() => {
  return store.state.bet.canUseConfirm;
});
const betConfirmRecall = computed(() => {
  //確認下注成功與否
  return store.state.bet.BetConfirmRecall;
});
const isConfirmed = computed(() => {
  //確認鈕狀態
  return store.state.bet.isConfirmed;
});
const canUseFlyCard = computed(() => {
  return store.state.bet.canUseFlyCard;
});
const flyCardStatus = computed(() => {
  return store.state.bet.flyCard;
});
const flyCardRecall = computed(() => {
  return store.state.game.flyCardRecall;
});
const canWatchCard = computed(() => {
  //咪牌可不可用
  return store.state.bet.canUseWatchCard;
});
const watchCardStatus = computed(() => {
  //是否要咪牌
  return store.state.bet.isWatchCard;
});
const askWatchCard = computed(() => {
  //是否取得咪牌權利
  return store.state.game.WatchcardNotificaion;
});
const askRoadRecall = computed(() => {
  //問路recall
  return store.state.roadmap.askRoadReCall;
});
const roundAskBanker = computed(() => {
  //回合自動問莊的recall
  return store.state.game.askBankByRoundStart;
});
const roundAskPlayer = computed(() => {
  //回合自動問閒的recall
  return store.state.game.askPlayerByRoundStart;
});
//watch
watch(tableNum, () => {
  //換桌
  //取得注區的最大最小檯紅(給手機顯示用的)
  getBetLimit(tableInfoData.value);
});
watch(roundUuid, () => {
  //回合開始時重置遊戲；也可能是換桌
  store.commit("bet/setIsConfirmed", false); //重置是否按下確認
  store.commit("bet/setCanUseConfirm", true); //可以按下確認紐
  store.commit("bet/setWatchCard", true); //重置咪牌按紐
  store.commit("bet/setCanUseWatchCard", true); //咪牌紐可以使用
  store.commit("bet/setFlyCard", false); //重置飛牌鈕
  store.commit("bet/setCanUseFlyCard", true); //飛牌鈕可以按
});
watch(canConfirm, () => {
  //監聽可否使用確認鈕
  setBetStatusTextColor();
  setConfirmBtnColor();
  setCancleBetBtnColor();
});
watch(flyCardRecall, () => {
  //有收到reCall表使這桌要飛牌
  // canBet.value = false; //不能下注
  store.commit("bet/setCanBet", false); //不能下注
  store.commit("bet/setCanUseConfirm", false); //確認按鈕不能按
  store.commit("bet/setFlyCard", true); //按過飛牌了
  store.commit("bet/setCanUseFlyCard", false); //飛牌鈕不能使用了
  store.commit("bet/setCanUseWatchCard", false); //也不能咪牌了
  //清空下注
  coinPosition.value.forEach((i: any) => {
    i.coinArray = [];
    i.initBottom = 0;
    i.betStatus = 0;
    i.tableAllPlayerBetStatus = 0;
    i.initX = 0;
  });
  //確認按鈕變灰色
  let confirmBtn = document.querySelector(
    ".bettingArea-btn-check"
  ) as HTMLElement;
  confirmBtn.style.background = "rgb(80, 78, 78)";
});
watch(canUseFlyCard, () => {
  //玩家是否可以按飛牌鈕
  setFlyCardColor();
  if (!canUseFlyCard.value) {
    //飛牌鈕不能按的時候，設置確認鈕的顏色
    setConfirmBtnColor();
  }
});
watch(canWatchCard, () => {
  setWatchCardColor();
});
watch(askWatchCard, () => {
  //server詢問是否要咪牌
  alertCanWatchCard();
});
watch(betConfirmRecall, () => {
  //收到server回應的確認下注，做確認鈕動作
  confirmBet();
});
watch(isConfirmed, () => {
  //根據是否按過確認鍵，更換相關顏色
  setWatchCardColor();
  if (isConfirmed.value) {
    //按過確認鈕後，飛牌就不能按了
    store.commit("bet/setCanUseConfirm", false); //確認鈕也不能按
    store.commit("bet/setCanUseFlyCard", false); //飛牌不能按
    store.commit("bet/setCanUseWatchCard", false); //咪排按鈕不能按
  } else {
    store.commit("bet/setCanUseConfirm", true); //確認鈕可以按
  }
});
watch(roundAskBanker, () => {
  //每局開始時自動問莊
  // console.log('回合莊問路',roundAskBanker.value.askRoadCall.block.symbol,roundAskBanker.value)
  changeAskRoadBtnView(
    roundAskBanker.value.askRoadCall.block.symbol,
    roundAskBanker.value
  );
});
watch(roundAskPlayer, () => {
  //每局開始時自動問閒
  // console.log('回合閒問路',roundAskPlayer.value.askRoadCall.block.symbol,roundAskPlayer.value)
  changeAskRoadBtnView(
    roundAskPlayer.value.askRoadCall.block.symbol,
    roundAskPlayer.value
  );
});
watch(askRoadRecall, () => {
  //玩家點擊問路
  console.log(
    "按鈕問路reCall",
    "問哪一路",
    currentAskRoadSide.value,
    "問路結果",
    askRoadRecall.value
  );
  changeAskRoadBtnView(currentAskRoadSide.value, askRoadRecall.value);
});
//function
function getBetLimit(tableBetIndoData: any) {
  //每次都把最大最小基準值恢復，再比大小
  minBetLimit.value = 999999999;
  maxBetLimit.value = -1;
  let keyList = Object.keys(tableBetIndoData);
  keyList
    .filter((i) => {
      return (
        i == "playerMin" ||
        i == "playerMax" ||
        i == "bankerMin" ||
        i == "bankerMax"
      );
    })
    .forEach((i: any) => {
      if (tableBetIndoData[i] < minBetLimit.value) {
        minBetLimit.value = tableBetIndoData[i];
      }
      if (tableBetIndoData[i] > maxBetLimit.value) {
        maxBetLimit.value = tableBetIndoData[i];
      }
    });
  // console.log(minBetLimit.value,maxBetLimit.value)
}
function numberFormat(number: number): string {
  return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
function getAllBetBack() {
  if (canBet.value && gameStatus.value == 1) {
    //可以下注，且遊戲狀態是下注中
    if (
      coinPosition.value[0].betStatus != 0 ||
      coinPosition.value[1].betStatus != 0 ||
      coinPosition.value[2].betStatus != 0 ||
      coinPosition.value[3].betStatus != 0 ||
      coinPosition.value[4].betStatus != 0
    ) {
      sendBetResetCall({
        gameUuid: roundUuid.value,
      });
      gsap.fromTo(
        "#cancleBet",
        { opacity: 1, y: 0, scale: 1, color: "yellow" },
        { duration: 2, scale: 3, opacity: 0, ease: Power4.easeOut }
      );
      store.commit("bet/setIsConfirmed", false); //取消確認
      store.commit("bet/setCanUseConfirm", true); //確認按鈕可以按
      store.commit("bet/setCanUseFlyCard", true); //可以使用飛牌鈕
      store.commit("bet/setCanUseWatchCard",true) //可以使用咪牌鈕
      store.commit("bet/setFlyCard", false); //還沒按過飛牌
    } else {
      betErrorArray.value?.push("尚未下注");
    }
  } else {
    switch (gameStatus.value) {
      case 2:
        betErrorArray.value?.push("開牌中，無法取消");
        break;
      case 3:
        betErrorArray.value?.push("等待中，無法取消");
        break;
    }
  }
}
function sendConfirmBetCall() {
  //發送確認下注請求
  //可以發出確認紐的時機:
  //1.canBet  2.玩家有下注在任一區域時  3.當局還沒按過確認鍵
  if (canBet.value && !isConfirmed.value && gameStatus.value == 1) {
    if (
      coinPosition.value[0].betStatus != 0 ||
      coinPosition.value[1].betStatus != 0 ||
      coinPosition.value[2].betStatus != 0 ||
      coinPosition.value[3].betStatus != 0 ||
      coinPosition.value[4].betStatus != 0
    ) {
      sendBetConfirmCall({
        gameUuid: roundUuid.value,
      });
      store.commit("bet/setCanUseFlyCard", false); //不能按飛牌，把顏色變成灰色
    } else {
      betErrorArray.value?.push("尚未下注");
    }
  } else {
    switch (gameStatus.value) {
      case 2:
        betErrorArray.value?.push("開牌中，無法下注");
        break;
      case 3:
        betErrorArray.value?.push("等待中，無法下注");
        break;
    }
  }
}
function confirmBet() {
  //收到serve確認下注時的動作
  if (canBet.value && !isConfirmed.value) {
    //噴出確認下注的提示文字
    gsap.fromTo(
      "#betConfirm",
      { opacity: 1, y: 0, scale: 1, color: "yellow" },
      { duration: 2, scale: 3, opacity: 0, ease: Power4.easeOut }
    );
    //不能下注，除非按取消
    store.commit("bet/setIsConfirmed", true);
    store.commit("bet/setCanUseConfirm", false); //確認按鈕不能按
    store.commit("bet/setCanUseWatchCard", false); //咪排按鈕不能按
    console.log("確認鈕不可以按了", canConfirm.value);
  }
}
function flyCard() {
  //飛牌
  if(gameStatus.value!==1) return;
  if (!canBet.value) return;
  if (isConfirmed.value) return;
  if (!canUseFlyCard.value) return;
  //發送飛牌給serve
  sendFlyCardCall({
    gameUuid: roundUuid.value,
  });
  // canBet.value = false;
  store.commit("bet/setCanBet", false); //不能下注
  store.commit("bet/setCanUseConfirm", false); //確認按鈕不能按
  store.commit("bet/setFlyCard", true); //按過飛牌了
  store.commit("bet/setCanUseFlyCard", false); //飛牌鈕不能使用了
  store.commit("bet/setCanUseWatchCard", false); //也不能咪牌了
  //清空下注
  coinPosition.value.forEach((i: any) => {
    i.coinArray = [];
    i.initBottom = 0;
    i.betStatus = 0;
    i.tableAllPlayerBetStatus = 0;
    i.initX = 0;
  });
}
function watchCard() {
  //咪牌
  if (flyCardStatus.value) return;
  if (isConfirmed.value) return;
  store.commit("bet/setWatchCard", !watchCardStatus.value);
  console.log("按下咪牌",watchCardStatus.value)
}
function alertCanWatchCard() {
  //收到此人獲得咪牌權限時傳送此人要不要咪牌
  sendWatchCardCall({
    confirm: watchCardStatus.value,
  });
}
function setBetStatusTextColor() {
  //更換bstStatus和totalBet的顏色
  let betStatusText = document.querySelectorAll(".betStatus") as NodeListOf<
    HTMLElement
  >;
  let totalBet = document.querySelector("#totalBet") as HTMLElement;
  if (isConfirmed.value) {
    //按過了是灰色
    //字變成白色
    betStatusText.forEach((i: HTMLElement) => {
      i.style.color = "white";
    });
    totalBet.style.color = "white";
  } else {
    //字變成灰色
    betStatusText.forEach((i: HTMLElement) => {
      i.style.color = "gray";
    });
    totalBet.style.color = "gray";
  }
}
function setConfirmBtnColor() {
  //更換確認紐顏色
  let confirmBtn = document.querySelector(
    ".bettingArea-btn-check"
  ) as HTMLElement;

  if (!canConfirm.value) {
    //按過了是灰色
    confirmBtn.style.background = "rgb(80, 78, 78)";
  } else {
    //按鈕變成原本顏色
    confirmBtn.style.background = "#415BBB";
  }
}
function setFlyCardColor() {
  let flyCardBtn = document.querySelector(".fly-card") as HTMLElement;
  if (!flyCardBtn) return;
  if (!canUseFlyCard.value) {
    console.log("使否可以使用飛牌鈕", canUseFlyCard.value);
    flyCardBtn.style.backgroundColor = "rgb(80, 78, 78)"; //變成灰色
  } else {
    console.log("使否可以使用飛牌鈕", canUseFlyCard.value);
    flyCardBtn.style.backgroundColor = "#644d31"; //變回原本顏色
  }
}
function setWatchCardColor() {
  let watchCardBtn = document.querySelector("#watchCard-btn") as HTMLElement;
  if (!watchCardBtn) return;
  if (!canWatchCard.value) {
    //按過了變成灰色的
    watchCardBtn.style.backgroundColor = "rgb(80, 78, 78)"; //變成灰色
  } else {
    watchCardBtn.style.backgroundColor = "rgba(128, 0, 128, 0.829)";
  }
}
function setCancleBetBtnColor() {
  let cancleBtn = document.querySelector(
    ".bettingArea-btn-gitbackAllCoin"
  ) as HTMLElement;
  if (!isConfirmed.value) {
    //沒按過確認紐的時候是灰色的
    cancleBtn.style.background = "rgb(80, 78, 78)";
  } else {
    //按鈕變成原本顏色
    cancleBtn.style.background = "#415BBB";
  }
}
function askRoad(roadNum: number) {
  currentAskRoadSide.value = roadNum;
  store.commit("roadmap/setAskRoad", roadNum);
  sendAskRoadCall({
    symbol: roadNum,
  });
}
function changeAskRoadBtnView(currentRoadNum: number, askRoadRecall: any) {
  //更換問路時候，按鈕上顯示的圖案
  let smallRoad = document.getElementById(
    `smallRoad-${currentRoadNum}`
  ) as HTMLElement;
  let bigEyes = document.getElementById(
    `bigEyeRoad-${currentRoadNum}`
  ) as HTMLElement;
  let cockroach = document.getElementById(
    `cockroachRoad-${currentRoadNum}`
  ) as HTMLElement;
  // console.log(smallRoad , bigEyes ,cockroach)
  // if(!smallRoad || !bigEyes || !cockroach) return
  smallRoad?.classList.remove(smallRoad.classList[0]);
  bigEyes?.classList.remove(bigEyes.classList[0]);
  cockroach?.classList.remove(cockroach.classList[0]);
  if (askRoadRecall.smallRoadNext) {
    switch (askRoadRecall.smallRoadNext.symbol) {
      case 1:
        smallRoad.classList.add("small-red-ask");
        break;
      case 2:
        smallRoad.classList.add("small-blue-ask");
        break;
    }
  }
  if (askRoadRecall.bigEyeRoadNext) {
    switch (askRoadRecall.bigEyeRoadNext.symbol) {
      case 1:
        bigEyes.classList.add("bigEye-red-ask");
        break;
      case 2:
        bigEyes.classList.add("bigEye-blue-ask");
        break;
    }
  }
  if (askRoadRecall.cockroachRoadNext) {
    switch (askRoadRecall.cockroachRoadNext.symbol) {
      case 1:
        cockroach.classList.add("cockroach-red-ask");
        break;
      case 2:
        cockroach.classList.add("cockroach-blue-ask");
        break;
    }
  }
  // console.log('更換按鈕的下三路圖形:小路/大眼/蟑螂',askRoadRecall.smallRoadNext,askRoadRecall.bigEyeRoadNext,askRoadRecall.cockroachRoadNext)
}
</script>
