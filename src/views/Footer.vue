<template>
    <UserBetInfo/>
    <footer class="footer">
        <div class="pl-1 pr-1 d-flex">
            <div class="col-sm text-md-left d-flex">
                <span class="footer-item d-none d-md-flex"><i class="bi bi-bar-chart-fill"></i></span>
                <span v-if="isAudioMuted" class="footer-item d-none d-md-flex" @click="mutedSound"><i class="bi bi-volume-off"></i></span>
                <span v-if="!isAudioMuted" class="footer-item d-none d-md-flex" @click="mutedSound"><i class="bi bi-volume-up"></i></span>
                <span class="footer-item d-none d-md-flex"><i class="bi bi-camera-video-fill"></i></span>
                <span  class="footer-item d-none d-md-flex" ><i class="bi bi-eye-fill "></i></span>
                <span class="footer-item" v-if="user">{{userWallet}}</span>
                <div class="footer-item d-flex" data-toggle="modal" data-target="#exampleModal"
                >
                    <i class="bi bi-person-circle" ></i>
                    <i v-if="user">{{user.name}}</i>
                </div>
            </div>
            <div class="col-sm text-md-right justify-content-end d-flex">
                <span class="footer-item d-none d-md-flex"><i class="bi bi-music-note-beamed"></i></span>
                <span class="footer-item d-none d-md-flex"><i class="bi bi-alarm"></i><Date/></span>
                <span class="footer-item d-md-flex"><i class="bi bi-arrows-fullscreen" @click="fullScreen"></i></span>
            </div>
        </div>
    </footer>
</template>
<script lang="ts">
import {computed, defineComponent,ref} from 'vue'
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
        const userWallet = computed(()=>{
            return store.state.auth.userWalletFomate
        })
        const audio = computed<HTMLAudioElement>(()=>{
            return document.querySelector('#gameresultSound') as HTMLAudioElement
        })
        const isAudioMuted = ref(false)
        //全螢幕
        function fullScreen () {
            if(screenfull.isEnabled){
                screenfull.toggle()
            }
        }
        //靜音
        function mutedSound () {
            audio.value.muted = !audio.value.muted
            isAudioMuted.value = !isAudioMuted.value
        }
        return {
            //data
            user,
            userWallet,
            audio,
            isAudioMuted,
            //methods
            fullScreen,
            mutedSound,
        }
    }
})
</script>