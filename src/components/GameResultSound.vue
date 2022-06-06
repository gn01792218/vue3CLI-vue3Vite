<template>
  <audio id="gameresultSound">
    <source src="../assets/audio/bankerWin.mp3" type="audio/mpeg" />
  </audio>
</template>

<script lang="ts">
import { defineComponent, computed, watch } from "vue";
import { useStore } from "vuex";
import proto from "../assets/js/bundle";
export default defineComponent({
  setup() {
    //vuex
    const store = useStore();
    const gameResult = computed(() => {
      //回傳的是陣列
      return store.state.dealer.BroadcastGameResult.results;
    });
    const gameStatus = computed(() => {
      return store.state.game.GameStatus.status;
    });
    const roundUuid = computed(() => {
      //遊戲回合的Uuid
      return store.state.game.gameUuid;
    });
    const gameEndUuid = computed(() => {
      return store.state.game.gameEndUuid;
    });
    const audio = computed<HTMLAudioElement>(() => {
      return document.querySelector("#gameresultSound") as HTMLAudioElement;
    });
    watch(roundUuid, () => {
      //可能是新局開始，也可能是換桌
      if (audio && gameStatus.value == 1) {
        audio.value.src = require("../assets/audio/start.mp3");
        audio.value.play();
      }
    });
    watch(gameEndUuid, () => {
      if (audio) {
        audio.value.src = require("../assets/audio/stop.mp3");
        audio.value.play();
      }
    });
    watch(gameResult, () => {
      if (gameResult.value.length > 0) {
        playGameResult(gameResult.value);
      }

      //之後改這個
      // playGameResult(result)
    });

    function playGameResult(gameResults: Array<number>) {
      //之後這裡要帶參數進去
      let gameresultSound = document.querySelector(
        "#gameresultSound"
      ) as HTMLAudioElement;
      gameResults.forEach(async (i) => {
        switchSound(audio.value, i);
        await audio?.value.play();
      });
    }
    function switchSound(audioElement: HTMLAudioElement, soundNumber: number) {
      switch (soundNumber) {
        case proto.dealer.Result.Tie:
          audioElement.src = require("../assets/audio/tie.mp3");
          break;
        case proto.dealer.Result.Banker:
          audioElement.src = require("../assets/audio/bankerWin.mp3");
          break;
        case proto.dealer.Result.Player:
          audioElement.src = require("../assets/audio/playerWin.mp3");
          break;
      }
    }
    return {
      //methods
      playGameResult,
    };
  },
});
</script>
