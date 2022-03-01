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
      <div class="modal-content position-relative">
        <button
          type="button"
          class="close position-absolute"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <canvas
          class="video w-100 h-100"
          id="watchCardVideo"
          width="980"
          height="588"
        />
        <VideoLoading v-show="loadingVideo" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, watch , ref ,onMounted} from "vue";
import { useStore } from "vuex";
import VideoLoading from "@/components/VideoLoading.vue";
import $ from "jquery";
export default defineComponent({
  components:{
      VideoLoading,
  },
  setup() {
    //初始化
    onMounted(() => {
      createWatchCardVideo(np.value,'watchCardVideo')
      startPlay();
    });
    //基本資料
    const loadingVideo = ref(true);
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
    store.commit("video/setWatchCardVideo", new NodePlayer()); //把player實體存進Vuex
    const gameEndUuid = computed(() => {
      //下注結束
      return store.state.game.gameEndUuid;
    });
    //等收到stream的時候才要顯示modal
    const np = computed(() => {
      return store.state.video.watchCardVideo;
    });
    //暫時使用直播影片測試
    const flvStreamDesk = computed(() => {
      //直播網址
      return store.state.table.TableJoinRecall.table.streamingUrl.desktop;
    });
    const flvStreamMobil = computed(() => {
      return store.state.table.TableJoinRecall.table.streamingUrl.moblie;
    });
    //暫時使用直播影片測試
    const watchCardVideoStream = computed(() => {
      return store.state;
    });
    watch(gameEndUuid,()=>{
      $("#watchCardBox").modal("hide");
    })
    watch(watchCardVideoStream, () => {
      $("#watchCardBox").modal("show");
    });
    watch(flvStreamDesk, () => {
      stopPlay();
      startPlay();
    });
    //解決視窗失焦掉秒數問題
    window.addEventListener("focus", () => {
      //原本的
      if (np) {
        stopPlay();
        startPlay();
      }
    });
    //視訊方法
    function isMobile() {
      //判斷是否是手機
      return mobileDevice.value.some((e: any) => navigator.userAgent.match(e)); //只要match手機裝置列表的其中一個，就返回true。否則false
    }
    function startPlay() {
      np.value.setKeepScreenOn();
      if (mobileOrNot) {
        np.value.start(flvStreamMobil.value);
        console.log("行動裝置-咪牌開始撥放", flvStreamMobil.value);
      } else {
        np.value.start(flvStreamDesk.value);
        console.log("桌機-咪牌開始撥放", flvStreamDesk.value);
      }
    }
    function stopPlay() {
      np.value.stop();
      np.value.clearView(); //清除上一個視頻留下的東西
    }
    function createWatchCardVideo(nodePlayer:NodePlayer,videoElementId:string){
      nodePlayer.setView(videoElementId);
      nodePlayer.setScaleMode(2);
      nodePlayer.setBufferTime(300);
      nodePlayer.on("error", (e: any) => {
        console.log('直播發生錯誤',e)
      });
      nodePlayer.on("videoInfo", (w: any,h:any) => {
        // console.log("顯示咪牌",w,h)
        loadingVideo.value = false;
      });
      nodePlayer.on("stop", () => {
        //  console.log("結束播放Video")
        loadingVideo.value = true;
      });
    }
    return {
        //data
        loadingVideo,
    };
  },
});
</script>
