<template>
  <!-- 按鈕區 -->
    <div
      class="bettingArea-btn d-flex justify-content-between align-items-center p-2 position-relative"
    >
      <LightBox />
      <div
        class="bettingArea-btn-left d-flex justify-content-around align-items-center"
      >
        <div
          class="bettingArea-btn-gitbackAllCoin d-flex justify-content-center align-items-center"
          @click="getAllBetBack"
        >
          <i class="bi bi-arrow-counterclockwise"></i>取消
        </div>
        <div class="d-flex align-items-center">
          <!-- 飛牌鈕，VIP才有 -->
          <div
            v-if="tableNum.includes('VIP')"
            @click="flyCard"
            class="fly-card bettingArea-btn-center cursor-point d-flex align-items-center justify-content-center p-1 pl-2 pr-2 mr-1"
          >
            <span>飛</span>
          </div>
          <!-- 打賞按鈕 -->
          <div
            class="bettingArea-btn-betInfo bettingArea-btn-reward cursor-point d-flex align-items-center justify-content-center p-1 pl-2 pr-2 mr-1"
            data-toggle="modal"
            data-target="#reward"
          >
            <span><i class="bi bi-gift"></i></span>
          </div>
          <!-- 咪牌按鈕 ，VIP才有-->
          <div
            v-if="tableNum.includes('VIP')"
            id="watchCard-btn"
            @click="watchCard"
            class="bettingArea-btn-center cursor-point d-flex align-items-center justify-content-center p-1 pl-2 pr-2 mr-1"
          >
            <span class="d-flex align-item-center"
              ><i class="bi bi-eye"></i
            ></span>
          </div>
          <!-- 手機版本才會出現的檯紅顯示 -->
          <div
            class="bettingArea-btn-betInfo bettingArea-btn-betrule  d-flex align-items-center p-1 pl-2 pr-2 mr-1"
          >
            <span
              >{{ numberFormat(minBetLimit) }}-<br />{{
                numberFormat(maxBetLimit)
              }}</span
            >
            <!-- <span>在線10000人</span> -->
          </div>
          <!-- <div class="bettingArea-btn-betInfo d-xl-none d-flex align-items-center p-1 pl-2 pr-2"> -->
          <!-- <span>在線<br>{{onlinePlayersNumber}}人</span> -->
          <!-- </div> -->
        </div>
        <div
          class="bettingArea-btn-check d-flex justify-content-center align-items-center"
          @click="sendConfirmBetCall"
        >
          <i class="bi bi-check-circle"></i>確定
        </div>
        <div class="askRoad d-flex">
          <div class="askRoad-player cursor-point p-1 mr-2" @click="askRoad(2)">
            <p>閒問路</p>
            <div class="d-flex justify-content-around p-1">
              <div id="bigEyeRoad-2"></div>
              <div id="smallRoad-2"></div>
              <div id="cockroachRoad-2"></div>
            </div>
          </div>
          <div class="askRoad-banker cursor-point p-1" @click="askRoad(1)">
            <p>莊問路</p>
            <div class="d-flex justify-content-around p-1">
              <div id="bigEyeRoad-1"></div>
              <div id="smallRoad-1"></div>
              <div id="cockroachRoad-1"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
//vuex

</script>