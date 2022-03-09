<template>
  <span>{{ date }}(UTC+8)</span>
</template>

<script setup lang="ts">
import { ref } from "vue";
import $ from "jquery";
dateRun();
//日期顯示
const date = ref("");
const isalerted = ref(false);
function dateRun() {
  setInterval(() => {
    let temp = new Date();
    date.value = "";
    date.value +=
      temp.getFullYear() +
      "-" +
      (temp.getMonth() + 1) +
      "-" +
      temp.getDate() +
      " " +
      temp.getHours() +
      ":" +
      temp.getMinutes() +
      ":" +
      temp.getSeconds();
    alertLastThreeGame(temp);
  }, 1000);
}
function alertLastThreeGame(date: Date) {
  //提示遊戲還剩下三局結束
  if (isalerted.value) return;
  if (
    date.getHours() == 3 &&
    date.getMinutes() >= 0 &&
    date.getMinutes() <= 10
  ) {
    isalerted.value = true;
    $("#closedAlert").modal("show");
  }
}
</script>
