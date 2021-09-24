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
import {defineComponent, onMounted, reactive} from 'vue'
import flvjs from 'flv.js';
// export default defineComponent({
//   props: {
//         url:String,
//         width:{
//           type:Number,
//           default:840
//         },
//         height:{
//           type:Number,
//           default:530
//         }
//     },
//     setup(){
//       onMounted(()=>{
//         createFlv();
//       })
//       const flvPlayer =reactive<any | null>({});
//       const createFlv = ()=>{
//         // http://flv.bdplay.nodemedia.cn/live/bbb.flv
//       // http://35.201.183.73/live?app=demo&stream=table1
//         let url="http://flv.bdplay.nodemedia.cn/live/bbb.flv";
//         if (flvjs.isSupported()) {
//         let videoElement = document.getElementById("videoElement");
//         flvPlayer = flvjs.createPlayer({
//         type: "flv",
//         isLive: true,
//         hasAudio: false, //直播流中没有包含音频流就要設置false
//         url
//         });
//         flvPlayer.attachMediaElement(videoElement);
//         flvPlayer.load();
//         flvPlayer.play();
//       }
//       }
//       const play = ()=>{
//         flvPlayer.play();
//       }
//       return{
//         createFlv,play
//       }
//     }
// })
 @Options({
    
    //需要再做flvPlayer的data
    mounted(){
      this.createFlv()
    },
    methods:{
    createFlv() {
        // http://flv.bdplay.nodemedia.cn/live/bbb.flv
       // http://35.201.183.73/live?app=demo&stream=table1
        let url="http://35.201.183.73/live?app=demo&stream=table1";
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
        this.flvPlayer.play();
        
    }
    },
    play(){ //防止玩家點擊螢幕站平撥放直播畫面
    console.log("先停止")
      this.flvPlayer.pause();
      // this.flvPlayer.unload();
      this.flvPlayer.load();
      this.flvPlayer.play();
      console.log("再撥放")
    }
    }
  })
export default class LiveCamara extends Vue {
  setup(){

    return{

    }
  }
}
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