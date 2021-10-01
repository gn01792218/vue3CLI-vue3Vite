<template>
    <footer class="footer">
        <div class="rows">
            <div class="col-sm text-md-left">
                <span class="b"><i class="bi bi-bar-chart-fill"></i></span>
                <span class="b"><i class="bi bi-camera-video-fill"></i></span>
                <span class="b"><i class="bi bi-eye-fill"></i></span>
                <span class="b">0.00</span>
                <span class="b"><i class="bi bi-music-note-beamed"></i></span>
            </div>
            <div class="col-sm text-md-right">
                <span class="b"><i class="bi bi-person-circle"></i> P100226</span>
                <span class="b"><i class="bi bi-alarm"></i>{{date}}(UTC+8)</span>
                <span class="b"><i class="bi bi-arrows-fullscreen"></i></span>
            </div>
        </div>
    </footer>
</template>

<script>
import {defineComponent, onMounted, ref} from 'vue'
export default defineComponent({
    setup(){
        //初始化
        onMounted(() => {
            dateRun();
        })
        //日期顯示
        const date = ref("")
        const dateRun = () => {  //日期更新
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
            //methods
            dateRun
        }
    }
})
</script>

<style>
.rows{
    display: flex;
}
</style>