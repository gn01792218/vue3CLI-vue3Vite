<template>
  <div class="video-box position-relative">
    <NewsTicker class="position-absolute top-0" />
    <canvas class="video" id="video" width="980" height="588" /><br />
    <VideoLoading v-show="loadingVideo" />
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import VideoLoading from "@/components/VideoLoading.vue";
import NewsTicker from "@/components/NewsTicker.vue";
export default defineComponent({
  components: {
    NewsTicker,
    VideoLoading,
  },
  //修正蘋果手機無法撥放的問題
  setup() {
    onMounted(() => {
      np.value.setView("video");
      np.value.setScaleMode(2);
      np.value.onResize(0);
      np.value.setBufferTime(300);
      np.value.on("error", (e: any) => {
        console.log('直播發生錯誤',e)
      });
      np.value.on("videoInfo", (w: any) => {
        // console.log("顯示Video",w)
        loadingVideo.value = false;
      });
      np.value.on("stop", () => {
        //  console.log("結束播放Video")
        loadingVideo.value = true;
      });
      startPlay();
    });
    //基本資料
    const flvPlayer = ref<any | null>({});
    const zoonScale = ref<number>(1);
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
    const flvStreamDesk = computed(() => {
      //直播網址
      return store.state.table.TableJoinRecall.table.streamingUrl.desktop;
    });
    const flvStreamMobil = computed(() => {
      return store.state.table.TableJoinRecall.table.streamingUrl.moblie;
    });
    const np = computed(() => {
      return store.state.video.video;
    });
    store.commit("video/setVideo", new NodePlayer()); //把player實體存進Vuex
    //監聽換桌的直播網址
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
    function isMobile() {
      //判斷是否是手機
      return mobileDevice.value.some((e: any) => navigator.userAgent.match(e)); //只要match手機裝置列表的其中一個，就返回true。否則false
    }
    function startPlay() {
      np.value.setKeepScreenOn();
      if (mobileOrNot) {
        np.value.start(flvStreamMobil.value);
        console.log("行動裝置-LiveVideo開始撥放", flvStreamMobil.value);
      } else {
        np.value.start(flvStreamDesk.value);
        console.log("桌機-LiveVideo開始撥放", flvStreamDesk.value);
      }
    }
    function stopPlay() {
      np.value.stop();
      np.value.clearView(); //清除上一個視頻留下的東西
    }
    return {
      //data
      flvPlayer,
      loadingVideo,
      //methods
    };
  },
});
</script>
