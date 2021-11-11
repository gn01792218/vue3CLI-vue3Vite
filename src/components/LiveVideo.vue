<template>
  <div class="video-box">
    <video class="video"
      id="videoElement"
      ref="videoElement"
      controls
      muted
      autoplay
      @click="play"
    ></video>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent,onMounted,ref, watch} from 'vue'
import {useStore} from 'vuex'
import flvjs from 'flv.js';
import gsap from 'gsap'
export default defineComponent({
  //修正蘋果手機無法撥放的問題 
    setup(){
      //直播物件
      const flvPlayer = ref<any | null>({});
      const zoonScale = ref<number>(1)
      //初始化
      onMounted(()=>{
        createFlv()
      })
      //vuex
      const store = useStore()
      const flvStream = computed(()=>{
        return store.state.table.TableJoinRecall.table.streamingUrl
      })
      const gameUuid = computed(()=>{ //遊戲回合的Uuid
            return store.state.game.gameUuid
        })
      const gameEndUuid = computed(()=>{
            return store.state.game.gameEndUuid
        })
      //監聽換桌的直播網址
      watch(flvStream,()=>{
        reloadVideo(flvPlayer.value)
      })
      watch(gameUuid,()=>{  //新回合開始時，將螢幕縮回去
        resetZoon()
      })
      watch(gameEndUuid,()=>{ //回合結束時，拉近螢幕
        zoonIn()
      })
      //解決視窗失焦掉秒數問題
      window.addEventListener('focus',()=>{
        if(flvPlayer.value.toString!=="{}"){
          reloadVideo(flvPlayer.value)
        }
      })
      window.addEventListener('blur',()=>{
        console.log("失去焦點")
        // if(flvPlayer.value.toString!=="{}"){
        //   console.log("摧毀直播")
        //   destoryVideo(flvPlayer.value)
        // }
      })
      //影片播放設置
      function createFlv () {
        if (flvjs.isSupported()) {
          let videoElement = document.getElementById("videoElement");
          flvPlayer.value = flvjs.createPlayer({
            type: "flv",
            isLive: true,
            hasAudio: false, //直播流中没有包含音频流就要設置false
            url:flvStream.value,
          },{
            enableWorker:true,
            enableStashBuffer:false,
            stashInitialSize:128,
          });
          flvPlayer.value.attachMediaElement(videoElement);
          flvPlayer.value.load();
          flvPlayer.value.play();
        } 
      }
      function destoryVideo (flvPlayer:any) {
        flvPlayer.pause()
        flvPlayer.unload()
        flvPlayer.detachMediaElement()
        flvPlayer = null
      }
      function reloadVideo (flvPlayer:any) {
        destoryVideo(flvPlayer)
        createFlv()
      }
      function play () { //防止玩家再次點擊直播畫面
        flvPlayer.value.pause();
        flvPlayer.value.load();
        flvPlayer.value.play();
      }
      function zoonIn () {
        if(zoonScale.value !== 1.5){
          zoonScale.value = 1.5
          gsap.to('#videoElement',{
            keyframes:[
              {delay:1},
              {duration:1,scale:zoonScale.value}
            ]
          })
        }
        
      }
      function resetZoon () {
        if(zoonScale.value!==1){
          zoonScale.value=1
          gsap.to('#videoElement',
          {
            duration:1,scale:zoonScale.value
          })
        }
      }
      return{
        //data
        flvPlayer,
        //methods
        createFlv,play,destoryVideo,reloadVideo,zoonIn,
      }
    },
})

</script>

<style lang="scss">
.video-box{
  overflow: hidden;
  width:100%;
  .video{
    width:100%;
    height:100%;
  }
}
//以下是用來控制撥放器按鈕顯示的CSS，可以依據需求關閉
video::-webkit-media-controls-fullscreen-button {
    display: none;
}
video::-webkit-media-controls-play-button {
    display: none;
}
video::-webkit-media-controls-timeline {
    display: none;
}
video::-webkit-media-controls-current-time-display{
    display: none;            
}
video::-webkit-media-controls-time-remaining-display {
    display: none;            
}
video::-webkit-media-controls-mute-button {
    display: none;            
}
video::-webkit-media-controls-toggle-closed-captions-button {
    display: none;            
}
video::-webkit-media-controls-volume-slider {
    display: none;            
}
video::-webkit-media-controls-enclosure{
    display: none;
}
.ssBtnDefault{
  display: none;
}
</style>