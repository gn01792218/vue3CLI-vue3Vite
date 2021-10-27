<template>
    <span>{{date}}(UTC+8)</span>
</template>

<script lang="ts">
import {defineComponent,ref} from 'vue'

export default defineComponent({
    setup(){
        dateRun()
        //日期顯示
        const date = ref("")
        function dateRun () {
            setInterval(() => {
                let temp = new Date();
                date.value =""
                date.value += temp.getFullYear() + "-" + (temp.getMonth()+1) + "-" + temp.getDate() + " " +
                              temp.getHours() + ":" + temp.getMinutes() + ":" + temp.getSeconds();
            },1100)
        }
        return {
            //data
            date,
        }
    }
})
</script>

<style>

</style>