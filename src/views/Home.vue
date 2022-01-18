<template>
  <div class="home">
    <h1 class="text-center">選擇遊戲桌檯</h1>
    <Announcement
      v-show="announcementShow"
    />
    <!-- 遊戲公告同意書 -->
    <!-- Modal -->
      <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">遊戲公告同意書</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="text-left" v-for="(i,index) in announcementData" :key="index">
              <p class="announcementTitle">{{i.title}}</p>
              <p class="announcementContent">{{i.content}}</p>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <button @click="showAnnouncement">
      同意書
    </button>
    <div
      class="tableList d-flex flex-column flex-xl-row justify-content-center align-items-center"
    >
      <TableInfoCard
        v-for="(i, index) in tableInfoData"
        :key="index"
        :tableInfoData="i"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, ref, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { sendLogin } from "../socketApi";
import Cookies from "js-cookie";
import TableInfoCard from "@/components/TableInfoCard.vue";
import Announcement from '@/components/Announcement.vue'
export default defineComponent({
  components: {
    TableInfoCard,
    Announcement,
  },
  setup() {
    onMounted(()=>{
      
      let agreedAnnouncement = localStorage.getItem('agreedAnnouncement')
      if(agreedAnnouncement){ //取得玩家是否同意的
        
        //假如玩家已經同意過就return
      }else{ //玩家沒有設過local也要打開
        store.commit('lobby/setShowannouncement',true)
      }
      
      
    })
    const route = useRoute();
    const localStorage = window.localStorage
    // Cookies.set('userToken',route.params.userToken,{expires:0.1})
    const store = useStore();
    const vuexUserToken = computed(() => {
      return store.state.auth.userToken;
    });
    const userToken = ref<string>(store.state.auth.userToken);
    const loginState = computed(() => {
      //取得登入狀態
      return store.state.auth.LoginRecall.status;
    });
    const tableInfoData = store.state.table.tableInfoData;
    const announcementShow = computed(()=>{
      return store.state.lobby.showannouncement
    })
    sendLogin({
      uri: "LoginCall",
      token: route.params.userToken,
    });
    watch(loginState, () => {
      switch (loginState.value) {
        case 1:
          userToken.value = "ImLogin";
          store.commit("auth/setUserToken", Cookies.get("userToken"));
          //以下是暫時性的
          // router.push('/BaccaratGame/A')
          break;
        case -1:
          alert("驗證失敗，請重新登入");
      }
    });
    function showAnnouncement(){
      store.commit('lobby/setShowannouncement',!announcementShow.value)
    }
    return {
      //data
      tableInfoData,
      announcementShow,
      //methods
      showAnnouncement,
    };
  },
});
</script>
