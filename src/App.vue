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
</template>
<script lang="ts">
import { defineComponent ,onMounted ,computed } from "vue";
import Header from "./views/Header.vue";
import Footer from "./views/Footer.vue";
import BaccaratGame from "./views/BaccaratGame.vue";
import Loading from "@/components/Loading.vue";
import { createSocket } from "./webSocket";
import { useStore } from "vuex";
import Cookies from "js-cookie";
import Announcement from '@/components/Announcement.vue'
export default defineComponent({
  components: {
    Header,
    Footer,
    BaccaratGame,
    Loading,
    Announcement,
  },
  setup() {
    createSocket();
    const store = useStore();
    const announcementShow = computed(()=>{
      return store.state.lobby.showannouncement
    })
    // window.onbeforeunload = (e: any) => {
    //   alert()
    // };
    if (Cookies.get("userToken")) {
      // console.log("有cookie，抓cookie")
      // sendLogin({
      //     uri: "LoginCall",
      //     token: Cookies.get('userToken'),
      // })
    }
    onMounted(()=>{
      store.commit('lobby/setShowannouncement',true)
    })
    return{
      //data
      announcementShow,
    }
  },
});
</script>
