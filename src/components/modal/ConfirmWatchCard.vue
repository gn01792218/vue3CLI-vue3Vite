<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="whatchCardOrNot"
    data-backdrop="static"
    data-keyboard="false"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">是否咪牌?</h5>
        </div>
        <div class="modal-body">
          您已取得咪牌的權力，要進行咪牌嗎?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="watchCard">
            是，咪牌
          </button>
          <button type="button" class="btn btn-secondary" @click="flyCard">
            否，飛牌
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import $ from "jquery";
import { sendWatchCardCall } from "../../socketApi";
export default defineComponent({
  setup() {
    //要咪牌，顯示視訊畫面
    function watchCard() {
      sendWatchCardCall({
        confirm: true,
      })
      $("#whatchCardOrNot").modal("hide");
    }
    //要飛牌，直接退出畫面前先傳送資料給serve
    function flyCard() {
      //發送飛牌給serve
      sendWatchCardCall({
        confirm: false,
      })
      //關閉視窗
      $("#whatchCardOrNot").modal("hide");
      resetWatchCardAlert()
    }
    function resetWatchCardAlert(){
      let watchCardBtn = document.querySelector('.bettingArea-btn-watchCard') as HTMLElement
      watchCardBtn?.classList.remove('bettingArea-btn-watchCard-Animation')
    }
    return {
      //methods
      watchCard,
      flyCard,
    };
  },
});
</script>
