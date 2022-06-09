<template>
  <div class="row betInfo-container">
    <ul class="col-5 text-md-left">
      <section v-if="betInfo && totalRound > 0">
        <li class="font_yellow">
          莊家 : {{ betInfo.banker }} ({{
            Math.floor((betInfo.banker / totalRound) * 100)
          }}%)
        </li>
        <li class="font_red">
          閒家 : {{ betInfo.player }} ({{
            Math.floor((betInfo.player / totalRound) * 100)
          }}%)
        </li>
        <li class="font_green">
          和局 : {{ betInfo.tie }} ({{
            Math.floor((betInfo.tie / totalRound) * 100)
          }}%)
        </li>
        <li class="font_yellow">
          莊對 : {{ betInfo.bankerPair }} ({{
            Math.floor((betInfo.bankerPair / totalRound) * 100)
          }}%)
        </li>
        <li class="font_red">
          閒對 : {{ betInfo.playerPair }} ({{
            Math.floor((betInfo.playerPair / totalRound) * 100)
          }}%)
        </li>
        <li v-if="totalRound > 0">總局數 : {{ totalRound }}</li>
        <li v-else>總局數 : 0</li>
      </section>
      <section v-else>
        <li class="font_yellow">莊家 : 0</li>
        <li class="font_red">閒家 : 0</li>
        <li class="font_green">和局 : 0</li>
        <li class="font_yellow">莊對 : 0</li>
        <li class="font_red">閒對 : 0</li>
        <li v-if="totalRound > 0">總局數 : 0</li>
        <li v-else>總局數 : 0</li>
      </section>
    </ul>
    <ul class="col-7 text-md-right">
      <BetLimitInfo :betLimitInfo="tableInfoData" />
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import BetLimitInfo from "@/components/BetLimtInfo.vue";
import { table } from "@/assets/js/bundle";
import useTable from '@/composables/table/useTable'
//vuex
const store = useStore();
const betInfo = computed(() => {
  return store.state.game.gameResultCount;
});
const totalRound = computed(() => {
  return store.state.game.numOfRound - 1;
});
//useTable
const { tableNum } = useTable(store)
const tableInfoData = computed(() => {
  return store.state.table.tableInfoData[tableNum.value as string];
});
</script>
