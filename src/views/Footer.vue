<template>
    <UserBetInfo/>
    <Reward/>
    <footer class="footer">
        <div class="pl-1 pr-1 d-flex">
            <div class="col-sm text-md-left d-flex">
                <!-- <span class="footer-item d-none d-md-flex"><i class="bi bi-bar-chart-fill"></i></span> -->
                <span v-if="isAudioMuted" class="footer-item d-md-flex" @click="mutedSound"><i class="bi bi-volume-off"></i></span>
                <span v-if="!isAudioMuted" class="footer-item d-md-flex" @click="mutedSound"><i class="bi bi-volume-up"></i></span>
                <span v-if="isVideoPlayed" class="footer-item  d-md-flex" @click="playVideo"><i class="bi bi-camera-video-fill"></i></span>
                <span v-if="!isVideoPlayed" class="footer-item  d-md-flex" @click="playVideo"><i class="bi bi-camera-video-off"></i></span>
                <span v-if="tableNum" class="footer-item  d-md-flex" data-toggle="modal" data-target="#reward"><i class="bi bi-gift"></i></span>
                <span class="footer-item  d-md-flex"><i class="bi bi-chat-dots"></i></span>
                <span class="footer-item  d-md-flex"><i class="bi bi-lightning"></i></span>
                <!-- <span class="footer-item  d-md-flex" @click="showAnnouncement"><i class="bi bi-journal-text"></i></span> -->
                <div v-if="tableNum" class="chat-input position-relative">
                    <input @keyup.enter="sendChatMsg" type="text" class="" placeholder="你目前沒有發言權限" aria-label="Username" aria-describedby="basic-addon1" v-model="chatMsg">
                    <div class="input-emoji position-absolute">
                        <i class="bi bi-emoji-smile"></i>
                    </div>
                </div>
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
import UserBetInfo from '@/components/UserBetInfo.vue'
import Reward from "@/components/Reward.vue";
import Date from '@/components/Date.vue'
import {useStore} from 'vuex'
import screenfull from 'screenfull'
import { useRoute } from 'vue-router'
import {chatContent,tableName} from '../types/global'
export default defineComponent({
    components:{
        UserBetInfo,
        Date,
        Reward,
    },
    setup(){
        const route = useRoute()
        const tableNum = computed(()=>{
        return route.params.tableId
        })
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
        const audio = computed<HTMLAudioElement>(()=>{ //音效的實體
            return document.querySelector('#gameresultSound') as HTMLAudioElement
        })
        const npvideo = computed(()=>{  //直播物件的實體
            return store.state.video.video
        })
        const flvStream = computed(()=>{ //直播網址
        return store.state.table.TableJoinRecall.table.streamingUrl
        })
        //暫時性:之後要傳送資料給server start
        const chatContentArr = computed<chatContent[]>(()=>{ 
           return store.state.chat.chatContentArr
        })
       //暫時性end
        const isAudioMuted = ref(false)
        const isVideoPlayed = ref(true)
        const chatMsg = ref("")
        const typeTimer = ref()
        const canType = ref(true)
        //全螢幕
        function fullScreen () {
            if(screenfull.isEnabled){
                screenfull.toggle()
            }
        }
        //靜音 / 打開 音效
        function mutedSound () {
            audio.value.muted = !audio.value.muted
            isAudioMuted.value = !isAudioMuted.value
        }
        //播放/暫停直播
        function playVideo(){
            isVideoPlayed.value = !isVideoPlayed.value
            if(isVideoPlayed.value){ //播放直播
                npvideo.value.start(flvStream.value)
            }else{ //暫停直播
                npvideo.value.stop()
                npvideo.value.clearView()  //清除上一個視頻留下的東西
            }
        }
        function setTypeTImer(){ //防止連按function
            canType.value = false
            typeTimer.value = setInterval(()=>{
                    clearInterval(typeTimer.value)
                    canType.value = true
                    console.log('可以繼續打字',canType.value,typeTimer.value)
            },1000)
        }
        //送出聊天訊息
        function sendChatMsg(){
            if(chatMsg.value.length<20 && canType.value){
                //設置防止連按
                setTypeTImer()
                //傳送訊息給serve
                //以下測試start
                let chatTable:chatContent | undefined= chatContentArr.value.find((i:chatContent)=>{
                    return i.table == tableNum.value 
                })
                if(chatTable){
                    chatTable.chatMsgArr.push({
                        content:`玩家${user.value.name}:${chatMsg.value}`,
                        textColor:'white',
                    })
                }
                //測試end
                chatMsg.value = ""
            }else{
                if(chatMsg.value.length>20){
                    alert('請勿輸入超過20字')
                    chatMsg.value = ""
                }else if(!canType.value){
                    alert('請勿連續輸入')
                }
            }
        }
        // function showAnnouncement(){ //控制公告同意書顯示與否
        //     store.commit('lobby/setShowannouncement',!announcementShow.value)
        // }
        return {
            //data
            user,
            userWallet,
            audio,
            isAudioMuted,
            isVideoPlayed,
            tableNum,
            chatMsg,
            //methods
            fullScreen,
            mutedSound,
            playVideo,
            sendChatMsg,
            // showAnnouncement,
        }
    }
})
</script>