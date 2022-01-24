<template>
  <div class="newsTicker w-100 d-flex align-items-center">
    <div class="newsTicker-text">{{ newsText }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed} from "vue";
import gsap from "gsap";
export default defineComponent({
  setup() {
    onMounted(() => {
        width.value = document.querySelector(".newsTicker")?.getBoundingClientRect()
        .width as number;
      newsTickerAnimate();
    });
    const speed = computed(() => {
      //用X秒跑完這個寬度
      return  width.value / (20);
    });
    const width = ref(0)
    const mqlMax1280 = window.matchMedia("(max-width :1280px)")
     mqlMax1280.addEventListener('change',()=>{
         reSizeWidth()
         console.log('偵測到跑馬燈寬度變化',width.value,'跑的秒數',speed.value)
         newsTickerAnimate() 
    })
    const newsText = ref("測試文字字字字字~!!!!!!!")  //接收不同桌子來的測試資料
    const runTimes = ref(-1); //想要無限播放請使用-1
    function newsTickerAnimate() {
      
        // console.log("是否跑馬燈")
      //跑馬燈動畫
      if (width.value) {
        //   console.log("跑馬燈動起來")
        gsap.fromTo(
          ".newsTicker-text",
          { x: width.value },
          { duration: speed.value, repeat: runTimes.value, x: -width.value }
        )
        .then(()=>{
            console.log('跑馬燈秒數')
        })
      }
    }
    function reSizeWidth(){
        width.value = document.querySelector(".newsTicker")?.getBoundingClientRect()
        .width as number;
    }
    return {
        //data
        newsText,
    };
  },
});
</script>
