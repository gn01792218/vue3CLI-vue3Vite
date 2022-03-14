<template>
  <!-- 咪牌視訊盒子 -->
  <div
    class="modal watchCard-modal fade position-absolute"
    id="watchCardBox"
    tabindex="-1"
    data-backdrop="static"
    data-keyboard="false"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog watchCard-box position-absolute ">
      <div class="modal-content position-relative d-flex flex-row">
        <button
          type="button"
          class="close position-absolute"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true" class="d-flex flex-column w-100 h-100"
            >&times;</span
          >
        </button>
        <!-- 單畫面版本 -->
        <!-- <div class="w-100 h-100 position-relative">
          <canvas
            class="video w-100 h-100"
            id="watchCardVideo1"
            width="980"
            height="588"
          />
          <VideoLoading v-show="loadingVideo1" />
        </div> -->
        <!-- 雙視訊版本 -->
        <div class="w-50 h-100 position-relative">
          <canvas
          class="video w-100 h-100"
          id="watchCardVideo1"
          width="980"
          height="588"
        />
        <VideoLoading v-show="loadingVideo1" />
        </div>
        <div class="w-50 h-100 position-relative">
          <canvas
          class="video w-100 h-100"
          id="watchCardVideo2"
          width="980"
          height="588"
        />
        <VideoLoading v-show="loadingVideo2" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, ref, onMounted, Ref } from "vue";
import { useStore } from "vuex";
import VideoLoading from "@/components/VideoLoading.vue";
import $ from "jquery";
import proto from "../../assets/js/bundle";
//初始化
onMounted(() => {
  createWatchCardVideo(np1.value, "watchCardVideo1", loadingVideo1);
  createWatchCardVideo(np2.value,'watchCardVideo2',loadingVideo2);
  startPlay(np1.value, watchCardVideoStream1.value);
  startPlay(np2.value,watchCardVideoStream2.value);
});
//基本資料
const loadingVideo1 = ref(true);
const loadingVideo2 = ref(true);
const mobileDevice = ref([
  //各種手機的系統
  "Android",
  "webOS",
  "iPhone",
  "iPad",
  "iPod",
  "BlackBerry",
  "Windows Phone",
]);
const mobileOrNot = isMobile(); //是否是行動裝置
//vuex
const store = useStore();
store.commit("video/setWatchCardVideo1", new NodePlayer()); //把player實體存進Vuex
store.commit("video/setWatchCardVideo2", new NodePlayer()); //把player實體存進Vuex
const gameType = computed(() => {
  return store.state.table.TableJoinRecall.table.gameType;
});
const gameStatus = computed(() => {
  //遊戲狀態 1.下注中 2.開牌中 3.等待新局 4.等待中
  return store.state.game.GameStatus.status;
});
const DrawCard = computed(() => {
  //開始畫牌的時候，就是結束咪牌時
  return store.state.dealer.Draw;
});
//等收到stream的時候才要顯示modal
const np1 = computed(() => {
  return store.state.video.watchCardVideo1;
});
const np2 = computed(() => {
  return store.state.video.watchCardVideo2;
});
//暫時使用直播影片測試
const watchCardVideoStream1 = computed(() => {
  return store.state.game.watchCardVideo1Stream;
});
const watchCardVideoStream2 = computed(() => {
  return store.state.game.watchCardVideo2Stream;
});
watch(DrawCard, () => {
  //開牌的時候就關掉咪牌視訊
  //  console.log("開牌")
  $("#watchCardBox").modal("hide");
});
watch([watchCardVideoStream1, watchCardVideoStream2], () => {
  $("#watchCardBox").modal("show");
});
watch(watchCardVideoStream1, () => {
  stopPlay(np1.value);
  startPlay(np1.value, watchCardVideoStream1.value);
  console.log('偵測到咪牌視訊1',watchCardVideoStream1)
});
 watch(watchCardVideoStream2,()=>{
  stopPlay(np2.value);
  startPlay(np2.value, watchCardVideoStream2.value);
  console.log('偵測到咪牌視訊2',watchCardVideoStream2)
})
//解決視窗失焦掉秒數問題
window.addEventListener("focus", () => {
  //vip桌才要咪牌
  if (np1.value) {
    stopPlay(np1.value);
    startPlay(np1.value, watchCardVideoStream1.value);
  }
  if (np2.value) {
    stopPlay(np2.value);
    startPlay(np2.value,watchCardVideoStream2.value);
  }
});
//視訊方法
function isMobile() {
  //判斷是否是手機
  return mobileDevice.value.some((e: any) => navigator.userAgent.match(e)); //只要match手機裝置列表的其中一個，就返回true。否則false
}
function startPlay(nodePlayer: NodePlayer, flvStream: any) {
  // console.log('遊戲type',gameType.value,'視訊網址',flvStream,'gameStatus',gameStatus.value)
  if (gameType.value !== proto.game.GameType.vip) {
    return;
  }
  if (!flvStream) {
    return;
  }
  if (gameStatus.value !== 5) {
    return;
  }
  nodePlayer.setKeepScreenOn();
  if (mobileOrNot) {
    nodePlayer.start(flvStream.moblie);
    console.log("咪牌手機", flvStream.moblie);
  } else {
    nodePlayer.start(flvStream.desktop);
    console.log("咪牌桌機", flvStream.desktop);
  }
}
function stopPlay(nodePlayer: NodePlayer) {
  if (gameType.value !== proto.game.GameType.vip) {
    return;
  }
  nodePlayer.stop();
  nodePlayer.clearView(); //清除上一個視頻留下的東西
}
function createWatchCardVideo(
  nodePlayer: NodePlayer,
  videoElementId: string,
  loadingVideo: Ref
) {
  nodePlayer.setView(videoElementId);
  nodePlayer.setScaleMode(2);
  nodePlayer.setBufferTime(300);
  nodePlayer.on("error", (e: any) => {
    console.log("直播發生錯誤", e);
  });
  nodePlayer.on("videoInfo", (w: any, h: any) => {
    // console.log("顯示咪牌",w,h)
    loadingVideo.value = false;
  });
  nodePlayer.on("stop", () => {
    //  console.log("結束播放Video")
    loadingVideo.value = true;
  });
}
</script>
