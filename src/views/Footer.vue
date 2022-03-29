<template>
  <UserBetInfo />
  <Reward />
  <footer class="footer">
    <div class="pl-1 pr-1 d-flex">
      <div class="col-sm text-md-left d-flex">
        <!-- <span class="footer-item d-none d-md-flex"><i class="bi bi-bar-chart-fill"></i></span> -->
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
          class="footer-item  d-md-flex"
          @click="playVideo"
          ><i class="bi bi-camera-video-fill"></i
        ></span>
        <span
          v-if="!isVideoPlayed"
          class="footer-item  d-md-flex"
          @click="playVideo"
          ><i class="bi bi-camera-video-off"></i
        ></span>
        <span
          v-if="tableNum"
          class="footer-item  d-md-flex"
          data-toggle="modal"
          data-target="#reward"
          ><i class="bi bi-gift"></i
        ></span>
        <span class="footer-item  d-md-flex" @click="reloadVideo"
          ><i class="bi bi-lightning"></i
        ></span>
        <span class="d-md-flex mr-2"><i class="bi bi-chat-dots"></i></span>
        <!-- <span class="footer-item  d-md-flex" @click="showAnnouncement"><i class="bi bi-journal-text"></i></span> -->
        <ChatInput />
      </div>
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
import { useRoute } from "vue-router";
import { chatContent, chatMsg } from "../types/global";
import useMobileDefiend from "@/composables/useMobileDefiend";
const route = useRoute();
const tableNum = computed(() => {
  return route.params.tableId;
});
//vuex
const store = useStore();
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
const audio = computed<HTMLAudioElement>(() => {
  //音效的實體
  return document.querySelector("#gameresultSound") as HTMLAudioElement;
});
const npvideo = computed(() => {
  //直播物件的實體
  return store.state.video.video;
});
const flvStream = computed(() => {
  //直播網址
  return store.state.table.TableJoinRecall.table.streamingUrl;
});
const isAudioMuted = ref(false);
const isVideoPlayed = ref(true);
const { isMobileOrNot } = useMobileDefiend();
//全螢幕
function fullScreen() {
  if (screenfull.isEnabled) {
    screenfull.toggle();
  }
}
//靜音 / 打開 音效
function mutedSound() {
  audio.value.muted = !audio.value.muted;
  isAudioMuted.value = !isAudioMuted.value;
}
//播放/暫停直播
function playVideo() {
  isVideoPlayed.value = !isVideoPlayed.value;
  if (isVideoPlayed.value) {
    //播放直播
    if (isMobileOrNot) {
      npvideo.value.start(flvStream.value.moblie);
    } else {
      npvideo.value.start(flvStream.value.desktop, useMobileDefiend());
    }
  } else {
    //暫停直播
    console.log("暫停直播");
    npvideo.value.stop();
    npvideo.value.clearView(); //清除上一個視頻留下的東西
  }
}
function reloadVideo() {
  npvideo.value.stop();
  npvideo.value.clearView(); //清除上一個視頻留下的東西
  //播放直播
  if (isMobileOrNot) {
    npvideo.value.start(flvStream.value.moblie);
  } else {
    npvideo.value.start(flvStream.value.desktop, useMobileDefiend());
  }
}
// function showAnnouncement(){ //控制公告同意書顯示與否
//     store.commit('announcement/setShowannouncement',!announcementShow.value)
// }
</script>
