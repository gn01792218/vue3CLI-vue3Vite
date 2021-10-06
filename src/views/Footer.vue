<template>
    <footer class="footer">
        <div class="rows">
            <div class="col-sm text-md-left">
                <span class="b"><i class="bi bi-bar-chart-fill"></i></span>
                <span class="b"><i class="bi bi-camera-video-fill"></i></span>
                <span class="b"><i class="bi bi-eye-fill"></i></span>
                <span class="b" v-if="user">{{user.wallet}}</span>
                <span class="b"><i class="bi bi-music-note-beamed"></i></span>
            </div>
            <div class="col-sm text-md-right">
                <span class="b"><i class="bi bi-person-circle"></i><span v-if="user">{{user.name}}</span></span>
                <span class="b"><i class="bi bi-alarm"></i>{{date}}(UTC+8)</span>
                <span class="b"><i class="bi bi-arrows-fullscreen"></i></span>
            </div>
        </div>
    </footer>
</template>

<script>
import {computed, defineComponent, onMounted, ref} from 'vue'
import {useStore} from 'vuex'
export default defineComponent({
    setup(){
        //初始化
        onMounted(() => {
            dateRun();
        })
        //vuex
        const store = useStore()
        //computed玩家資訊
        const user = computed(()=>{
            return store.state.auth.UserInfo.user
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
            date,user,
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