<template>
    <UserBetInfo/>
    <footer class="footer">
        <div class="pl-1 pr-1 d-flex">
            <div class="col-sm text-md-left d-flex">
                <span class="footer-item d-none d-md-flex"><i class="bi bi-bar-chart-fill"></i></span>
                <span class="footer-item d-none d-md-flex"><i class="bi bi-camera-video-fill"></i></span>
                <span class="footer-item d-none d-md-flex"><i class="bi bi-eye-fill "></i></span>
                <span class="footer-item" v-if="user">{{user.wallet}}</span>
                <span class="footer-item d-none d-md-flex"><i class="bi bi-music-note-beamed"></i></span>
            </div>
            <div class="col-sm text-md-right justify-content-end d-flex">
                <span class="footer-item" data-toggle="modal" data-target="#exampleModal"><i class="bi bi-person-circle"></i><span v-if="user">{{user.name}}</span></span>
                <span class="footer-item d-none d-md-flex"><i class="bi bi-alarm"></i><Date/></span>
                <span class="footer-item d-none d-md-flex"><i class="bi bi-arrows-fullscreen" @click="fullScreen"></i></span>
            </div>
        </div>
    </footer>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue'
import {useStore} from 'vuex'
import screenfull from 'screenfull'
import UserBetInfo from '@/components/UserBetInfo.vue'
import Date from '@/components/Date.vue'
export default defineComponent({
    components:{
        UserBetInfo,Date
    },
    setup(){
        //vuex
        const store = useStore()
        //computed
        const user = computed(()=>{
            return store.state.auth.UserInfo.user
        })
        
        //全螢幕
        function fullScreen () {
            console.log("全螢幕")
            if(screenfull.isEnabled){
                
                screenfull.toggle()
            }
        }
        return {
            //data
            user,
            //methods
            fullScreen
        }
    }
})
</script>