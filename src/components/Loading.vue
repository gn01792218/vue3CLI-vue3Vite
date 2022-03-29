<template>
  <div class="LoadingPage w-100 h-100 position-absolute" v-if="loading">
    <p>Loading...please wait</p>
    <div class="preLoad" v-show="preLoad">
      <span class="coin-preLoad"></span>
      <span class="poker"></span>
      <span class="roadImg-preLoad"></span>
      <img
        :src="announcementData3.content.img"
        alt="預載入公告書內容"
        style="opacity:0"
      />
      <audio class="preaudio" preload muted>
        <source src="../assets/audio/bankerWin.mp3" />
      </audio>
      <audio class="preaudio" preload muted>
        <source src="../assets/audio/playerWin.mp3" />
      </audio>
      <audio class="preaudio" preload muted>
        <source src="../assets/audio/tie.mp3" />
      </audio>
      <audio class="preaudio" preload muted>
        <source src="../assets/audio/start.mp3" />
      </audio>
      <audio class="preaudio" preload muted>
        <source src="../assets/audio/stop.mp3" />
      </audio>
      <!-- <div class='progress'>
            <div class='progress-inset'></div>
        </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
onMounted(() => {
      preaudio.value.muted = true;
      preaudio.value.play();
    });
    const preaudio = computed(() => {
      //只要抓其中一個就可以了
      return document.querySelector(".preaudio") as HTMLAudioElement;
    });
    const store = useStore();
    const router = useRouter();
    const loading = ref(true);
    const preLoad = ref(true);
    const announcementData3 = store.state.announcement.announcement.announcement3;
    const vuexUserToken = computed(() => {
      return store.state.auth.userToken;
    });
    const loginState = computed(() => {
      //取得登入狀態
      return store.state.auth.LoginRecall.status;
    });
    if (vuexUserToken.value !== "") {
      //已經有人登入的話，就不執行
      loading.value = false;
    }
    router.beforeEach((to, from, next) => {
      if (to.path.indexOf("leave") == 1) {
        //要去的地方不含leave
        loading.value = false;
        let header = document.querySelector(".header") as HTMLElement;
        let footer = document.querySelector(".footer") as HTMLElement;
        let containerWaps = document.querySelector(
          ".container-waps"
        ) as HTMLElement;

        header.style.display = "none";
        footer.style.display = "none";
        containerWaps.style.backgroundColor = "transparent";
        containerWaps.style.border = "none";
        next();
      } else {
        next();
      }
    });
    onMounted(() => {
      //此時資源已經載入完畢
      //且登入狀態是1就給登入
      watch(loginState, () => {
        switch (loginState.value) {
          case 1:
            loading.value = false;
        }
      });
    });
</script>
