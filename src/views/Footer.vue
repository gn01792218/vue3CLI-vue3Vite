<template>
  <UserBetInfo />
  <Reward />
  <footer class="footer">
    <div class="pl-1 pr-1 d-flex">
      <div class="col-sm text-md-left d-flex">
        <!-- <span class="footer-item d-none d-md-flex"><i class="bi bi-bar-chart-fill"></i></span> -->
        <!-- 進桌後才顯示的按鈕 -->
        <div v-if="tableNum" class="d-flex">
          <span
            v-if="isAudioMuted"
            class="footer-item d-md-flex"
            @click="mutedSound"
            ><i class="bi bi-volume-off"></i
          ></span>
          <span
            v-if="!isAudioMuted"
            class="footer-item d-md-flex"
            @click="mutedSound"
            ><i class="bi bi-volume-up"></i
          ></span>
          <span
            v-if="isVideoPlayed"
            class="footer-item d-md-flex"
            @click="playVideo"
            ><i class="bi bi-camera-video-fill"></i
          ></span>
          <span
            v-if="!isVideoPlayed"
            class="footer-item d-md-flex"
            @click="playVideo"
            ><i class="bi bi-camera-video-off"></i
          ></span>
          <span
            class="footer-item d-md-flex"
            data-toggle="modal"
            data-target="#reward"
            ><i class="bi bi-gift"></i
          ></span>
          <span class="footer-item d-md-flex" @click="reLoadGame"
            ><i class="bi bi-lightning"></i
          ></span>
          <!-- <span class="footer-item  d-md-flex" @click="showAnnouncement"><i class="bi bi-journal-text"></i></span> -->
          <ChatInput />
        </div>
      </div>
      <!-- 常駐顯示的按鈕 -->
      <div class="col-sm text-md-right justify-content-end d-flex">
        <!-- <span class="footer-item d-none d-md-flex"><i class="bi bi-music-note-beamed"></i></span> -->
        <span class="footer-item d-none d-md-flex"
          ><i class="bi bi-alarm"></i><Date
        /></span>
        <span class="footer-item d-md-flex"
          ><i class="bi bi-arrows-fullscreen" @click="fullScreen"></i
        ></span>
      </div>
    </div>
  </footer>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import UserBetInfo from "@/components/modal/UserBetInfo.vue";
import Reward from "@/components/modal/Reward.vue";
import Date from "@/components/Date.vue";
import ChatInput from "@/components/chat/ChatInput.vue";
import { useStore } from "vuex";
import screenfull from "screenfull";
import useTable from '@/composables/table/useTable'
import useLiveVideo from "@/composables/media/useLiveVideo";
import useGameSound from "@/composables/media/useGameSound";
//vuex
const store = useStore();
//useTable
const {tableReload,tableNum} = useTable(store)
//useLiveVideo
const {stopLiveVideo,playLiveVIdeo} = useLiveVideo(store)
//useGameResultSound
const {mutedGameSound} = useGameSound(store)
//computed
const announcementShow = computed(() => {
  return store.state.lobby.showannouncement;
});
const user = computed(() => {
  return store.state.auth.UserInfo.user;
});
const userWallet = computed(() => {
  return store.state.auth.userWalletFomate;
});
const isAudioMuted = ref(false);
const isVideoPlayed = ref(true);
//全螢幕
function fullScreen() {
  if (screenfull.isEnabled) {
    screenfull.toggle();
  }
}
//靜音 / 打開 音效
function mutedSound() {
    mutedGameSound()
    isAudioMuted.value = !isAudioMuted.value;
}
//播放/暫停直播
function playVideo() {
  isVideoPlayed.value = !isVideoPlayed.value;
  if (isVideoPlayed.value) {
    //播放直播
    playLiveVIdeo()
  } else {
    //暫停直播
    console.log("暫停直播");
    stopLiveVideo()
  }
}
function reLoadGame() {
  //1.重新發一次上桌資訊
  tableReload()
  //2.reload直播
  stopLiveVideo()
  playLiveVIdeo()
  //發送reloadRoadMap，讓路圖重整
  window.dispatchEvent(new CustomEvent("reloadRoadMap"));
}
// function showAnnouncement(){ //控制公告同意書顯示與否
//     store.commit('announcement/setShowannouncement',!announcementShow.value)
// }
</script>
