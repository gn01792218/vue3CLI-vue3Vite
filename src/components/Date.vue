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
const alertLastThreeGameStartHours = 6 //幾點提醒只剩下最後幾局(格式:24小時制)
const alertLastThreeGameStartMinutes = 10 //提醒的時間到幾分
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
function alertLastThreeGame(date: Date) {  //凌晨時刻提示最後X局的alert
  //提示遊戲還剩下三局結束
  if (isalerted.value) return;
  if (
    date.getHours() == alertLastThreeGameStartHours &&          
    date.getMinutes() <= alertLastThreeGameStartMinutes         
  ) {
    isalerted.value = true;
    $("#closedAlert").modal("show");
  }
}
</script>
