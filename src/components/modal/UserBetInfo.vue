<template>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title userBetInfoTitle" id="exampleModalLabel">
            玩家下注資訊
          </h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <!-- 日期 時間 靴號 局號 下注 輸贏 牌局結果 -->
          <div
            class="mb-3"
            v-for="(info, index) in userBetInfoArray"
            :key="index"
          >
            <ul class="userBetInfo-ul list-group list-group-horizontal">
              <li class="userBetInfo-title list-group-item">時間</li>
              <li class="userBetInfo-content list-group-item">
                {{ info.gameTime }}
              </li>
            </ul>
            <ul class="userBetInfo-ul list-group list-group-horizontal">
              <li class="userBetInfo-title list-group-item">桌號</li>
              <li class="userBetInfo-content list-group-item">
                {{ info.table }}
              </li>
            </ul>
            <ul class="userBetInfo-ul list-group list-group-horizontal">
              <li class="userBetInfo-title list-group-item">靴號</li>
              <li class="userBetInfo-content list-group-item">
                {{ info.numOfShoe }}
              </li>
            </ul>
            <ul class="userBetInfo-ul list-group list-group-horizontal">
              <li class="userBetInfo-title list-group-item">遊戲局號</li>
              <li class="userBetInfo-content list-group-item">
                {{ info.numOfRound }}
              </li>
            </ul>
            <ul class="userBetInfo-ul list-group list-group-horizontal">
              <li class="userBetInfo-title list-group-item">遊戲輸贏</li>
              <li class="userBetInfo-content list-group-item">
                <div v-for="result in info.results" :key="result">
                  <span v-if="result == 1">莊贏 </span>
                  <span v-if="result == 2">閒贏 </span>
                  <span v-if="result == 3">莊對 </span>
                  <span v-if="result == 4">和局 </span>
                  <span v-if="result == 5">閒對 </span>
                </div>
              </li>
            </ul>
            <ul class="userBetInfo-ul list-group list-group-horizontal">
              <li class="userBetInfo-title list-group-item">贏得金錢</li>
              <li class="userBetInfo-content list-group-item">
                {{ info.totalWin }}
              </li>
            </ul>
            <ul class="userBetInfo-ul list-group list-group-horizontal">
              <li class="userBetInfo-title list-group-item">莊家下注</li>
              <li class="userBetInfo-content list-group-item">
                {{ info.bets.Banker }}
              </li>
            </ul>
            <ul class="userBetInfo-ul list-group list-group-horizontal">
              <li class="userBetInfo-title list-group-item">閒家下注</li>
              <li class="userBetInfo-content list-group-item">
                {{ info.bets.Player }}
              </li>
            </ul>
            <ul class="userBetInfo-ul list-group list-group-horizontal">
              <li class="userBetInfo-title list-group-item">和局下注</li>
              <li class="userBetInfo-content list-group-item">
                {{ info.bets.Tie }}
              </li>
            </ul>
            <ul class="userBetInfo-ul list-group list-group-horizontal">
              <li class="userBetInfo-title list-group-item">莊對下注</li>
              <li class="userBetInfo-content list-group-item">
                {{ info.bets.BankerPair }}
              </li>
            </ul>
            <ul class="userBetInfo-ul list-group list-group-horizontal">
              <li class="userBetInfo-title list-group-item">閒對下注</li>
              <li class="userBetInfo-content list-group-item">
                {{ info.bets.PlayerPair }}
              </li>
            </ul>
            <ul class="userBetInfo-ul list-group list-group-horizontal">
              <li class="userBetInfo-title list-group-item">總下注額</li>
              <li class="userBetInfo-content list-group-item">
                {{ info.totalBet }}
              </li>
            </ul>
            <ul class="userBetInfo-ul list-group list-group-horizontal">
              <li class="w-100 list-group-item">開牌結果</li>
            </ul>
            <ul class="userBetInfo-ul list-group list-group-horizontal">
              <li class="w-100 list-group-item">
                <div class="card-wrap">
                  <section class="d-flex justify-content-center">
                    <div
                      class="row justify-content-center pb-3"
                      :class="[`userBetInfo-player${index}`]"
                    >
                      <div
                        :class="[
                          'userInfo-caritem',
                          {
                            'card-item-w d-flex justify-content-center col-9':
                              num === 0,
                          },
                        ]"
                        v-for="(card, num) in cards.banker"
                        :key="num"
                      >
                        <div
                          :class="[`userBet-player-poker${index}${num}`]"
                        ></div>
                      </div>
                    </div>
                    <div
                      class="row justify-content-center pb-3"
                      :class="[`userBetInfo-banker${index}`]"
                    >
                      <div
                        :class="[
                          'userInfo-caritem',
                          {
                            'card-item-w d-flex justify-content-center col-9':
                              num === 0,
                          },
                        ]"
                        v-for="(card, num) in cards.player"
                        :key="num"
                      >
                        <div
                          :class="[`userBet-banker-poker${index}${num}`]"
                        ></div>
                      </div>
                    </div>
                  </section>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="userBetInfo-footer modal-footer"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, reactive, onUpdated, watch } from "vue";
