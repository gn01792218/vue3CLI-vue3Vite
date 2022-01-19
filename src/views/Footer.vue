<template>
    <UserBetInfo/>
    <footer class="footer">
        <div class="pl-1 pr-1 d-flex">
            <div class="col-sm text-md-left d-flex">
                <!-- <span class="footer-item d-none d-md-flex"><i class="bi bi-bar-chart-fill"></i></span> -->
                <span v-if="isAudioMuted" class="footer-item d-md-flex" @click="mutedSound"><i class="bi bi-volume-off"></i></span>
                <span v-if="!isAudioMuted" class="footer-item d-md-flex" @click="mutedSound"><i class="bi bi-volume-up"></i></span>
                <span v-if="isVideoPlayed" class="footer-item  d-md-flex" @click="playVideo"><i class="bi bi-camera-video-fill"></i></span>
                <span v-if="!isVideoPlayed" class="footer-item  d-md-flex" @click="playVideo"><i class="bi bi-camera-video-off"></i></span>
                <span class="footer-item  d-md-flex"><i class="bi bi-gift"></i></span>
                <span class="footer-item  d-md-flex"><i class="bi bi-chat-dots"></i></span>
                <span class="footer-item  d-md-flex"><i class="bi bi-lightning"></i></span>
                <span class="footer-item  d-md-flex" @click="showAnnouncement"><i class="bi bi-journal-text"></i></span>
                
                <!-- <div class="chat-input position-relative">
                    <input type="text" class="" placeholder="你目前沒有發言權限" aria-label="Username" aria-describedby="basic-addon1">
                    <div class="input-emoji position-absolute">
                        <i class="bi bi-emoji-smile"></i>
                    </div>
                </div> -->
            </div>
            <div class="col-sm text-md-right justify-content-end d-flex">
                <!-- <span class="footer-item d-none d-md-flex"><i class="bi bi-music-note-beamed"></i></span> -->
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
        const announcementShow = computed(()=>{
            return store.state.lobby.showannouncement
        })
        const user = computed(()=>{
            return store.state.auth.UserInfo.user
        })
        const userWallet = computed(()=>{
            return store.state.auth.userWalletFomate
        })
        const audio = computed<HTMLAudioElement>(()=>{
            return document.querySelector('#gameresultSound') as HTMLAudioElement
        })
        const npvideo = computed(()=>{
            return store.state.video.video
        })
        const flvStream = computed(()=>{ //直播網址
        return store.state.table.TableJoinRecall.table.streamingUrl
        })
        const isAudioMuted = ref(false)
        const isVideoPlayed = ref(true)
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
        function playVideo(){
            isVideoPlayed.value = !isVideoPlayed.value
            if(isVideoPlayed.value){ //播放直播
                npvideo.value.start(flvStream.value)
            }else{ //暫停直播
                npvideo.value.stop()
                npvideo.value.clearView()  //清除上一個視頻留下的東西
            }
        }
        function showAnnouncement(){
            store.commit('lobby/setShowannouncement',!announcementShow.value)
        }
        return {
            //data
            user,
            userWallet,
            audio,
            isAudioMuted,
            isVideoPlayed,
            //methods
            fullScreen,
            mutedSound,
            playVideo,
            showAnnouncement,
        }
    }
})
</script>