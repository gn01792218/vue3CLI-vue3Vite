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
import { Options, Vue } from 'vue-class-component';
import {defineComponent, onMounted, reactive, ref} from 'vue'
import flvjs from 'flv.js';
export default defineComponent({
  props: {
        url:String,
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
      //初始化
      onMounted(()=>{
        createFlv();
      })
      //影片播放設置
      const flvPlayer =ref<any | null>({});
      const createFlv = ()=>{
        // let url="http://flv.bdplay.nodemedia.cn/live/bbb.flv";
        let url="http://35.201.183.73/live?app=demo&stream=table1";
        if (flvjs.isSupported()) {
        let videoElement = document.getElementById("videoElement");
        flvPlayer.value = flvjs.createPlayer({
          type: "flv",
          isLive: true,
          hasAudio: false, //直播流中没有包含音频流就要設置false
          url
        });
        flvPlayer.value.attachMediaElement(videoElement);
        flvPlayer.value.load();
        flvPlayer.value.play();
      }
      }
      const play = ()=>{   //防止玩家再次點擊直播畫面
        flvPlayer.value.pause();
        flvPlayer.value.load();
        flvPlayer.value.play();
      }
      return{
        //data
        flvPlayer,
        //methods
        createFlv,play,
      }
    }
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

</style>