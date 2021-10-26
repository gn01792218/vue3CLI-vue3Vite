<template>
    <div class="LoadingPage w-100 h-100 position-absolute">
        <p>Loading...please wait</p>
    </div>
</template>

<script>
import {defineComponent} from 'vue'
export default defineComponent({
    setup(){
        console.log("loading")
    }
})
</script>

<style>
    .LoadingPage{
        background-image: url('../images/loading.svg');
        background-color: #644d31;
        text-align: center;
  }
</style>