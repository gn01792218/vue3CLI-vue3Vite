<template>
    <footer class="footer">
        <div class="rows">
            <span><i class="fa fa-volume-up fa-lg" aria-hidden="true"></i></span>
            <span><i class="fa fa-youtube-play fa-lg" aria-hidden="true"></i></span>
            <span>0.00</span>
            <span><i class="fa fa-user-circle fa-lg" aria-hidden="true"></i> P100226 </span>
            <span><i class="fa fa-clock-o fa-lg" aria-hidden="true"></i>{{date}}(UTC+8) </span>
        </div>
    </footer>
</template>

<script>
import {defineComponent, onMounted, ref} from 'vue'
export default defineComponent({
    setup(){
        //初始化
        onMounted(()=>{
            dateRun();
        })
        //日期顯示
        const date = ref("")
        const dateRun = ()=>{  //日期更新
            setInterval(()=>{
                let temp = new Date();
                date.value=""
                date.value += temp.getFullYear()+"-"+(temp.getMonth()+1)+"-"+temp.getDate()+" "+
                              temp.getHours()+":"+temp.getMinutes()+":"+temp.getSeconds();
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

</style>