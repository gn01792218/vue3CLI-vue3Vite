import { computed, Ref } from "vue";
import useMobileDefiend from "@/composables/useMobileDefiend";

const { isMobileOrNot } = useMobileDefiend(); //是否為手機版本

export default function useLiveVideo(store: any) {
  const flvStream = computed(() => {
    //直播網址
    return store.state.table.TableJoinRecall.table.streamingUrl;
  });
  const np = computed(() => {
    //取得nodeplayer物件實體
    return store.state.video.video;
  });
  function createLiveVideo(videoElementId: string,loadingVideo:Ref) {
    np.value.setView(videoElementId);
    np.value.setScaleMode(2);
    np.value.onResize(0);
    np.value.setBufferTime(300);
    np.value.on("error", (e: any) => {
      console.log("直播發生錯誤", e);
    });
    np.value.on("videoInfo", (w: any) => {
      // console.log("顯示Video",w)
      loadingVideo.value = false;
    });
    np.value.on("stop", () => {
      //  console.log("結束播放Video")
      loadingVideo.value = true;
    });
  }
  function stopLiveVideo() {
    np.value.stop();
    np.value.clearView(); //清除上一個視頻留下的東西
  }
  function playLiveVIdeo() {
    if (!flvStream.value) {
      return;
    }
    np.value.setKeepScreenOn();
    if (isMobileOrNot) {
      np.value.start(flvStream.value.moblie);
      // console.log("LiveVideo手機", stream.moblie);
    } else {
      np.value.start(flvStream.value.desktop);
      // console.log("LiveVideo桌機", stream.desktop);
    }
  }
  return {
    //data
    flvStream,np,
    //methods
    createLiveVideo,stopLiveVideo,playLiveVIdeo
  };
}
