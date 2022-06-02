<template>
  <div class="video-box position-relative">
    <NewsTicker class="position-absolute top-0" />
    <canvas class="video" id="video" width="980" height="588" /><br />
    <VideoLoading v-show="loadingVideo" />
    <ChatDisplay class="chatElement position-absolute" />
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import VideoLoading from "@/components/VideoLoading.vue";
import NewsTicker from "@/components/NewsTicker.vue";
import ChatDisplay from "@/components/chat/ChatDisplay.vue";
import useLiveVideo from '../composables/media/useLiveVideo'
//基本資料
const loadingVideo = ref(true);
//vuex
const store = useStore();
store.commit("video/setVideo", new NodePlayer()); //把player實體存進Vuex
//直播composable
const {flvStream,stopLiveVideo,playLiveVIdeo,createLiveVideo} = useLiveVideo(store)
//監聽換桌的直播網址
watch(flvStream, () => {
  stopLiveVideo();
  playLiveVIdeo();
});
//解決視窗失焦掉秒數問題
window.addEventListener("focus", () => {
  stopLiveVideo();
  playLiveVIdeo();
});
onMounted(() => {
  createLiveVideo("video",loadingVideo);
  playLiveVIdeo();
});
</script>
