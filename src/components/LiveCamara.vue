<template>
  <video class="video-box"
    id="videoElement"
    ref="videoElement"
    controls
    muted
    @click="play"
  ></video>
</template>

<script lang="ts">
import {computed, defineComponent,onMounted,ref, watch, watchEffect} from 'vue'
import {useStore} from 'vuex'
import flvjs from 'flv.js';
import store from '@/store';
export default defineComponent({
  props: {
        width:{
          type:Number,
          default:840
        },
        height:{
          type:Number,
          default:530
        }
    },
    setup(){
      const flvPlayer = ref<any | null>({});
      onMounted(()=>{
        createFlv()
      })
      //vuex
      const store = useStore()
      const flvStream = computed(()=>{
        return store.state.table.TableJoinRecall.table.streamingUrl
      })
      //監聽換桌的直播網址
      watch(flvStream,()=>{
        reloadVideo(flvPlayer.value)
      })
      //影片播放設置
      const createFlv = () => {
        // let url = "http://flv.bdplay.nodemedia.cn/live/bbb.flv";
        // let url = "http://35.201.183.73/live?app=demo&stream=table1";
        if (flvjs.isSupported()) {
        let videoElement = document.getElementById("videoElement");
        flvPlayer.value = flvjs.createPlayer({
          type: "flv",
          isLive: true,
          hasAudio: false, //直播流中没有包含音频流就要設置false
          url:flvStream.value
        },
        );
        flvPlayer.value.attachMediaElement(videoElement);
        flvPlayer.value.load();
        flvPlayer.value.play();
      }
      }
      const destoryVideo = (flvPlayer:any) => {
        console.log(flvPlayer)
        flvPlayer.pause()
        flvPlayer.unload()
        flvPlayer.detachMediaElement()
        flvPlayer = null
      }
      const reloadVideo = (flvPlayer:any) => {
        destoryVideo(flvPlayer)
        createFlv()
      }
      const play = () => {   //防止玩家再次點擊直播畫面
        flvPlayer.value.pause();
        flvPlayer.value.load();
        flvPlayer.value.play();
      }
      return{
        //data
        flvPlayer,
        //methods
        createFlv,play,destoryVideo,reloadVideo,
      }
    },
})

</script>

<style lang="scss" scope>

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