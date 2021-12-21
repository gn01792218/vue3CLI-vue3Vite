<template>
  <div class="video-box position-relative">
    <canvas class="video"  id="video" width="980" height="588" /><br/>
    <VideoLoading
      v-show="loadingVideo"
    />
  </div>
</template>
<script lang="ts">
import {computed, defineComponent,onMounted,ref, watch} from 'vue'
import {useStore} from 'vuex'
import VideoLoading from '@/components/VideoLoading.vue'
import gsap from 'gsap'
import { useRoute } from 'vue-router'
export default defineComponent({
  components:{
    VideoLoading,
  },
  //修正蘋果手機無法撥放的問題 
    setup(){
      //vuex
      const store = useStore()
      //暫時增加
      const route = useRoute()
      const tableNum = computed(()=>{
        return route.params.tableId
      })
      watch(tableNum,()=>{
        if(tableNum.value=="A"){
          console.log('進A桌',flvStream.value)
          np.value.stop()
          np.value.clearView()
          np.value.setKeepScreenOn()
          np.value.start(flvStream.value)
        }else if(tableNum.value=="B"){
          console.log('進B桌',testB)
          np.value.stop()
          np.value.clearView()
          np.value.setKeepScreenOn()
          np.value.start(testB)
        }
      })
      const flvStream = computed(()=>{ //直播網址
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
        stopPlay()
        startPlay()
      })
      const np = computed(()=>{
        return store.state.video.video
      })
      const flvPlayer = ref<any | null>({});
      const zoonScale = ref<number>(1)
      const userSystem = navigator.userAgent //使用者作業系統
      const isAndroid = userSystem.indexOf('Android') > -1 || userSystem.indexOf('Adr') >-1
      const isIOS = userSystem.match(/\(i[^;]+;(U;)? CPU.+Mac OS X/)
      const testPlayUrl = 'http://flv.bdplay.nodemedia.cn/live/bbb.flv'
      const testB = 'http://35.201.183.73/live?app=KH89&stream=tt1'
      // if(isIOS){
      //   console.log("蘋果系統")
      // }
      // document.addEventListener('WeixinJSBridgeReady',function () {
      //     flvPlayer?.play()
      //     console.log("自動撥放")
      //   },false)
      const hasAutoPlayed = ref(false)
      const loadingVideo = ref(true)
      //初始化
      store.commit('video/setVideo',new NodePlayer())
      // let np = new NodePlayer()
      onMounted(()=>{
        np.value.setView("video");
        np.value.setScaleMode(2)
        np.value.onResize(0)
        np.value.setBufferTime(300)
        np.value.on('error',(e:any)=>{
          // console.log('直播發生錯誤',e)
        })
        np.value.on('videoInfo',(w:any)=>{
          // console.log("顯示Video",w)
           loadingVideo.value = false
        })
        np.value.on('stop',()=>{
        //  console.log("結束播放Video")
         loadingVideo.value = true
        })
        // createFlv()
        startPlay()
      })
      function startPlay (){
        // console.log("LiveVideo開始撥放",flvStream.value)
        np.value.setKeepScreenOn()
        np.value.start(flvStream.value)
        // np.start(testPlayUrl)   //測試時使用
      }
      function stopPlay () {
        np.value.stop()
        np.value.clearView()  //清除上一個視頻留下的東西
      }
      
      //直播畫面拉伸
      // watch(gameUuid,()=>{  //改用子母畫面，暫時不需要。新回合開始時，將螢幕縮回去
      // console.log('恢復螢幕')
      //   resetZoon()
      // })
      // watch(gameEndUuid,()=>{ //改用子母畫面，暫時不需要。回合結束時，拉近螢幕
      // console.log("拉近螢幕")
      //   zoonIn()
      // })
      //解決IOS版本無法自動播放問題
      // window.addEventListener('touchstart',()=>{  //桌機版本只要滑鼠有動就算自動撥放過了
      //   if(flvPlayer.value.toString!=="{}" && !hasAutoPlayed.value){
      //     reloadVideo(flvPlayer.value).then(r=>{
      //       hasAutoPlayed.value = true
      //       console.log("重新加載")
      //     }
      //     )
      //   }
      // })
      // window.addEventListener('touchmove',()=>{  //桌機版本只要滑鼠有動就算自動撥放過了
      //   if(flvPlayer.value.toString!=="{}" && !hasAutoPlayed.value){
      //     reloadVideo(flvPlayer.value).then(r=>{
      //       hasAutoPlayed.value = true
      //       console.log("重新加載")
      //     }
      //     )
      //   }
      // })
      // window.addEventListener('touchend',()=>{  //桌機版本只要滑鼠有動就算自動撥放過了
      //   if(flvPlayer.value.toString!=="{}" && !hasAutoPlayed.value){
      //     reloadVideo(flvPlayer.value).then(r=>{
      //       hasAutoPlayed.value = true
      //       console.log("重新加載")
      //     }
      //     )
      //   }
      // })
      // window.addEventListener('touchcancel',()=>{  //桌機版本只要滑鼠有動就算自動撥放過了
      //   if(flvPlayer.value.toString!=="{}" && !hasAutoPlayed.value){
      //     reloadVideo(flvPlayer.value).then(r=>{
      //       hasAutoPlayed.value = true
      //       console.log("重新加載")
      //     }
      //     )
      //   }
      // })
      // window.addEventListener('mousedown',()=>{ //專門給手機版本
      //   if(flvPlayer.value.toString!=="{}" && !hasAutoPlayed.value){
      //     reloadVideo(flvPlayer.value).then(r=>{
      //       hasAutoPlayed.value = true
      //       console.log("重新加載")
      //     }
      //     )
      //   }
      // })
      //解決視窗失焦掉秒數問題
      window.addEventListener('focus',()=>{
        //暫時的
        if(tableNum.value=="A"){
          console.log('進A桌',flvStream.value)
          np.value.stop()
          np.value.clearView()
          np.value.setKeepScreenOn()
          np.value.start(flvStream.value)
        }else if(tableNum.value=="B"){
          console.log('進B桌',testB)
          np.value.stop()
          np.value.clearView()
          np.value.setKeepScreenOn()
          np.value.start(testB)
        }
        //原本的
        // if(np){
        //   stopPlay()
        //   startPlay()
        // }
      })
      //偵測使用者裝置作業系統

      // //影片播放設置
      // function createFlv () {
      //   if (flvjs.isSupported()) {
      //     let videoElement = document.getElementById("videoElement");
      //     flvPlayer.value = flvjs.createPlayer({
      //       type: "flv",
      //       isLive: true,
      //       hasAudio: false, //直播流中没有包含音频流就要設置false
      //       url:flvStream.value,
      //     },{
      //       enableWorker:true,
      //       enableStashBuffer:false,
      //       stashInitialSize:128,
      //     });
      //     flvPlayer.value.attachMediaElement(videoElement);
      //     flvPlayer.value.load();
      //     flvPlayer.value.play();
      //   } 
      // }
      // async function destoryVideo (flvPlayer:any) {
      //   flvPlayer.pause()
      //   flvPlayer.unload()
      //   flvPlayer.detachMediaElement()
      //   flvPlayer = null
      // }
      // async function reloadVideo (flvPlayer:any) {
      //   await destoryVideo(flvPlayer)
      //   createFlv()
      // }
      // function play () { //防止玩家再次點擊直播畫面
      //   flvPlayer.value.pause();
      //   flvPlayer.value.load();
      //   flvPlayer.value.play();
      // }
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
        flvPlayer,isIOS,loadingVideo,
        //methods
        zoonIn,
      }
    },
})

</script>

<style lang="scss">
// .video-box{
//   overflow: hidden;
//   width:100%;
//   .video{
//     width:100%;
//     height:100%;
//   }
// }
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
// .ssBtnDefault{
//   display: none;
// }
</style>