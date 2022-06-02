<template>
  <div
    class="tableItem mb-2 d-flex flex-column align-items-center"
    @click="toGametable(tableInfoData.tableName)"
  >
    <div class="table-img">
      <img
        class="w-100"
        :src="tableInfoData.img"
        :alt="tableInfoData.tableName"
      />
    </div>
    <div class="betLimitInfo">
      <BetLimitInfo :betLimitInfo="tableInfoData" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import BetLimitInfo from "@/components/BetLimtInfo.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import useAnnouncement from "../composables/announcement/useAnnouncement";
const props = defineProps({
  tableInfoData: {
    type: Object,
  },
});
const router = useRouter();
const store = useStore();
//useAnnouncement
const { isChecked } = useAnnouncement(store);
function toGametable(tableNum: string) {
  if (props.tableInfoData?.onLine) {
    if (isChecked()) {
      store.commit("table/setCurrentTable", tableNum);
      router.push({
        path: `/BaccaratGame/${tableNum}`,
      });
    }else{
       alert("請先同意所有遊戲公告事項之規範");
    }
  } else {
    alert("即將開放~!敬請期待~");
  }
}
</script>
