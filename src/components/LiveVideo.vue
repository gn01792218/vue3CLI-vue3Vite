<template>
  <div class="video-box position-relative">
    <NewsTicker class="position-absolute top-0" />
    <canvas class="video" id="video" width="980" height="588" /><br />
    <VideoLoading v-show="loadingVideo" />
    <ChatDisplay class="chatElement position-absolute" />
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import VideoLoading from "@/components/VideoLoading.vue";
import NewsTicker from "@/components/NewsTicker.vue";
import ChatDisplay from "@/components/chat/ChatDisplay.vue";
export default defineComponent({
  components: {
    NewsTicker,
    VideoLoading,
    ChatDisplay,
  },
  //修正蘋果手機無法撥放的問題
  setup() {
    onMounted(() => {
      createVideo(np.value,'video')
      startPlay(np.value,flvStream.value);
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
    store.commit("video/setVideo", new NodePlayer()); //把player實體存進Vuex
    const flvStream = computed(() => {
      //直播網址
      return store.state.table.TableJoinRecall.table.streamingUrl;
    });
    const np = computed(() => {  //取得nodeplayer物件實體
      return store.state.video.video;
    });
    //監聽換桌的直播網址
    watch(flvStream, () => {
        stopPlay();
        startPlay(np.value,flvStream.value);
    });
    //解決視窗失焦掉秒數問題
    window.addEventListener("focus", () => {
        stopPlay();
        startPlay(np.value,flvStream.value);
    });
    function isMobile() {
      //判斷是否是手機
      return mobileDevice.value.some((e: any) => navigator.userAgent.match(e)); //只要match手機裝置列表的其中一個，就返回true。否則false
    }
    function startPlay(np:NodePlayer,stream:any) {
      if(!stream){
        return
      }
      np.setKeepScreenOn();
      if(mobileOrNot){
        np.start(stream.moblie); 
        console.log('LiveVideo手機',stream.moblie)
      }else{
        np.start(stream.desktop); 
        console.log('LiveVideo桌機',stream.desktop)
      }
    }
    function stopPlay() {
      np.value.stop();
      np.value.clearView(); //清除上一個視頻留下的東西
    }
    function createVideo(nodePlayer:NodePlayer,videoElementId:string){
      nodePlayer.setView(videoElementId);
      nodePlayer.setScaleMode(2);
      nodePlayer.onResize(0);
      nodePlayer.setBufferTime(300);
      nodePlayer.on("error", (e: any) => {
        console.log("直播發生錯誤", e);
      });
      nodePlayer.on("videoInfo", (w: any) => {
        // console.log("顯示Video",w)
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
      //methods
    };
  },
});
</script>
