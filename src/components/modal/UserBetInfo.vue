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
          <div class="" v-for="(info,index) in userBetInfoArray" :key="index">
            <ul class="userBetInfo-ul list-group list-group-horizontal">
            <li class="userBetInfo-title list-group-item">桌號</li>
            <li class="userBetInfo-content list-group-item">
              {{ tabNum }}
            </li>
          </ul>
          <ul class="userBetInfo-ul list-group list-group-horizontal">
            <li class="userBetInfo-title list-group-item">靴號</li>
            <li class="userBetInfo-content list-group-item">
              {{ info.gameUuid }}
            </li>
          </ul>
          <ul class="userBetInfo-ul list-group list-group-horizontal">
            <li class="userBetInfo-title list-group-item">遊戲局號</li>
            <li class="userBetInfo-content list-group-item">
              {{ numOfround }}
            </li>
          </ul>
          <ul class="userBetInfo-ul list-group list-group-horizontal">
            <li class="userBetInfo-title list-group-item">遊戲輸贏</li>
            <li class="userBetInfo-content list-group-item">
              {{ info.gameResult }}
            </li>
          </ul>
          <ul class="userBetInfo-ul list-group list-group-horizontal">
            <li class="userBetInfo-title list-group-item">贏得金錢</li>
            <li class="userBetInfo-content list-group-item">
              {{ info.gainMoney }}
            </li>
          </ul>
          <ul class="userBetInfo-ul list-group list-group-horizontal">
            <li class="userBetInfo-title list-group-item">下注</li>
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
                  <div class="row justify-content-center pb-3" :class="[`userBetInfo-player${index}`]">
                    <div
                      :class="[
                        'userInfo-caritem',
                        {
                          'card-item-w d-flex justify-content-center col-9':
                            num === 0,
                        },
                      ]"
                      v-for="(card, num) in info.cardPositionArr.banker"
                      :key="num"
                    >
                      <div :class="[`userBet-player-poker${index}${num}`]"></div>
                    </div>
                  </div>
                  <div class="row justify-content-center pb-3" :class="[`userBetInfo-banker${index}`]">
                    <div
                      :class="[
                        'userInfo-caritem',
                        {
                          'card-item-w d-flex justify-content-center col-9':
                            num === 0,
                        },
                      ]"
                      v-for="(card, num) in info.cardPositionArr.player"
                      :key="num"
                    >
                      <div :class="[`userBet-banker-poker${index}${num}`]"></div>
                    </div>
                  </div>
                </section>
              </div>
            </li>
          </ul>
          </div>
        </div>
        <div class="userBetInfo-footer modal-footer">
          <!-- <nav aria-label="Page navigation example">
            <ul class="pagination pagination-sm">
              <li class="page-item disabled">
                <a class="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li
                class="page-item"
                :class="{ active: index == currentPagination }"
                @click="currentPagination = index"
                v-for="index in 3"
                :key="index"
              >
                <a class="page-link" href="#"> {{ index }}</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, reactive, onMounted } from "vue";
