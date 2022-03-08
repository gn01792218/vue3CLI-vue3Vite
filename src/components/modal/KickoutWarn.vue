<template>
<div
    class="modal fade"
    id="kickoutAlert"
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
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from "vue";
import { useStore } from "vuex";
import $ from "jquery";
const store = useStore();
const kickoutWarn = computed(() => {
  return store.state.kick.kickoutWarn;
});
const kickout = computed(() => {
  return store.state.kick.Kickout;
});
watch(kickoutWarn, () => {//閒置超過X局，警告即將踢出
  $("#kickoutAlert").modal("show");
});
watch(kickout, () => { //閒置超過X局被正式踢出
  store.commit("kick/setIsKickout", true);
  alert(kickout.value.message);
  closeWindow();
});
function closeWindow() {
  var op = window.open("/leave", "_self") as Window;
  op.opener = null;
  op.close();
}
</script>