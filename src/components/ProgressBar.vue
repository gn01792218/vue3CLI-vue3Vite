<template>
  <div>
    <p class="align-center">載入資源 {{ progressValue }} %</p>
    <div class="progressBar">
      <progress
        id="progress"
        class="w-100 h-100"
        :value="progressValue"
        max="100"
      >
      </progress>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, watch, computed, onUpdated, onMounted } from "vue";
const props = defineProps({
  progressValue: Number,
});
</script>
