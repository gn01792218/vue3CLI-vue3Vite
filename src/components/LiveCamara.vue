<template>
  <video 
    id="videoElement"
    ref="videoElement"
    controls
    muted
    :width=width
    :height=height
  ></video>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import flvjs from 'flv.js';
 @Options({
    props: {
        url: String,
        width:{
          type:Number,
          default:300
        },
        height:{
          type:Number,
          default:300
        }
    },
    mounted(){
    },
    methods:{
    createFlv() {
        let url=this.url;
        if (flvjs.isSupported()) {
        let videoElement = document.getElementById("videoElement");
        this.flvPlayer = flvjs.createPlayer({
        type: "flv",
        isLive: true,
        hasAudio: false, //直播流中没有包含音频流就要設置false
        url
        });
        this.flvPlayer.attachMediaElement(videoElement);
        this.flvPlayer.load();
    }
  }
    }
  })
export default class LiveCamara extends Vue {
  msg!: string
  created(){
  }
  setup(){

    return{

    }
  }
}
</script>

<style lang="scss" scope>
//以下是用來控制撥放器按鈕顯示的CSS，可以依據需求關閉
// video::-webkit-media-controls-fullscreen-button {
//     display: none;
// }
// video::-webkit-media-controls-play-button {
//     display: none;
// }
// video::-webkit-media-controls-timeline {
//     display: none;
// }
// video::-webkit-media-controls-current-time-display{
//     display: none;            
// }
// video::-webkit-media-controls-time-remaining-display {
//     display: none;            
// }
// video::-webkit-media-controls-mute-button {
//     display: none;            
// }
// video::-webkit-media-controls-toggle-closed-captions-button {
//     display: none;            
// }
// video::-webkit-media-controls-volume-slider {
//     display: none;            
// }
// video::-webkit-media-controls-enclosure{
//     display: none;
// }

</style>