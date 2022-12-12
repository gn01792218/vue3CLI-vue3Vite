<template>
  <div>
    <p class="align-center">載入資源 {{ progressValue }} %</p>
    <div class="progressBar">
      <progress
        class="w-100 h-100"
        :value="progressValue"
        max="100"
      >
      </progress>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  progressValue: Number,
});
</script>
