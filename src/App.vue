<template>
  <div id="wap" class="app">
    <div class="container-fluid pr-0 pl-0">
      <div class="container-waps row">
        <Announcement v-show="announcementShow"/>
        <Header />
        <router-view />
        <Footer />
      </div>
    </div>
    <Loading />
  </div>
</template>
<script lang="ts">
import { defineComponent ,onMounted ,computed , watch } from "vue";
import Announcement from '@/components/Announcement.vue'
import Loading from "@/components/Loading.vue";
import Header from "@/views/Header.vue";
import Footer from "@/views/Footer.vue";
import BaccaratGame from "@/views/BaccaratGame.vue";
import { createSocket } from "./webSocket";
import { useStore } from "vuex";
import Cookies from "js-cookie";
export default defineComponent({
  components: {
    Header,
    Footer,
    BaccaratGame,
    Loading,
    Announcement,
  },
  setup() {
    createSocket(); //創建websocket 連線
    const store = useStore();
    const announcementShow = computed(()=>{
      return store.state.lobby.showannouncement
    })
    onMounted(()=>{
      store.commit('lobby/setShowannouncement',true)  //顯示公告同意書
    })
    return{
      //data
      announcementShow,
    }
  },
});
</script>
