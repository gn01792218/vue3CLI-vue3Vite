<template>
  <div class="card-wrap">
    <section class="card-container d-flex justify-content-center">
      <div class="player card-box row justify-content-center position-relative pb-3">
        <div class="winCard-wrap position-absolute"></div>
        <!-- <span v-show="showCardResult" class="playerNum">{{ playerPoint }}</span> -->
        <div
          :class="[
            'caritem',
            { 'card-item-w d-flex justify-content-center col-9': index === 0 },
          ]"
          v-for="(card, index) in cards.banker"
          :key="index"
        >
          <div :class="[`playerPoker${index}`]"></div>
        </div>
        <div class="card-banner-player position-absolute"><span>閒</span><span v-show="showCardResult" class="playerNum">{{ playerPoint }}</span></div>
      </div>
      <div class="banker card-box row justify-content-center position-relative pb-3">
        <div class="winCard-wrap position-absolute"></div>
        <div
          :class="[
            'caritem',
            { 'card-item-w d-flex justify-content-center col-9': index === 0 },
          ]"
          v-for="(card, index) in cards.player"
          :key="index"
        >
          <div :class="[`bankPoker${index}`]"></div>
        </div>
         <div class="card-banner-banker position-absolute"><span v-show="showCardResult" class="bankerNum">{{ bankerPoint }}</span><span>莊</span></div>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useStore } from "vuex";
