<template>
  <div class="newsTicker w-100 d-flex align-items-center">
    <!-- <div class="newsTicker-text d-flex align-items-center" ><i class="bi bi-exclamation-triangle-fill"></i>公告測試</div> -->
    <div class="newsTicker-text d-flex align-items-center" v-if="announment"><i class="bi bi-exclamation-triangle-fill"></i>{{announment.message}}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed, watch} from "vue";
import {gsap , Power0} from "gsap";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default defineComponent({
  setup() {
    onMounted(() => {
        width.value = document.querySelector(".newsTicker")?.getBoundingClientRect().width as number;
        announmentWidth.value = document.querySelector('.newsTicker-text')?.clientWidth as number
        newsTickerAnimate();
    });
    const speed = computed(() => {
      //用X秒跑完這個寬度
      return  (width.value+announmentWidth.value) / (30);
    });
    const width = ref(0)
    const mqlMax1280 = window.matchMedia("(max-width :1280px)")
    mqlMax1280.addEventListener('change',()=>{
         reSizeWidth()
        //  console.log('偵測到跑馬燈寬度變化',width.value,'跑的秒數',speed.value)
         newsTickerAnimate() 
    })
    const route = useRoute()
    const tableNum = computed(()=>{
      return route.params.tableId
    })
    const store = useStore()
    const announment = computed(()=>{ //接收桌子來的公告資料，是陣列，但最後一個才是當前需要的
      return store.state.announcement.BroadcastAnnouncement.announcements[0]
    })
    const announmentWidth = ref(0)
    const runTimes = ref(-1); //想要無限播放請使用-1
    watch(tableNum,()=>{  //看客戶需求再考慮換
      // console.log('重置跑馬燈')
      // if(announment.value!==""){
      //   newsTickerAnimate()
      // }else{
      //   stopTickerAnimate()
      // }
    })
    watch(announment,()=>{  //看客戶需求再考慮換
      if(announment.value==""){
        stopTickerAnimate()
      }
    })
    function newsTickerAnimate() {
      //跑馬燈動畫
      if (width.value) {
        gsap.fromTo(
          ".newsTicker-text",
          { x: width.value },
          { duration: speed.value, repeat: runTimes.value, x: -announmentWidth.value ,ease:Power0.easeIn }
        )
      }
    }
    function stopTickerAnimate(){
      if (width.value) {
        gsap.fromTo(
          ".newsTicker-text",
          { opacity:0 },
          {}
        )
      }
    }
    function reSizeWidth(){
        width.value = document.querySelector(".newsTicker")?.getBoundingClientRect()
        .width as number;
    }
    return {
        //data
        announment,
    };
  },
});
</script>
