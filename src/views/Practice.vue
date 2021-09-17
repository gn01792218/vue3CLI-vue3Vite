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
      const startCount = ref(0); //計時控制器
      const countTime= ref<Number>(5) //倒數秒數
      const videoWidth = ref<Number>(300) //螢幕寬高
      const videoHeight= ref<Number>(300)
      const p = ref<HTMLParagraphElement>(null)
      const av = ref<HTMLElement>(null)
      const move =()=>{
      console.log("啟動P動畫")
      gsap.to(p.value,{
        keyframes:[
          {duration:3,x:200},
          {duration:1,x:0}
        ]
      })
      }
      const zoonIn = ()=>{
      console.log("啟動P動畫")
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
      const play=()=>{  //到時候要監聽server的指令來執行這個方法
      startCount.value++
      }
    return{
     p,av,startCount,countTime,videoWidth,videoHeight,
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