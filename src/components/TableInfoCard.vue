<template>
  <div
    class="tableItem mb-5 mb-xl-0 mr-xl-5 p-3 d-flex d-xl-block align-items-center"
    @click="toGametable(tableInfoData.tableNum)"
  >
    <div class="table-img">
      <img
        class="w-100"
        :src="tableInfoData.img"
        :alt="tableInfoData.tableNum"
      />
    </div>
    <div class="betLimitInfo">
      <BetLimitInfo :betLimitInfo="tableInfoData" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BetLimitInfo from "@/components/BetLimtInfo.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default defineComponent({
  components: {
    BetLimitInfo,
  },
  props: {
    tableInfoData: {
      type: Object,
    },
  },
  setup(props) {
    const router = useRouter();
    const store = useStore();
    function toGametable(tableNum: string) {
      if (props.tableInfoData?.onLine) {
        store.commit("table/setCurrentTable", tableNum);
        router.push({
          path: `/BaccaratGame/${tableNum}`,
        });
      }else{
          alert('即將開放~!盡請期待~')
      }
    }
    return {
      //methods
      toGametable,
    };
  },
});
</script>
