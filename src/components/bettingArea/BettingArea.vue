<template>
  <GameresultSound />
  <div class="betArea position-relative">
    <!-- <ConfirmWatchCard /> -->
    <watchCardBox />
    <!-- PC版本注區 -->
    <div class="betArea-pc position-relative">
      <GameResultLoading />
      <ul class="betInfortext-ul position-absolute">
        <transition-group @enter="betErrorAnimation">
          <li v-for="(betErr, index) in betErrorArray" :key="index">
            {{ betErr }}
          </li>
        </transition-group>
        <li id="betConfirm">確認下注!!</li>
        <li id="cancleBet">取消下注!!</li>
      </ul>
      <div class="betArea-pc-container">
        <div
          :class="[
            `betArea-item${index + 1}`,
            i.configClass,
            'col-6 d-flex flex-column justify-content-around',
          ]"
          v-for="(i, index) in coinPosition.slice(0, 2)"
          :key="index"
          @click="sendBetData($event, index)"
        >
          <div class="betArea-item-top position-absolute d-flex flex-column">
            <span>{{ i.host }}</span>
            <span class="betRatioText">{{ i.odds }}</span>
          </div>
          <div class="betArea-item-bottom position-absolute">
            <p class="betStatus" v-show="i.betStatus > 0">{{ i.betStatus }}</p>
            <p class="table-total-betStatus" v-show="tableNum.includes('VIP')">
              總注額:{{ i.tableAllPlayerBetStatus }}
            </p>
          </div>
          <ul class="coinPosition">
            <transition-group @enter="generateCoinAnimate">
              <li
                v-for="(coin, index) in i.coinArray"
                :key="index"
                :class="[coin, `index${index}`]"
              ></li>
            </transition-group>
          </ul>
        </div>
      </div>
      <div class="betArea-pc-container">
        <div
          :class="[
            `betArea-item${index + 3}`,
            i.configClass,
            'col-4 d-flex flex-column justify-content-center',
          ]"
          v-for="(i, index) in coinPosition.slice(2, coinPosition.length)"
          :key="index"
          @click="sendBetData($event, index + 2)"
        >
          <div class="betArea-item-top position-absolute d-flex flex-column">
            <span>{{ i.host }}</span>
            <span class="betRatioText">{{ i.odds }}</span>
          </div>
          <div class="betArea-item-bottom position-absolute">
            <p class="betStatus" v-show="i.betStatus > 0">{{ i.betStatus }}</p>
            <p class="table-total-betStatus" v-show="tableNum.includes('VIP')">
              總注額:{{ i.tableAllPlayerBetStatus }}
            </p>
          </div>
          <ul class="coinPosition">
            <transition-group @enter="generateCoinAnimate">
              <li
                v-for="(coin, index) in i.coinArray"
                :key="index"
                :class="[coin, `index${index}`]"
              ></li>
            </transition-group>
          </ul>
        </div>
      </div>
    </div>
    <!-- mobile注區 -->
    <div class="betArea-mobile position-relative">
      <GameResultLoading />
      <ul class="betError position-absolute">
        <transition-group @enter="betErrorAnimation">
          <li v-for="(betErr, index) in betErrorArray" :key="index">
            {{ betErr }}
          </li>
        </transition-group>
        <li id="betConfirm">確認下注!!</li>
        <li id="cancleBet">取消下注!!</li>
      </ul>
      <div class="betArea-mobile-container d-flex">
        <div
          :class="[
            `betArea-item${index + 1}`,
            i.configClass,
            { 'col-6': index === 0 || index === 1 },
            { 'col-4': index !== 0 || index !== 1 },
            'd-flex flex-column justify-content-center',
          ]"
          v-for="(i, index) in coinPosition"
          :key="index"
          @click="sendBetData($event, index)"
        >
          <div class="betArea-item-top position-absolute d-flex flex-column">
            <span>{{ i.host }}</span>
            <span class="betRatioText">{{ i.odds }}</span>
          </div>
          <div class="betArea-item-bottom position-absolute">
            <p class="betStatus" v-show="i.betStatus > 0">{{ i.betStatus }}</p>
            <p class="table-total-betStatus" v-show="tableNum.includes('VIP')">
              總注額:{{ i.tableAllPlayerBetStatus }}
            </p>
          </div>
          <ul class="coinPosition">
            <transition-group @enter="generateCoinAnimate">
              <li
                v-for="(coin, index) in i.coinArray"
                :key="index"
                :class="[coin, `index${index}`]"
              ></li>
            </transition-group>
          </ul>
        </div>
      </div>
    </div>
    <!-- total Bet -->
    <div class="bettingArea-betInfo em font-total">
      <p id="totalBet" class="d-none d-lg-block">本次注額{{ total }}</p>
      <ul class="d-block d-lg-none">
        <section class="d-flex" v-if="betInfo">
          <li class="mobilTableInfo font_yellow">
            莊家 : {{ betInfo.banker }}
          </li>
          <li class="mobilTableInfo font_red">閒家 : {{ betInfo.player }}</li>
          <li class="mobilTableInfo font_green">和局 : {{ betInfo.tie }}</li>
          <li class="mobilTableInfo font_yellow">
            莊對 : {{ betInfo.bankerPair }}
          </li>
          <li class="mobilTableInfo font_red">
            閒對 : {{ betInfo.playerPair }}
          </li>
          <!-- <li v-if="totalRound>0">總局數 : {{totalRound}}</li> -->
        </section>
        <section class="d-flex" v-else>
          <li class="mobilTableInfo font_yellow">莊家 : 0</li>
          <li class="mobilTableInfo font_red">閒家 : 0</li>
          <li class="mobilTableInfo font_green">和局 : 0</li>
          <li class="mobilTableInfo font_yellow">莊對 : 0</li>
          <li class="mobilTableInfo font_red">閒對 : 0</li>
          <!-- <li v-if="totalRound>0">總局數 : 0</li> -->
        </section>
      </ul>
    </div>
    <!-- coin -->
    <div class="coinArea position-relative">
      <LightBox />
      <!-- coin list -->
      <div
        :id="`defaultCoin${index + 1}`"
        v-for="(coin, index) in coinList"
        :key="index"
        :class="[
          coin.point === currentCoint.point ? `coin-${coin.point}-current` : '',
          `coin-${coin.point}`,
        ]"
        @click="chooseCoint(index, $event)"
      ></div>
      <!-- coin ammo -->
      <ul class="shotCoinUl d-flex position-absolute">
        <div v-for="(coin, index) in coinList" :key="index">
          <transition-group v-if="coin.ammo.length >= 0" @enter="cointAnimate">
            <div
              :class="[ammo, 'shotCoinPice', `ammo${coin.num}`]"
              v-for="(ammo, index) in coin.ammo"
              :key="index"
            ></div>
          </transition-group>
        </div>
      </ul>
    </div>
    <!-- 按鈕區 -->
    <BtnList />
    <GameResult />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
  watch,
} from "vue";
import GameResult from "@/components/GameResult.vue";
import GameresultSound from "@/components/GameResultSound.vue";
import GameResultLoading from "@/components/GameResultLoading.vue";
import LightBox from "@/components/LightBox.vue";
import watchCardBox from "@/components/modal/watchCardBox.vue";
import BtnList from "@/components/bettingArea/BtnList.vue";
// import ConfirmWatchCard from "@/components/modal/ConfirmWatchCard.vue";
import { gsap, Power4 } from "gsap";
import { sendBetCall } from "@/socketApi";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import proto from "@/assets/js/bundle";
import $ from "jquery";
interface currentCoint {
  coinElement: any | null; //選擇的籌碼div元素
  num: number | null; //儲存點到的是第幾個
  point: number;
  x: number; //起飛的x
  y: number; //起飛的y
}
interface target {
  x: number;
  y: number;
}
interface coinPosition {
  initBottom: number; //初始化的bottom值
  initX: number; //水平初始位置
  coinArray: string[]; //生籌碼的地方
  odds: string;
  host: string;
  configClass: string;
  betStatus: number; //目前這一回合的下注狀況
  tableAllPlayerBetStatus: number;
  maxBet: number; //最大限注
}
export default defineComponent({
  components: {
    GameResult,
    GameresultSound,
    GameResultLoading,
    LightBox,
    watchCardBox,
    BtnList,
    // ConfirmWatchCard,
  },
  setup() {
    //初始化
    onMounted(() => {
      //初始化籌碼
      setDefaultCoin();
    });
    //路由
    const route = useRoute();
    const tableNum = computed(() => {
      //當前桌號
      return route.params.tableId;
    });
    //vuex資料
    const store = useStore();
    const user = computed(() => {
      return store.state.auth.UserInfo.user;
    });
    const canBet = computed(() => {
      return store.state.bet.canBet;
    });
    const betStatus = computed(() => {
      //玩家在各注區的下注額
      return store.state.bet.betstatus;
    });
    const broadcastBetstatus = computed(() => {
      //此桌所有玩家的下注額
      return store.state.bet.BroadcastBetstatus;
    });
    const betCallArray = computed(() => {
      //換桌時，server會回傳此桌的歷史下注資訊(哪個注區下了多少某種籌碼)
      return store.state.bet.BetRecall.betCall; //回傳陣列
    });
    const betResult = computed(() => {
      //下注成功否的狀態
      return store.state.bet.BetRecall.result;
    });
    const betResetresult = computed(() => {
      //取消下注成功與否
      return store.state.bet.BetResetRecall.result;
    });

    const betError = computed(() => {
      //錯誤訊息
      return store.state.bet.BetRecall.betError;
    });
    const roundUuid = computed(() => {
      //遊戲回合的Uuid
      return store.state.game.gameUuid;
    });
    const gameResult = computed(() => {
      //回傳的是陣列
      return store.state.dealer.BroadcastGameResult.results;
    });
    const gameStatus = computed(() => {
      //遊戲狀態 1.下注中 2.開牌中 3.等待中
      return store.state.game.GameStatus.status;
    });
    const betInfo = computed(() => {
      //莊家閒家等輸贏次數統計數字
      return store.state.game.gameResultCount;
    });
    const total = computed(() => {
      //玩家此局的總下注額
      return store.state.bet.totalBets;
    });
    const gameEnd = computed(() => {
      //換靴
      return store.state.dealer.end;
    });
    const gameEndUuid = computed(() => {
      //下注結束
      return store.state.game.gameEndUuid;
    });
    const coinList = computed(() => {
      //該桌籌碼陣列
      return store.state.table.tableCoinData[tableNum.value as string];
    });
    const onlinePlayersNumber = computed(() => {
      //在線人數
      return store.state.lobby.BroadcastTotalPlayersOnline.numberOfPlayers;
    });
    const isConfirmed = computed(() => {
      //確認鈕狀態
      return store.state.bet.isConfirmed;
    });
    const betErrorArray = computed(() => {
      return store.state.bet.betErrorArray;
    });
    //基本資料
    const betCallTemp = ref({}); //發送betCall時紀錄哪個注區、下了哪種coin的暫存資料
    let betArray = reactive<Array<any>>([]); //紀錄下注元素和區域的籌碼動畫陣列
    const currentCoint = reactive<currentCoint>({
      //玩家選擇的籌碼
      coinElement: document.querySelector("#defaultCoin4"), //選擇的籌碼元素
      num: 3, //儲存點到的是第幾個
      point: coinList.value[3].point, //預設是100點ㄉ
      x: 0, //起飛的x
      y: 0, //起飛的y
    });
    const currentBetPosition = reactive({
      //玩家選擇的注區
      betAreaIndex: -1,
    });
    const target = reactive<target>({
      //籌碼飛向的目標位置
      x: 0,
      y: 0,
    });
    const coinPosition = computed(() => {
      return store.state.bet.coinPosition;
    });
    //監聽
    watch(tableNum, () => {
      //換桌
      //重置遊戲相關
      reSetBetAreaAnimation();
      resetGame();
      setDefaultCoin();
    });
    watch(betResetresult, () => {
      //玩家反悔收回籌碼的動作
      if (betResetresult.value === 1) {
        resetGame();
      }
    });
    watch(betStatus, () => {
      //更新每次下注後顯示在注區的數字
      if (betResult.value !== -1 && betStatus.value) {
        coinPosition.value[0].betStatus = betStatus.value.Player;
        coinPosition.value[1].betStatus = betStatus.value.Banker;
        coinPosition.value[2].betStatus = betStatus.value.PlayerPair;
        coinPosition.value[3].betStatus = betStatus.value.Tie;
        coinPosition.value[4].betStatus = betStatus.value.BankerPair;
      }
    });
    watch(broadcastBetstatus, () => {
      //更新該桌的所有玩家總注額
      coinPosition.value[0].tableAllPlayerBetStatus =
        broadcastBetstatus.value.Player;
      coinPosition.value[1].tableAllPlayerBetStatus =
        broadcastBetstatus.value.Banker;
      coinPosition.value[2].tableAllPlayerBetStatus =
        broadcastBetstatus.value.PlayerPair;
      coinPosition.value[3].tableAllPlayerBetStatus =
        broadcastBetstatus.value.Tie;
      coinPosition.value[4].tableAllPlayerBetStatus =
        broadcastBetstatus.value.BankerPair;
    });
    watch(gameEnd, () => {
      //換靴時也要重置，並且無法下注
      // console.log("換靴重置BettingArear")
      reSetBetAreaAnimation();
      resetGame();
      store.commit("bet/setCanBet", false); //不能下注
    });
    watch(roundUuid, () => {
      //回合開始時重置遊戲；也可能是換桌
      reSetBetAreaAnimation();
      resetGame();
      // store.commit("bet/setIsConfirmed", false); //重置是否按下確認
      // store.commit("bet/setCanUseConfirm", true); //可以按下確認紐
      // store.commit("bet/setWatchCard", true); //重置咪牌按紐
      // store.commit("bet/setCanUseWatchCard", true); //咪牌紐可以使用
      // store.commit("bet/setFlyCard", false); //重置飛牌鈕
      // store.commit("bet/setCanUseFlyCard", true); //飛牌鈕可以按
    });
    watch(gameEndUuid, () => {
      //停止下注，在開牌之前
      store.commit("bet/setCanBet", false); //不能下注
    });
    watch(betError, () => {
      //更新錯誤訊息
      if (betError.value) {
        // console.log('進到-1',betError.value.error)
        switch (betError.value.error) {
          case 1:
            betErrorArray.value?.push("下注失敗");
            break;
          case 2:
            betErrorArray.value?.push("非法的籌碼");
            break;
          case 3:
            betErrorArray.value?.push(betError.value.errorMessage);
            break;
          case 4:
            betErrorArray.value?.push(betError.value.errorMessage);
            break;
          case 5:
            betErrorArray.value?.push("非法遊戲局");
            break;
          case 6:
            betErrorArray.value?.push("餘額不足");
            break;
          case 8:
            betErrorArray.value?.push(betError.value.errorMessage);
            break;
        }
        store.commit("bet/resetBetResult"); //重置result狀態
      }
    });
    watch(betResult, () => {
      //偵測伺服器的下注回應，來做出籌碼動畫
      // if(betResult.value!==0 && betResult.value!=-1 && !isConfirmed.value){ //並且還沒按下確定鈕的時候才要產生動畫
      //     betArray.push(betCallTemp.value) //確認server回傳為1才推入陣列中
      //     let betArrayShift = betArray.shift()
      //     betResultAction(betArrayShift.betAreaElement,betArrayShift.betAreaIndex)
      // }
    });
    watch(gameResult, () => {
      //更新遊戲結果
      clearLoseArea(gameResult.value);
      showResult();
      winCoinAnimation();
    });
    function setDefaultCoin() {
      let defaultCoin = document.querySelector("#defaultCoin1") as HTMLElement;
      let rect = defaultCoin.getBoundingClientRect();
      currentCoint.coinElement = defaultCoin;
      currentCoint.x = rect.left; //設置籌碼起始座標點
      currentCoint.y = rect.top;
      currentCoint.point = coinList.value[0].point;
      currentCoint.num = 0;
    }
    function chooseCoint(index: number, e: MouseEvent) {
      currentCoint.coinElement = e.target; //得到該元素
      currentCoint.x = e.x; //設置籌碼起始座標點
      currentCoint.y = e.y;
      currentCoint.num = index;
      currentCoint.point = coinList.value[index].point;
    }
    function betErrorAnimation(e: HTMLElement) {
      gsap.fromTo(
        e,
        { opacity: 0 },
        {
          duration: 1.5,
          opacity: 1,
          y: -100,
          ease: Power4.easeOut,
          display: "none",
        }
      );
    }
    function getCenterPoint(leftOrTop: number, rightOrBottom: number): number {
      return leftOrTop + (rightOrBottom - leftOrTop) / 2;
    }
    function goDefaultCoinPosition(
      Coin1Rect: DOMRect,
      liRect: DOMRect,
      liElement: HTMLElement
    ) {
      //籌碼飛回的動畫
      if (Coin1Rect && liRect) {
        let coinX = getCenterPoint(Coin1Rect.left, Coin1Rect.right);
        let coinY = getCenterPoint(Coin1Rect.top, Coin1Rect.bottom);
        let liX = getCenterPoint(liRect.left, liRect.right);
        let liY = getCenterPoint(liRect.top, liRect.bottom);
        gsap.to(liElement, {
          delay: 0.1,
          duration: 1,
          x: coinX - liX,
          y: coinY - liY,
          ease: Power4.easeIn,
          display: "none",
        });
      }
    }
    function winCoinAnimation() {
      //啟動時機:1.得到betResult之後；並且在reset之前!  2.有按確認下注
      if (gameResult.value && isConfirmed.value) {
        gameResult.value.forEach((betAreaIndex: number) => {
          let betArea = {} as NodeListOf<Element>;
          switch (betAreaIndex) {
            case proto.dealer.Result.Banker:
              betArea = document.querySelectorAll(
                `.betArea-item2`
              ) as NodeListOf<Element>;
              break;
            case proto.dealer.Result.Player:
              betArea = document.querySelectorAll(
                `.betArea-item1`
              ) as NodeListOf<Element>;
              break;
            case proto.dealer.Result.BankerPair:
              betArea = document.querySelectorAll(
                `.betArea-item5`
              ) as NodeListOf<Element>;
              break;
            case proto.dealer.Result.Tie:
              betArea = document.querySelectorAll(
                `.betArea-item4`
              ) as NodeListOf<Element>;
              break;
            case proto.dealer.Result.PlayerPair:
              betArea = document.querySelectorAll(
                `.betArea-item3`
              ) as NodeListOf<Element>;
              break;
          }
          betArea.forEach((i) => {
            let ul = i.children[2]; //這裡假如沒有下注的時候，會是1
            if (ul) {
              let liList = ul.children as HTMLCollection;
              for (let i = liList.length - 1; i >= 0; i--) {
                switch (liList[i].className.split(" ")[1]) {
                  case `coin-${coinList.value[0].point}`:
                    let Coin1Rect = document
                      .querySelector("#defaultCoin1")
                      ?.getBoundingClientRect() as DOMRect; //取得籌碼的正方形
                    let liRect1 = liList[i].getBoundingClientRect() as DOMRect;
                    goDefaultCoinPosition(
                      Coin1Rect,
                      liRect1,
                      liList[i] as HTMLElement
                    );
                    break;
                  case `coin-${coinList.value[1].point}`:
                    let Coin2Rect = document
                      .querySelector("#defaultCoin2")
                      ?.getBoundingClientRect() as DOMRect; //取得籌碼的正方形
                    let liRect2 = liList[i].getBoundingClientRect() as DOMRect;
                    goDefaultCoinPosition(
                      Coin2Rect,
                      liRect2,
                      liList[i] as HTMLElement
                    );
                    break;
                  case `coin-${coinList.value[2].point}`:
                    let Coin3Rect = document
                      .querySelector("#defaultCoin3")
                      ?.getBoundingClientRect() as DOMRect; //取得籌碼的正方形
                    let liRect3 = liList[i].getBoundingClientRect() as DOMRect;
                    goDefaultCoinPosition(
                      Coin3Rect,
                      liRect3,
                      liList[i] as HTMLElement
                    );
                    break;
                  case `coin-${coinList.value[3].point}`:
                    let Coin4Rect = document
                      .querySelector("#defaultCoin4")
                      ?.getBoundingClientRect() as DOMRect; //取得籌碼的正方形
                    let liRect4 = liList[i].getBoundingClientRect() as DOMRect;
                    goDefaultCoinPosition(
                      Coin4Rect,
                      liRect4,
                      liList[i] as HTMLElement
                    );
                    break;
                  case `coin-${coinList.value[4].point}`:
                    let Coin5Rect = document
                      .querySelector("#defaultCoin5")
                      ?.getBoundingClientRect() as DOMRect; //取得籌碼的正方形
                    let liRect5 = liList[i].getBoundingClientRect() as DOMRect;
                    goDefaultCoinPosition(
                      Coin5Rect,
                      liRect5,
                      liList[i] as HTMLElement
                    );
                    break;
                  case `coin-${coinList.value[5].point}`:
                    let Coin6Rect = document
                      .querySelector("#defaultCoin6")
                      ?.getBoundingClientRect() as DOMRect; //取得籌碼的正方形
                    let liRect6 = liList[i].getBoundingClientRect() as DOMRect;
                    goDefaultCoinPosition(
                      Coin6Rect,
                      liRect6,
                      liList[i] as HTMLElement
                    );
                }
              }
            }
          });
        });
      }
    }
    function cointAnimate(e: HTMLElement) {
      gsap.to(e, {
        keyframes: [
          {
            // scale:1.1,
          },
          {
            duration: 0.8,
            ease: Power4.easeIn,
            scale: 0.5,
            x: target.x - currentCoint.x + 20,
            y: target.y - currentCoint.y - 50,
            zIndex: "1",
          },
          {
            display: "none",
          },
        ],
      });
    }
    async function generateCoinAnimate(e: HTMLElement) {
      // console.log('2.再執行動畫',e,coinPosition[currentBetPosition.betAreaIndex].initBottom)
      await gsap.to(e, {
        keyframes: [
          { display: "none" },
          {
            delay: 0.75,
            duration: 0.5,
            x: coinPosition.value[currentBetPosition.betAreaIndex].initX,
            y: -coinPosition.value[currentBetPosition.betAreaIndex].initBottom,
            opacity: 1,
            display: "block",
          },
        ],
      });
    }
    function loadCoin() {
      if (currentCoint.num !== null) {
        // console.log("裝入",currentCoint.coinElement.classList[0])
        coinList.value[currentCoint.num].ammo.push(
          currentCoint.coinElement.classList[0]
        );
      }
    }
    function setCoinPosition(cp: coinPosition) {
      if (currentCoint.coinElement) {
        //有選擇籌碼時，才會生籌碼
        cp.coinArray.push(currentCoint.coinElement.className); //添加class名稱到注區
        //  console.log(cp.coinArray.length%10)
        if (cp.coinArray.length % 10 == 0) {
          //每10個橫移一次
          cp.initX += 10;
          cp.initBottom = 0;
        } else {
          cp.initBottom += 5; //修改樣式
        }
        // console.log(cp.initBottom,cp.initX)
      }
    }
    function sendBetData(e: MouseEvent, index: number) {
      //push紀錄注區元素和注區index
      if (canBet.value && !isConfirmed.value) {
        //下注期間，且是還沒按下確認鍵時
        sendBetCall({
          gameUuid: roundUuid.value,
          betIndex: currentCoint.num,
          betArea: index + 1,
        });
        if (user.value.wallet >= currentCoint?.point) {
          //餘額大於等於當前所選籌碼才要放動畫
          betCallTemp.value = {
            //資料暫存起來，後面確定betResult為1的時候才推入籌碼動畫陣列
            betAreaElement: e.target,
            betAreaIndex: index,
          };
        }
      } else {
        //if 停止下注時，就不要送了，改為betErrorArray.value?.push('下注失敗')
        if (isConfirmed.value) {
          betErrorArray.value?.push("已確認過下注，若要再次下注，請按取消鈕");
        } else {
          betErrorArray.value?.push("下注失敗");
        }
      }
    }
    function betResultAction(betAreaElement: HTMLElement, index: number) {
      //監聽betResult時shift從頭拿取 紀錄的注區元素和注區index
      if (betResult.value == 1) {
        //裝子彈，就會啟動籌碼飛的動畫
        loadCoin();
        let rect = betAreaElement?.getBoundingClientRect(); //固定飛到點擊區域的左下方
        target.x = rect.left;
        target.y = rect.bottom;
        let cp = coinPosition.value[index]; //用來存點選到的注區
        currentBetPosition.betAreaIndex = index;
        setCoinPosition(cp); //在駐區生成籌碼並設置起始位置
        store.commit("bet/resetBetResult"); //重置result狀態
      }
    }
    function clearLoseArea(winAreaArray: Array<number>) {
      let winArea1 = winAreaArray[0];
      let winArea2 = winAreaArray[1]; //若沒有，就是undefined
      //清空注區籌碼，除了贏的
      switch (winArea1) {
        case proto.dealer.Result.Banker:
          winArea1 = 1;
          break;
        case proto.dealer.Result.Player:
          winArea1 = 0;
          break;
        case proto.dealer.Result.Tie:
          winArea1 = 3;
          break;
        case proto.dealer.Result.BankerPair:
          winArea1 = 4;
          break;
        case proto.dealer.Result.PlayerPair:
          winArea1 = 2;
          break;
      }
      switch (winArea2) {
        case proto.dealer.Result.Banker:
          winArea2 = 1;
          break;
        case proto.dealer.Result.Player:
          winArea2 = 0;
          break;
        case proto.dealer.Result.Tie:
          winArea2 = 3;
          break;
        case proto.dealer.Result.BankerPair:
          winArea2 = 4;
          break;
        case proto.dealer.Result.PlayerPair:
          winArea2 = 2;
          break;
      }
      coinPosition.value.forEach((i: any, index: number) => {
        if (index !== winArea1 && index !== winArea2) {
          i.coinArray = [];
          i.initBottom = 0;
          i.betStatus = 0;
        }
      });
    }
    function resetGame() {
      store.commit("bet/resetTotalBets");
      //清空注區籌碼，最後只需要清除贏
      coinPosition.value.forEach((i: any) => {
        i.coinArray = [];
        i.initBottom = 0;
        i.betStatus = 0;
        i.tableAllPlayerBetStatus = 0;
        i.initX = 0;
      });
      //清空籌碼飛彈槍管
      coinList.value.forEach((i: any) => {
        i.ammo = [];
      });
      store.commit("bet/setBetResultRest");
      store.commit("bet/setCanBet", true); //可以
      store.commit("bet/setFlyCard", false); //飛牌狀態恢復預設
      betArray = [];
    }
    function showResult() {
      //為贏的注區套上閃爍動畫
      gameResult.value.forEach((i: number) => {
        switch (i) {
          case proto.dealer.Result.Banker:
            let betArea2 = document.querySelectorAll(
              ".betArea-item2"
            ) as NodeListOf<HTMLElement>;
            betArea2.forEach((i: HTMLElement) => {
              i.classList.add("winAnimation");
              if (i.children[1].className == "betStatus") {
                i.children[1].classList.add("winCoin"); //取得注區數字
              }
            });
            break;
          case proto.dealer.Result.Player:
            let betArea1 = document.querySelectorAll(
              ".betArea-item1"
            ) as NodeListOf<HTMLElement>;
            betArea1.forEach((i: HTMLElement) => {
              i.classList.add("winAnimation");
              if (i.children[1].className == "betStatus") {
                i.children[1].classList.add("winCoin"); //取得注區數字
              }
            });
            break;
          case proto.dealer.Result.BankerPair:
            let betArea5 = document.querySelectorAll(
              ".betArea-item5"
            ) as NodeListOf<HTMLElement>;
            betArea5.forEach((i: HTMLElement) => {
              i.classList.add("winAnimation");
              if (i.children[1].className == "betStatus") {
                i.children[1].classList.add("winCoin"); //取得注區數字
              }
            });
            break;
          case proto.dealer.Result.Tie:
            let betArea4 = document.querySelectorAll(
              ".betArea-item4"
            ) as NodeListOf<HTMLElement>;
            betArea4.forEach((i: HTMLElement) => {
              i.classList.add("winAnimation");
              if (i.children[1].className == "betStatus") {
                i.children[1].classList.add("winCoin"); //取得注區數字
              }
            });
            break;
          case proto.dealer.Result.PlayerPair:
            let betArea3 = document.querySelectorAll(
              ".betArea-item3"
            ) as NodeListOf<HTMLElement>;
            betArea3.forEach((i: HTMLElement) => {
              i.classList.add("winAnimation");
              if (i.children[1].className == "betStatus") {
                i.children[1].classList.add("winCoin"); //取得注區數字
              }
            });
            break;
        }
      });
      let betAreaMoney = document.querySelectorAll(".betStatus") as NodeListOf<
        HTMLElement
      >;
      betAreaMoney.forEach((i: HTMLElement) => {
        if (!i.className.includes("winCoin")) i.style.color = "grey";
      });
    }
    function reSetBetAreaAnimation() {
      //移除贏的注區的 高亮顯示動畫
      if (gameResult.value) {
        gameResult.value.forEach((i: number) => {
          switch (i) {
            case proto.dealer.Result.Banker:
              let betArea2 = document.querySelectorAll(
                ".betArea-item2"
              ) as NodeListOf<HTMLElement>;
              // let betRaitText = betArea2.forEach((i:HTML))
              betArea2.forEach((i: HTMLElement) => {
                i.classList.remove("winAnimation");
              });
              break;
            case proto.dealer.Result.Player:
              let betArea1 = document.querySelectorAll(
                ".betArea-item1"
              ) as NodeListOf<HTMLElement>;
              betArea1.forEach((i: HTMLElement) => {
                i.classList.remove("winAnimation");
              });
              break;
            case proto.dealer.Result.BankerPair:
              let betArea5 = document.querySelectorAll(
                ".betArea-item5"
              ) as NodeListOf<HTMLElement>;
              betArea5.forEach((i: HTMLElement) => {
                i.classList.remove("winAnimation");
              });
              break;
            case proto.dealer.Result.Tie:
              let betArea4 = document.querySelectorAll(
                ".betArea-item4"
              ) as NodeListOf<HTMLElement>;
              betArea4.forEach((i: HTMLElement) => {
                i.classList.remove("winAnimation");
              });
              break;
            case proto.dealer.Result.PlayerPair:
              let betArea3 = document.querySelectorAll(
                ".betArea-item3"
              ) as NodeListOf<HTMLElement>;
              betArea3.forEach((i: HTMLElement) => {
                i.classList.remove("winAnimation");
              });
              break;
          }
        });
      }
    }
    return {
      //data
      coinList,
      currentCoint,
      coinPosition,
      betStatus,
      total,
      betErrorArray,
      betInfo,
      onlinePlayersNumber,
      tableNum,
      //methods
      chooseCoint,
      cointAnimate,
      generateCoinAnimate,
      resetGame,
      showResult,
      betErrorAnimation,
      sendBetData,
    };
  },
});
</script>
<style scoped>
.watchTest {
  z-index: 100;
}
</style>
