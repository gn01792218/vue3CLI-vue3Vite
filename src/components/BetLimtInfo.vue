<template>
<section>
    <p class="text-left mb-0">
      <span v-if="betLimitInfo.bankerMin > 0">
        莊 : {{ numberFormat(betLimitInfo.bankerMin)}} ~
      </span>
      <span v-if="betLimitInfo.onLine && betLimitInfo.bankerMin == 0">
        莊 : 0 ~
      </span>
      <span v-if="betLimitInfo.bankerMax > 0">
        {{ numberFormat(betLimitInfo.bankerMax) }}
      </span>
    </p>
    <p class="text-left mb-0">
      <span v-if="betLimitInfo.playerMin > 0">
        閒 : {{ numberFormat(betLimitInfo.playerMin) }} ~
      </span>
      <span v-if="betLimitInfo.onLine && betLimitInfo.playerMin == 0">
        閒 : 0 ~
      </span>
      <span v-if="betLimitInfo.playerMax > 0">
        {{ numberFormat(betLimitInfo.playerMax) }}
      </span>
    </p>
    <p class="text-left mb-0">
      <span v-if="betLimitInfo.tieMin > 0">
        和 : {{ numberFormat(betLimitInfo.tieMin) }} ~
      </span>
      <span v-if="betLimitInfo.onLine && betLimitInfo.tieMin == 0">
        和 : 0 ~
      </span>
      <span v-if="betLimitInfo.tieMax > 0">
        {{ numberFormat(betLimitInfo.tieMax) }}
      </span>
    </p>
    <p class="text-left mb-0">
      <span v-if="betLimitInfo.bankerPairMin > 0">
        莊對 : {{ numberFormat(betLimitInfo.bankerPairMin) }} ~
      </span>
      <span v-if="betLimitInfo.onLine && betLimitInfo.bankerPairMin == 0">
        莊對 : 0 ~
      </span>
      <span v-if="betLimitInfo.bankerPairMax > 0">
        {{ numberFormat(betLimitInfo.bankerPairMax) }}
      </span>
    </p>
    <p class="text-left mb-0">
      <span v-if="betLimitInfo.playerPairMin > 0">
        閒對 : {{ numberFormat(betLimitInfo.playerPairMin) }} ~
      </span>
      <span v-if="betLimitInfo.onLine && betLimitInfo.playerPairMin == 0">
        閒對 : 0 ~
      </span>
      <span v-if="betLimitInfo.playerPairMax > 0">
        {{ numberFormat(betLimitInfo.playerPairMax) }}
      </span>
    </p>
  </section>
  <!-- <section>
    <p class="text-left mb-0">
      <span v-if="betLimitInfo.bankerMin > 0">
        莊家最小限注{{ numberFormat(betLimitInfo.bankerMin)}};
      </span>
      <span v-if="betLimitInfo.bankerMax > 0">
        最大限注{{ numberFormat(betLimitInfo.bankerMax) }}
      </span>
    </p>
    <p class="text-left mb-0">
      <span v-if="betLimitInfo.playerMin > 0">
        閒家最小限注{{ numberFormat(betLimitInfo.playerMin) }};
      </span>
      <span v-if="betLimitInfo.playerMax > 0">
        最大限注{{ numberFormat(betLimitInfo.playerMax) }}
      </span>
    </p>
    <p class="text-left mb-0">
      <span v-if="betLimitInfo.tieMin > 0">
        和局最小限注{{ numberFormat(betLimitInfo.tieMin) }};
      </span>
      <span v-if="betLimitInfo.tieMax > 0">
        和局最大限注{{ numberFormat(betLimitInfo.tieMax) }}
      </span>
    </p>
    <p class="text-left mb-0">
      <span v-if="betLimitInfo.pairMin > 0">
        莊對最小限注{{ numberFormat(betLimitInfo.pairMin) }};
      </span>
      <span v-if="betLimitInfo.pairMax > 0">
        莊對最大限注{{ numberFormat(betLimitInfo.pairMax) }}
      </span>
    </p>
    <p class="text-left mb-0">
      <span v-if="betLimitInfo.pairMin > 0">
        閒對最小限注{{ numberFormat(betLimitInfo.pairMin) }};
      </span>
      <span v-if="betLimitInfo.pairMax > 0">
        閒對最大限注{{ numberFormat(betLimitInfo.pairMax) }}
      </span>
    </p>
  </section> -->
  <!-- 即將開桌 -->
  <section v-if="betLimitInfo.pairMax == 0 && betLimitInfo.pairMin == 0 && betLimitInfo.tieMax == 0 && betLimitInfo.tieMin == 0 &&
       betLimitInfo.playerMax == 0 && betLimitInfo.playerMin == 0 && betLimitInfo.bankerMin == 0 && betLimitInfo.bankerMax == 0">
    <p class="commingSoon text-center">
      即將開桌，敬請期待!
    </p>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props:{
      betLimitInfo:{}
  },
  setup() {
    function numberFormat(number: number): string {
      return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }
    return {
       //data
      //methods
      numberFormat,
    };
  },
});
</script>