import { useStore } from "vuex";
import proto from "@/assets/js/bundle";
interface userInfo {
  table: string;
  results: number[];
  bets: betStatus;
  totalBet: number;
  numOfShoe: number;
  numOfRound: number;
  draws: draw[]; //server傳來的card陣列,
  totalWin: number;
  gameTime: string;
}
interface betStatus {
  Banker: number;
  Player: number;
  BankerPair: number;
  Tie: number;
  PlayerPair: number;
}
interface cards {
  banker: number[];
  player: number[];
}
interface Card {
  suit: number;
  point: number;
}
interface draw {
  side: number;
  card: Card;
  position: number;
}
onUpdated(() => {
  cardPositionInit();
  resetCards(); //清除所有再顯示卡牌
  userBetInfoArray.value.forEach((i: userInfo, index: number) => {
    i.draws.forEach((card: draw) => {
      //畫出六張卡牌
      showCards(
        card.side,
        card.card.suit,
        card.card.point,
        card.position,
        index
      );
    });
    setWinCardBoxLight(index, i.results);
  });
});
//撲克牌資料
const uw = 373; //牌的原圖大小
const uh = 556; //牌的原圖大小
let scale = ref(0.2); //牌的縮放比例
const bankCardArray = ref([0, 0, 0]); //莊家卡牌陣列，INDEX代表位置為左下、右下、上(補牌)
const playerCardArray = ref([0, 0, 0]); //閒家卡牌陣列，INDEX代表位置為左下、右下、上(補牌)
const cards = reactive({
  banker: new Array(3),
  player: new Array(3),
});
//vuex
const store = useStore();
const userBetInfoArray = computed<userInfo[]>(() => {
  return store.state.history.HistoryRecall;
});
function resetCards() {
  //先清除所有卡牌的顯示
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 6; j++) {
      let bankerCard = document.querySelector(
        `.userBet-banker-poker${i}${j}`
      ) as HTMLElement;
      let playererCard = document.querySelector(
        `.userBet-player-poker${i}${j}`
      ) as HTMLElement;
      if (bankerCard && playererCard) {
        bankerCard.classList.remove("poker");
        playererCard.classList.remove("poker");
      }
    }
  }
}
function getCardPosition( //卡牌要畫在哪一格
  cardSideClassName: string,
  userBetInfoIndex: number, //第幾格的userBetInfo
  position: number
): HTMLElement | undefined {
  switch (position) {
    case 1:
    case 2:
      return document.querySelector(
        `${cardSideClassName}${userBetInfoIndex}${position}`
      ) as HTMLElement;
    case 3: //補牌的位置
      return document.querySelector(
        `${cardSideClassName}${userBetInfoIndex}0`
      ) as HTMLElement;
  }
}
function showCards( //畫出該張卡牌
  cardSide: number,
  cardSuit: number,
  cardPoint: number,
  cardPosition: number,
  userBetInfoIndex: number //第幾格的userBetInfo
) {
  let suit = cardSuit;
  let point = cardPoint;
  let position = cardPosition;
  let cardElement: HTMLElement | undefined;
  switch (cardSide) {
    case proto.dealer.Side.Banker:
      cardElement = getCardPosition(
        ".userBet-banker-poker",
        userBetInfoIndex,
        position
      );
      bankCardArray.value[position - 1] = point; //把卡加在指定的POSITION陣列中
      break;
    case proto.dealer.Side.Player:
      cardElement = getCardPosition(
        ".userBet-player-poker",
        userBetInfoIndex,
        position
      );
      playerCardArray.value[position - 1] = point; //把卡加在指定的POSITION陣列中
      break;
  }
  if (cardElement) {
    //畫卡
    cardElement.classList.add("poker");
    cardElement.style.width = `${uw * scale.value}px`;
    cardElement.style.height = `${uh * scale.value}px`;
    cardElement.style.backgroundPosition = `-${(point - 1) *
      uw *
      scale.value}px -${(suit - 1) * uh * scale.value}px`;
    cardElement.style.backgroundSize = `${(4849 * (uw * scale.value)) /
      uw}px ${(2224 * (uh * scale.value)) / uh}px`;
  }
}
function setWinCardBoxLight(userBetInfoIndex: number, winSide: number[]) {
  //標示哪一邊贏
  //應該是根據該局的gameResult在HTML模板上面直接:class="[winPoker:win==]"
  let win = 0;
  winSide.forEach((i) => {
    if (i == 1) win = 1;
    if (i == 2) win = 2;
  });
  switch (win) {
    case 0:
      let bankerCard = document.querySelector(
        `.userBetInfo-banker${userBetInfoIndex}`
      ) as HTMLElement;
      let playererCard = document.querySelector(
        `.userBetInfo-player${userBetInfoIndex}`
      ) as HTMLElement;
      bankerCard.classList.remove("winPoker");
      playererCard.classList.remove("winPoker");
      break;
    case 1:
      let bankerCardBox = document.querySelector(
        `.userBetInfo-banker${userBetInfoIndex}`
      ) as HTMLElement;
      bankerCardBox.classList.add("winPoker");
      break;
    case 2:
      let playererCardBox = document.querySelector(
        `.userBetInfo-player${userBetInfoIndex}`
      ) as HTMLElement;
      playererCardBox.classList.add("winPoker");
      break;
  }
}
function cardPositionInit() {
  //響應式初始化卡牌出現的位置
  let cardItem = document.querySelectorAll(".userInfo-caritem") as NodeListOf<
    HTMLElement
  >;
  const viewportWidth = window.innerWidth;
  if (viewportWidth <= 1280 && viewportWidth > 1024) {
    scale.value = 0.14;
  } else if (viewportWidth <= 1024 && viewportWidth > 540) {
    scale.value = 0.25;
  } else if (viewportWidth <= 540 && viewportWidth > 375) {
    scale.value = 0.2;
  } else if (viewportWidth <= 375 && viewportWidth > 280) {
    scale.value = 0.12;
  } else if (viewportWidth <= 280) {
    scale.value = 0.1;
  } else {
    scale.value = 0.19;
  }
  cardItem.forEach((i) => {
    i.style.width = `${uw * scale.value}px`;
    i.style.height = `${uh * scale.value}px`;
  });
}
</script>