import { useStore } from "vuex";
import proto from "@/assets/js/bundle";
import { useRoute } from "vue-router";
interface userInfo {
  gameUuid: string,
  gameResult: number,
  gainMoney: number,
  totalBet: number,
  cardPositionArr:cards,
  cardResultArr:cardResult[] //server傳來的card陣列
}
interface cards {
  banker:number[],
  player:number[],
}
interface cardResult {
  cardSide:number,
  cardSuit:number,
  cardPoint:number,
  cardPosition:number,
}
onMounted(() => {
  cardPositionInit() 
  userBetInfoArray.forEach((i:userInfo,index:number)=>{
    i.cardResultArr.forEach((card:cardResult)=>{
      showCards(card.cardSide, card.cardSuit, card.cardPoint, card.cardPosition,index);
    })
    setWinCardBoxLight(index,i.gameResult);
  })
  
});
//userBetInfo
const userBetInfoArray = reactive<userInfo[]>([
  {
    gameUuid: '12345',
    gameResult: 1,
    gainMoney: 1000,
    totalBet: 20000,
    cardPositionArr:{
      banker:[0,0,0],
      player:[0,0,0]
    },
    cardResultArr:[
      {cardSide:1,cardSuit:3,cardPoint:10,cardPosition:1},
      {cardSide:1,cardSuit:2,cardPoint:7,cardPosition:2},
      {cardSide:1,cardSuit:1,cardPoint:9,cardPosition:3},
      {cardSide:2,cardSuit:3,cardPoint:13,cardPosition:1},
      {cardSide:2,cardSuit:2,cardPoint:3,cardPosition:2},
      {cardSide:2,cardSuit:1,cardPoint:1,cardPosition:3},
    ]
  },
  {
    gameUuid: '12454545',
    gameResult: 2,
    gainMoney: 10000,
    totalBet: 200,
    cardPositionArr:{
      banker:[0,0,0],
      player:[0,0,0]
    },
    cardResultArr:[
      {cardSide:1,cardSuit:3,cardPoint:10,cardPosition:1},
      {cardSide:1,cardSuit:2,cardPoint:7,cardPosition:2},
      {cardSide:2,cardSuit:3,cardPoint:13,cardPosition:1},
      {cardSide:2,cardSuit:2,cardPoint:3,cardPosition:2},
      {cardSide:2,cardSuit:1,cardPoint:1,cardPosition:3},
    ]
  },
  {
    gameUuid: '34985394589048',
    gameResult: 1,
    gainMoney: 10000,
    totalBet: 200,
    cardPositionArr:{
      banker:[0,0,0],
      player:[0,0,0]
    },
    cardResultArr:[
      {cardSide:1,cardSuit:3,cardPoint:10,cardPosition:1},
      {cardSide:1,cardSuit:2,cardPoint:7,cardPosition:2},
      {cardSide:1,cardSuit:1,cardPoint:9,cardPosition:3},
      {cardSide:2,cardSuit:3,cardPoint:13,cardPosition:1},
      {cardSide:2,cardSuit:2,cardPoint:3,cardPosition:2},
    ]
  },
])
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
//router
const route = useRoute()
const tabNum = computed(()=>{
  return route.params.tableId
})
//vuex
const store = useStore();
const gameUuid = computed(() => {
  return store.state.game.gameUuid;
});
const numOfround = computed(() => {
  return store.state.game.numOfRound;
});
const numOfShoe = computed(() => {
  return store.state.game.numOfShoe;
});
const gameResultText = ref();
const userWinMoney = ref();
const currentPagination = ref(0);
const gameResultRecall = computed(() => {
  //回傳的是陣列
  return store.state.dealer.BroadcastGameResult.results;
});
const winMoney = computed(() => {
  return store.state.dealer.BroadcastGameResult.totalWin;
});
const totalBet = computed(() => {
  return store.state.bet.totalBets;
});
const userInfoArray = reactive<userInfo[]>([
  {
    gameUuid: "尚未開局",
    gameResult: "",
    gainMoney: 0,
    totalBet: 0,
  },
]);
const userInfo = ref<userInfo>({
  gameUuid: "",
  gameResult: "",
  gainMoney: 0,
  totalBet: 0,
});
watch(gameUuid, () => {
  userInfo.value.gameUuid = gameUuid.value;
  userInfoArray.push({
    gameUuid: gameUuid.value,
    gameResult: "",
    gainMoney: 0,
    totalBet: 0,
  });
  userInfo.value = userInfoArray.shift() as userInfo;
  resetUserInfo();
});
watch(totalBet, () => {
  userInfoArray[0].totalBet = totalBet.value;
});
watch(gameResultRecall, () => {
  if (userInfoArray[0]) displayGameResult();
});
watch(winMoney, () => {
  if (winMoney.value)
    userInfoArray[0].gainMoney = winMoney.value
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
});
function displayGameResult() {
  gameResultRecall.value.forEach((i: any) => {
    if (i !== undefined) {
      switch (i) {
        case 2:
          userInfoArray[0].gameResult += "莊家";
          gameResultText.value += "莊家 ";
          break;
        case 1:
          userInfoArray[0].gameResult += "閒家";
          gameResultText.value += "閒家 ";
          break;
        case 5:
          userInfoArray[0].gameResult += "莊對";
          gameResultText.value += "莊對 ";
          break;
        case 4:
          userInfoArray[0].gameResult += "和局";
          gameResultText.value += "和局 ";
          break;
        case 3:
          userInfoArray[0].gameResult += "閒對";
          gameResultText.value += "閒對 ";
          break;
      }
    }
  });
}
function resetUserInfo() {
  // userInfoArray.shift()  //把第一筆資料噴出去
  // gameResultText.value = ""
}
function getCardPosition( //卡牌要畫在哪一格
  cardSideClassName: string,
  userBetInfoIndex:number, //第幾格的userBetInfo
  position: number,
): HTMLElement | undefined {
  switch (position) {
    case 1:
    case 2:
      return document.querySelector(
        `${cardSideClassName}${userBetInfoIndex}${position}`
      ) as HTMLElement;
    case 3: //補牌的位置
      return document.querySelector(`${cardSideClassName}${userBetInfoIndex}0`) as HTMLElement;
  }
}
function showCards( //劃出該張卡牌
  cardSide: number,
  cardSuit: number,
  cardPoint: number,
  cardPosition: number,
  userBetInfoIndex:number, //第幾格的userBetInfo
) {
  let suit = cardSuit;
  let point = cardPoint;
  let position = cardPosition;
  let cardElement: HTMLElement | undefined;
  switch (cardSide) {
    case proto.dealer.Side.Banker:
      cardElement = getCardPosition(".userBet-banker-poker",userBetInfoIndex,position);
      bankCardArray.value[position - 1] = point; //把卡加在指定的POSITION陣列中
      break;
    case proto.dealer.Side.Player:
      cardElement = getCardPosition( ".userBet-player-poker",userBetInfoIndex,position);
      playerCardArray.value[position - 1] = point; //把卡加在指定的POSITION陣列中
      break;
  }
  if (cardElement) {
    console.log(cardElement)
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
function setWinCardBoxLight(userBetInfoIndex:number,winSide:number) { //標示哪一邊贏
    //應該是根據該局的gameResult在HTML模板上面直接:class="[winPoker:win==]"
    switch (winSide) {
      case 1:
        let bankerCardBox = document.querySelector(`.userBetInfo-banker${userBetInfoIndex}`) as HTMLElement;
          bankerCardBox.classList.add("winPoker");
        break;
      case 2:
        let playererCardBox = document.querySelector(`.userBetInfo-player${userBetInfoIndex}`) as HTMLElement;
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
  console.log(viewportWidth)
  if (viewportWidth <= 1280 && viewportWidth > 1024) {
    scale.value = 0.14;
  } else if (viewportWidth <= 1024 && viewportWidth > 540) {
    scale.value = 0.25;
  } else if (viewportWidth <= 540 && viewportWidth > 375) {
    scale.value = 0.2;
  }else if(viewportWidth <= 375 && viewportWidth > 280){
    scale.value = 0.15;
  }else if (viewportWidth <= 280) {
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
