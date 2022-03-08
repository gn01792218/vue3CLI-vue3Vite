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
  <KickoutWarn/>
  <!-- <div
    class="modal fade"
    id="alertModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">遊戲訊息</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          {{ kickoutWarn.message }}
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Close
          </button>
        </div>
      </div>
    </div>
  </div> -->
</template>
<script setup lang="ts">
import { onMounted, computed } from "vue";
import Announcement from "@/components/Announcement.vue";
import Loading from "@/components/Loading.vue";
import Header from "@/views/Header.vue";
import Footer from "@/views/Footer.vue";
import BaccaratGame from "@/views/BaccaratGame.vue";
import KickoutWarn from "@/components/modal/KickoutWarn.vue";
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
// export default defineComponent({
//   components: {
//     Header,
//     Footer,
//     BaccaratGame,
//     Loading,
//     Announcement,
//     KickoutWarn,
//   },
//   setup() {
//     onMounted(() => {
//       store.commit("lobby/setShowannouncement", true); //顯示公告同意書
//     });
//     createSocket(); //創建websocket 連線
//     const router = useRouter();
//     const store = useStore();
//     const announcementShow = computed(() => {
//       return store.state.lobby.showannouncement;
//     });
//     // const kickout = computed(() => {
//     //   return store.state.kick.Kickout;
//     // });
//     // const kickoutWarn = computed(() => {
//     //   return store.state.kick.kickoutWarn;
//     // });
//     // watch(kickoutWarn, () => {
//     //   $("#alertModal").modal("show");
//     // });
//     // watch(kickout, () => {
//     //   store.commit("kick/setIsKickout", true);
//     //   alert(kickout.value.message);
//     //   closeWindow();
//     // });
//     // function closeWindow() {
//     //   var op = window.open("/leave", "_self") as Window;
//     //   op.opener = null;
//     //   op.close();
//     // }
//     return {
//       //data
//       announcementShow,
//       // kickoutWarn,
//     };
//   },
// });
</script>
