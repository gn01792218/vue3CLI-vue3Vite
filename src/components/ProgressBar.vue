<template> 
    <progress id="progress" :value="progressValue" max="100">{{progressValue}} %</progress>
</template>

<script setup lang="ts">
 import { defineProps } from 'vue'
 const props = defineProps({
  progressValue: Number
})
</script>
