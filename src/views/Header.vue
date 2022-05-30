<template>
  <div class="header">
    <div class="header-top">
      <div class="header-logo d-none d-xl-block">
        <a href="#"><img src="../images/logo.png"/></a>
      </div>
      <div
        class="header-btnList align-items-center justify-content-around mt-xl-5"
      >
      <!-- 手機版本漢堡 -->
      <div class="header-bottom-mobil d-flex align-items-center">
        <div class="header-bottom-mobil-extend position-absolute">
          <div class="collapse" id="navbarToggleExternalContent">
            <div class="bg-dark d-flex p-5">
              <div
                class="header-item d-flex font_yellows"
                data-toggle="modal"
                data-target="#exampleModal"
                @click="getHistory"
              >
                <i class="bi bi-person-circle mr-1"></i
                ><i v-if="user">{{ user.name }}</i>
              </div>
              <div class="header-item d-flex font_yellows">
                <i class="header-tableInfo"
                  >{{ tableNum }} 桌 靴 : {{ shoe }} 局 : {{ roundNum }}</i
                >
              </div>
              <div
                class="header-item d-flex font_yellows"
                data-toggle="modal"
                data-target="#exampleModal"
                @click="getHistory"
              >
                <i class="bi bi-card-list mr-1"></i><i>紀錄</i>
              </div>
            </div>
          </div>
        </div>
        <nav class="navbar navbar-dark">
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarToggleExternalContent"
            aria-controls="navbarToggleExternalContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
          <i class="bi bi-list-ul"></i>
          </button>
        </nav>
      </div>
        <div
          class="
            d-flex d-xl-none
            userWallet-mobil
            header-item
            col
            font_yellows
          "
        >
          <span>分</span><span>{{ userWallet }}</span>
        </div>
        <div
          class="
            d-block d-xl-none
            userWallet-mobil
            header-item
            col
            font_yellows
          "
          v-if="user"
        >
          <i>洗:{{ user.totalValidBets }}</i>
        </div>
        <div class="table-btn-list d-none d-xl-flex flex-row flex-xl-column">
          <a
            v-for="table in tableLDataist"
            :key="table"
            class="header-btn"
            :class="[
              { active: tableNum == table.tableName },
              { disabled: table.onLine == false },
            ]"
            @click="toGametable(table.tableName)"
            >{{ table.tableName
            }}<span v-if="table.tableName.length < 2">桌</span></a
          >
          <a
            href="#"
            class="header-btn leaveGame-btn d-none d-xl-block"
            @click="closeWindow"
            >離開遊戲</a
          >
        </div>
      </div>
    </div>
    <div class="header-bottom">
      <div class="header-bottom-desk">
        <div
          class="header-item d-flex col font_yellows"
          data-toggle="modal"
          data-target="#exampleModal"
          @click="getHistory"
        >
          <i class="bi bi-person-circle"></i><i v-if="user">{{ user.name }}</i>
        </div>
        <div class="header-item col font_yellows">分{{ userWallet }}</div>
        <div class="header-item col font_yellows">
          <i>{{ tableNum }}桌 靴:{{ shoe }}局:{{ roundNum }}</i>
        </div>
        <div class="header-item col font_yellows" v-if="user">
          <i>洗碼值:{{ user.totalValidBets }}</i>
        </div>
        <div
          class="header-item col font_yellows"
          data-toggle="modal"
          data-target="#exampleModal"
          @click="getHistory"
        >
          <i class="bi bi-card-list"></i>遊戲紀錄
        </div>
        <!-- <div class="header-item col font_yellows" v-if="user">
          <i>在線:{{onlinePlayersNumber}}人</i>
        </div> -->
      </div>
    </div>
    <div class="table-btn-list d-flex d-xl-none flex-row flex-xl-column">
          <a
            v-for="table in tableLDataist"
            :key="table"
            class="header-btn"
            :class="[
              { active: tableNum == table.tableName },
              { disabled: table.onLine == false },
            ]"
            @click="toGametable(table.tableName)"
            >{{ table.tableName
            }}<span v-if="table.tableName.length < 2">桌</span></a
          >
          <a
            href="#"
            class="header-btn leaveGame-btn d-none d-xl-block"
            @click="closeWindow"
            >離開遊戲</a
          >
        </div>
    <i class="d-block d-xl-none bi bi-box-arrow-right" @click="closeWindow"></i>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import ProgressBar from "@/components/ProgressBar.vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { state } from "@/store/lobby";
import { sendHistoryCall } from "@/socketApi";

//route
const route = useRoute();
const tableNum = computed(() => {
  return route.params.tableId;
});
//vuex
const store = useStore();
const userToken = computed(() => {
  return store.state.auth.userToken;
});
const user = computed(() => {
  return store.state.auth.UserInfo.user;
});
const tableLDataist = computed(() => {
  return store.state.table.tableLDataist;
});
const tableInfoData = computed(() => {
  return store.state.table.tableInfoData;
});
const onlinePlayersNumber = computed(() => {
  return store.state.lobby.BroadcastTotalPlayersOnline.numberOfPlayers;
});
const userWallet = computed(() => {
  return store.state.auth.userWalletFomate;
});
const shoe = computed(() => {
  return store.state.game.numOfShoe;
});
const roundNum = computed(() => {
  return store.state.game.numOfRound;
});
const announcement1Checked = computed(() => {
  return store.state.announcement.announcement.announcement1.checked;
});
const announcement2Checked = computed(() => {
  return store.state.announcement.announcement.announcement2.checked;
});
const announcement3Checked = computed(() => {
  return store.state.announcement.announcement.announcement3.checked;
});
//路由處理
const router = useRouter();
//換桌
function toGametable(tableNum: string) {
  if (tableInfoData.value[tableNum].onLine) {
    if (
      announcement1Checked.value &&
      announcement2Checked.value &&
      announcement3Checked.value
    ) {
      store.commit("table/setCurrentTable", tableNum);
      router.push({
        path: `/BaccaratGame/${tableNum}`,
      });
    } else {
      alert("請先同意所有遊戲公告事項之規範");
    }
  }
}
//回Home
function backToHome() {
  //要記得帶userToken唷
  router.push(`/Home/${userToken.value}`);
}
//關閉視窗
function closeWindow() {
  var op = window.open("/leave", "_self") as Window;
  op.alert("您已離開遊戲，請關閉網頁");
  op.opener = null;
  op.close();
}
//拿取歷史資訊
function getHistory() {
  sendHistoryCall();
}
</script>
