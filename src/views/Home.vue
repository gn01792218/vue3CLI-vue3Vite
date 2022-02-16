<template>
  <div class="home">
    <h1 class="chooseTable text-center">選擇遊戲桌檯</h1>
    <div
      class="tableList flex-column flex-xl-row justify-content-center align-items-center mt-5 mt-xl-0 h-100"
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
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import TableInfoCard from "@/components/TableInfoCard.vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { sendLogin } from "../socketApi";
import Cookies from "js-cookie";
export default defineComponent({
  components: {
    TableInfoCard,
  },
  setup() {
    onMounted(()=>{
      setTableListVisible() //初始化時有公告同意書，故隱藏tableList
    })
    const route = useRoute();
    // const localStorage = window.localStorage
    // Cookies.set('userToken',route.params.userToken,{expires:0.1})
    const store = useStore();
    const announcementShow = computed(()=>{
      return store.state.lobby.showannouncement
    })
    const userToken = ref<string>(store.state.auth.userToken); //由遊戲平台塞在路由中的玩家token
    const loginState = computed(() => {
      //取得登入狀態
      return store.state.auth.LoginRecall.status;
    });
    const tableInfoData = store.state.table.tableInfoData;
    sendLogin({    //發送登入請求
      uri: "LoginCall",
      token: route.params.userToken,
    });
    watch(announcementShow,()=>{  //公告同意書顯示與否
      setTableListVisible()
    })
    watch(loginState, () => {  //根據登入成功與否回應
      switch (loginState.value) {
        case 1:
          userToken.value = "ImLogin";
          store.commit("auth/setUserToken", Cookies.get("userToken"));
          break;
        case -1:
          alert("驗證失敗，請重新登入");
      }
    });
    function setTableListVisible(){ //為了解決平板時候，出現公告時，tableList會漏餡的Bug
      let tableListElement = document.querySelector('.tableList') as HTMLElement
      if(announcementShow.value){
        tableListElement.style.visibility = "hidden"
      }else{
        tableListElement.style.visibility = "visible"
      }
    }
    return {
      //data
      tableInfoData,
      //methods
    };
  },
});
</script>