import proto from "../assets/js/bundle";
import useTable from '@/composables/table/useTable'
//初始化卡牌位置
onMounted(() => {
  cardPositionInit();
});
//卡牌響應式操作資料
let scale = ref(0.2);
const uw = 373;
const uh = 556;
const cards = reactive({
  banker: new Array(3),
  player: new Array(3),
});
//vuex
const store = useStore();
const roundUuid = computed(() => {
  //回合UUID
  return store.state.game.gameUuid;
});
const lastDrawCard = computed(() => {
  //陣列:進場前補畫的牌
  return store.state.game.GameStatus.draws;
});
const gameStatus = computed(() => {
  //遊戲狀態
  return store.state.game.GameStatus.status;
});
const DrawCard = computed(() => {
  //每次都傳一張
  return store.state.dealer.Draw;
});
const gameResult = computed(() => {
  //回傳的是陣列
  return store.state.dealer.BroadcastGameResult.results;
});
const gameEnd = computed(() => {
  //換靴
  return store.state.dealer.end;
});
//useTable
const { tableNum } = useTable(store)
const bankCardArray = ref([0, 0, 0]); //莊家卡牌陣列，INDEX代表位置為左下、右下、上(補牌)
const playerCardArray = ref([0, 0, 0]); //閒家卡牌陣列，INDEX代表位置為左下、右下、上(補牌)
const playerPoint = ref(0); //閒家卡牌總和
const bankerPoint = ref(0); //莊家卡牌總和
const showCardResult = ref(false);
//響應式卡牌監聽 應付電腦解析度切換、行動裝置直橫切換
const mqlMax1280 = window.matchMedia("(max-width :1280px)");
mqlMax1280.addEventListener("change", () => {
  cardPositionInit();
  console.log('變更卡牌尺寸')
});
//watch
window.addEventListener("reSetCards", () => {
  console.log("斷線重連，卡牌重整");
  resetCards();
  resetCardPoint();
});
watch(tableNum, () => {
  //換桌的時候卡牌要先重置
  resetCards();
  resetCardPoint();
});
watch(gameEnd, () => {
  //換薛時也要重置
  resetCards(); //不管哪個狀態都先執行一次清除卡牌
  resetCardPoint();
  showCardResult.value = false;
});
watch(roundUuid, () => {
  //uuid改變時，更換卡牌
  // console.log('偵測到不同局，畫牌要重置',gameStatus.value)
  resetCards(); //不是畫卡的時候才要reset
  resetCardPoint();
  showCardResult.value = false; //不顯示卡牌
});
watch(gameResult, () => {
  //有遊戲結果時，顯示贏的一方
  setWinCardBoxLight();
  if (gameResult.value.length > 0) {
    showCardTotalPoint();
  }
});
watch(DrawCard, () => {
  //開牌
  //  console.log("開牌")
  let card = DrawCard.value;
  showCards(card.side, card.card.suit, card.card.point, card.position);
});
watch(lastDrawCard, () => {
  //補畫進場前的卡牌
  if (gameStatus.value == 2) {
    //防止server在等待時間也傳卡牌來
    lastDrawCard.value.forEach((i: any) => {
      showCards(i.side, i.card.suit, i.card.point, i.position);
    });
  }
});
//撲克牌業務代碼
function resetCards() {
  for (let i = 0; i < 3; i++) {
    //清除卡牌的顯示
    cards.banker[i] = null;
    cards.player[i] = null;
    let bankPoker = document.querySelectorAll(`.bankPoker${i}`);
    let playerPoker = document.querySelectorAll(`.playerPoker${i}`);
    bankPoker.forEach((i) => {
      i.classList.remove("poker");
    });
    playerPoker.forEach((i) => {
      i.classList.remove("poker");
    });
  }
  let winCardBox = document.querySelectorAll(".winPoker");
  winCardBox.forEach((i) => {
    //移除贏的區塊閃爍動畫
    i.classList.remove("winPoker");
  });
}
function setWinCardBoxLight() {
  gameResult.value.forEach((i: any) => {
    switch (i) {
      case 1:
        let bankerCardBox = document.querySelectorAll(".banker");
        bankerCardBox.forEach((i) => {
          i.querySelector('.winCard-wrap')?.classList.add("winPoker")
          // i.classList.add("winPoker");
        });
        break;
      case 2:
        let playererCardBox = document.querySelectorAll(".player");
        playererCardBox.forEach((i) => {
          i.querySelector('.winCard-wrap')?.classList.add("winPoker")
          // i.classList.add("winPoker");
        });
        break;
    }
  });
}
function resetCardPoint() {
  playerPoint.value = 0;
  bankerPoint.value = 0;
  playerCardArray.value = [0, 0, 0];
  bankCardArray.value = [0, 0, 0];
}
async function showCardTotalPoint() {
  //開牌完成時，計算各家的卡牌總和
  // console.log('加總前的arr狀態:','閒',playerCardArray.value,'莊',bankCardArray.value)
  playerCardArray.value.forEach((i) => {
    if (i >= 10) {
      i = 0;
    }
    playerPoint.value += i;
    playerPoint.value = playerPoint.value % 10;
  });
  bankCardArray.value.forEach((i) => {
    if (i >= 10) {
      i = 0;
    }
    bankerPoint.value += i;
    bankerPoint.value = bankerPoint.value % 10;
  });
  showCardResult.value = true;
  // console.log("計算最終卡牌點數",'閒',playerCardArray.value,playerPoint.value,'莊',bankCardArray.value,bankerPoint.value,'要不要顯示卡牌',showCardResult.value)
}
function getCardPosition(
  position: number,
  cardSideClassName: string
): NodeListOf<HTMLElement> | undefined {
  switch (position) {
    case 1:
    case 2:
      return document.querySelectorAll(`${cardSideClassName}${position}`);
    case 3:
      return document.querySelectorAll(`${cardSideClassName}0`);
  }
}
function showCards(
  cardSide: number,
  cardSuit: number,
  cardPoint: number,
  cardPosition: number
) {
  let suit = cardSuit;
  let point = cardPoint;
  let position = cardPosition;
  let cardElement: NodeListOf<HTMLElement> | undefined;
  switch (cardSide) {
    case proto.dealer.Side.Banker:
      cardElement = getCardPosition(position, ".bankPoker");
      bankCardArray.value[position - 1] = point; //把卡加在指定的POSITION陣列中
      break;
    case proto.dealer.Side.Player:
      cardElement = getCardPosition(position, ".playerPoker");
      playerCardArray.value[position - 1] = point; //把卡加在指定的POSITION陣列中
      break;
  }
  if (cardElement) {
    //畫卡
    cardElement.forEach((i) => {
      i.classList.add("poker");
      i.style.width = `${uw * scale.value}px`;
      i.style.height = `${uh * scale.value}px`;
      i.style.backgroundPosition = `-${(point - 1) *
        uw *
        scale.value}px -${(suit - 1) * uh * scale.value}px`;
      i.style.backgroundSize = `${(4849 * (uw * scale.value)) / uw}px ${(2224 *
        (uh * scale.value)) /
        uh}px`;
    });
  }
}
function cardPositionInit() {
  //響應式初始化卡牌出現的位置
  let cardItem = document.querySelectorAll(".caritem") as NodeListOf<
    HTMLElement
  >;
  const viewportWidth = window.innerWidth;
  if (viewportWidth <= 1280 && viewportWidth > 1024) {
    scale.value = 0.14;
  } else if (viewportWidth <= 1024 && viewportWidth > 540) {
    scale.value = 0.25;
  } else if (viewportWidth <= 540 && viewportWidth > 280) {
    scale.value = 0.14;
  } else if (viewportWidth <= 280) {
    scale.value = 0.12;
  } else {
    scale.value = 0.19;
  }
  cardItem.forEach((i) => {
    i.style.width = `${uw * scale.value}px`;
    i.style.height = `${uh * scale.value}px`;
  });
}
</script>
