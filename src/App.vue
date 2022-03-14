<template>
  <div id="wap" class="app">
    <div class="container-fluid pr-0 pl-0">
      <div class="container-waps row">
        <Announcement v-show="announcementShow" />
        <Header />
        <router-view />
        <Footer />
      </div>
    </div>
    <Loading />
  </div>
  <!-- Modal -->
  <KickoutWarn />
  <ClosedWarn />
</template>
<script setup lang="ts">
import { onMounted, computed } from "vue";
import Announcement from "@/components/Announcement.vue";
import Loading from "@/components/Loading.vue";
import Header from "@/views/Header.vue";
import Footer from "@/views/Footer.vue";
import BaccaratGame from "@/views/BaccaratGame.vue";
import KickoutWarn from "@/components/modal/KickoutWarn.vue";
import ClosedWarn from "@/components/modal/ClosedWarn.vue";
import { createSocket } from "./webSocket";
import { useStore } from "vuex";
onMounted(() => {
  store.commit("lobby/setShowannouncement", true); //顯示公告同意書
});
createSocket(); //創建websocket 連線
const store = useStore();
const announcementShow = computed(() => {
  return store.state.lobby.showannouncement;
});
</script>
