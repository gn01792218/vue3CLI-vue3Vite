<template>
  <div class="about">
    <h1>This is an about page</h1>
    <!-- 計時器 -->
    <Counter
     :play="startCount"
     :countNum="countTime"
    />
    <button @click="play">開始倒數</button>
    <!-- 有zoomin動畫的video -->
    <div class="videoContain" ref="av">
      <LiveCamara 
      class="video"
      url='HIHI'
      :width="videoWidth"
      :height="videoHeight"
    ></LiveCamara>
    </div>
    <button @click="zoonIn">螢幕起飛</button>
    <button @click="scaleVideo">視訊縮放</button>
      <p ref="p" @click="move">hello</p>
    </div>
</template>

<script lang="ts">
  import {defineComponent, ref} from 'vue'
  import LiveCamara from '@/components/LiveCamara.vue'
  import Counter from '@/components/Counter.vue'
  import gsap from 'gsap'
  export default defineComponent({
    components:{
      LiveCamara,Counter
    },
    setup(){
      //倒數計時操控
      const startCount = ref(0); //計時控制器
      const countTime= ref<Number>(5) //倒數秒數
      const play=()=>{  //到時候要監聽server的指令來執行這個方法
      startCount.value++
      }
      //直播螢幕操控
      const videoWidth = ref<Number>(300) //螢幕寬高
      const videoHeight= ref<Number>(300)
      //字體移動動畫
      const p = ref<HTMLParagraphElement | null>(null)
      const move =()=>{
      gsap.to(p.value,{
        keyframes:[
          {duration:3,x:200},
          {duration:1,x:0}
        ]
      })
      }
      //螢幕動畫
      const av = ref<HTMLElement | null>(null)
      const zoonIn = ()=>{
      gsap.to(av.value,{
        keyframes:[
          {duration:1,x:150},
          {duration:1,x:0}
        ]
      })
      }
      const scaleVideo= ()=>{
      console.log("啟動視訊縮放")
      gsap.to('.video',{
        keyframes:[
          {duration:1,scale:1.5},
          {duration:1,scale:1}
        ]
      })
      }
     
    return{
      //data
     p,av,startCount,countTime,videoWidth,videoHeight,
     //methods
     move,zoonIn,scaleVideo,play
    }
    },
  })
</script>
<style scoped lang="scss">
.videoContain{
  overflow: hidden;
  margin-left: auto;
  margin-right: auto;
  width:300px;
  height:300px;
}
  
</style>