<template>
  <!-- sideRoadBackgroundGrid -->
    <div class="secRoad d-flex sideWidth">
        <div class="secRoad-column" :class="`secRoad-column${index}`" v-for="(sc,index) in secWidth" :key="index"></div>
    </div>
    <div class="sec-column position-absolute sideWidth">
      <div class="secRoad-row" :class="[{'boundary-bottom':index===5 | index===8}]" v-for="(sr,index) in secHeight" :key="index"></div>
    </div>
    <!-- bigRoadGrid -->
    <section class="bigRoad d-flex sideWidth position-absolute">
      <div class="bigRoad-column" :class="[`bigRoad-column${index}`]" v-for="(tc,index) in secWidth" :key="index">
        <div class="bigRoad-item d-flex" :class="[`bigRoad-item${index}`]" v-for="(tci,index) in topHeight" :key="index">
          <div></div>
        </div>
      </div>
    </section>
    <!-- centerRoad -->
    <section class="centerRoad d-flex sideWidth position-absolute">
      <div class="centerRoad-colum" :class="[`centerRoad-column${index}`]" v-for="(cc,index) in centerRoadWidth" :key="index">
        <div class="centerRoad-item" :class="[`centerRoad-item${index}`]" v-for="(cci,index) in bottomHeight" :key="index">
          <div class="playerRoadIcon3-1"></div>
        </div>
      </div>
    </section>
    <section class="bottomRoad d-flex sideWidth position-absolute">
    <!-- bottom1Grid -->
      <div class="bottomRoad1 d-flex w-50">
        <div class="bottomRoad1-column" :class="[`bottomRoad1-column${index}`,{'boundary-right':index===21}]" v-for="(b1,index) in bottom1width" :key="index">
          <div class="bottomRoad-item" v-for="(bi,index) in bottomHeight" :key="index">
            <div class="playerRoadIcon7"></div>
          </div>
        </div>
      </div>
      <!-- bottom2Grid -->
      <div class="bottomRoad2 d-flex w-50">
        <div class="bottomRoad1-column" :class="[`bottomRoad2-column${index}`]" v-for="(b1,index) in bottom1width" :key="index">
          <div class="bottomRoad-item" v-for="(bi,index) in bottomHeight" :key="index">
            <div class="bankerRoadIcon8"></div>
          </div>
        </div>
      </div>
    </section>
</template>

<script lang="ts">
import {defineComponent,computed,ref, watch} from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
    setup(){
        //vuex
        const store = useStore()
        const gameResult = computed(()=>{ //回傳的是陣列
            return store.state.dealer.BroadcastGameResult.results
        })
        //表格
        const secWidth = new Array(22)
        const secHeight = new Array(12)
        const topHeight = new Array(6)
        const centerRoadWidth =new Array(44)
        const bottomHeight = new Array(6)
        const bottom1width = new Array(22)
        //基本資料
        const bigRoadColumn = ref(0)
        const bigRoadItemIndex = ref(0)
        const currentBigRoadResult = ref(0)
        const lastBigRoadResult = ref(0)
        const roadOverFlowerTimes = ref(0)
        watch(gameResult,()=>{
          showBigRoad()
        })
        function recordBigRoad (gameResult:number){
          switch(gameResult){
              case 1:
                currentBigRoadResult.value = 1   //閒贏
                break
              case 2:
                currentBigRoadResult.value = 2   //莊贏
                break
              case 3:
                currentBigRoadResult.value = 1   //等同於閒贏
                break
              case 5:
                currentBigRoadResult.value = 2   //等同於莊贏
                break
            }
        }
        function putBigRoad(colNum:number,roadIndex:number,gameResult:number){
          if(gameResult!==4){ //和局不會記錄
            let bigRoadCol = document.querySelector(`.bigRoad-column${colNum}`) as HTMLElement
            let bigRoadColItem = bigRoadCol.children[roadIndex].firstChild as HTMLElement
            switch(gameResult){
            case 1:
              bigRoadColItem.classList.add('playerRoadIcon3')
              break
            case 2:
              bigRoadColItem.classList.add('bankerRoadIcon3')
              break
            case 3:
              bigRoadColItem.classList.add('playerRoadIcon5')
              break
            case 5:
              bigRoadColItem.classList.add('bankerRoadIcon4')
              break
            }
            bigRoadItemIndex.value++
          }
        }
        function showBigRoad () { //控制要放在哪
          gameResult.value.forEach((i:any)=>{
            recordBigRoad(i)
            if(bigRoadColumn.value>20){
              resetBigRoad()
            }
            if(currentBigRoadResult.value!==lastBigRoadResult.value && currentBigRoadResult.value!==0 && lastBigRoadResult.value!==0){ //換行時機一:下一個是不同邊贏
              console.log("有不同的輸贏")
              if(roadOverFlowerTimes.value>0){
                bigRoadColumn.value= bigRoadColumn.value-roadOverFlowerTimes.value-1
                roadOverFlowerTimes.value = 0
              }else{
                bigRoadColumn.value++
                bigRoadItemIndex.value = 0
              }
            }
            if(bigRoadItemIndex.value>5 && currentBigRoadResult.value==lastBigRoadResult.value){  //換行時機二:同樣的滿了，就開始橫放到下一行最後一格
              console.log("滿格了換行")
              bigRoadColumn.value++
              bigRoadItemIndex.value = 5
              roadOverFlowerTimes.value++ //滿格換行一次就會++；中斷後col要回退roadOverFlowerTimes.value-1
            }
            putBigRoad(bigRoadColumn.value,bigRoadItemIndex.value,i)
            lastBigRoadResult.value = currentBigRoadResult.value
          })
        }
        function resetBigRoad () {
          for(let i = 0 ; i <8 ; i++){
            let checkerboardRoadCol = document.querySelector(`.mainRoad-column${i}`) as HTMLElement
            for(let i = 0 ; i<6 ;i++){
              let checkerboardRoadColItem = checkerboardRoadCol.children[i].firstChild as HTMLElement
              checkerboardRoadColItem.setAttribute("class","")
            }
          }
          bigRoadColumn.value = 0
          bigRoadItemIndex.value = 0
          roadOverFlowerTimes.value = 0
        }
        return {
          //data
          topHeight,centerRoadWidth ,secWidth,bottomHeight,secHeight,bottom1width,
          //methods
          
        }
    },
})
</script>

<style lang="scss">
/* 背景格子 */
.secRoad{
  height:100%;
  background-color: white;
}
.secRoad-column{
  border: 1px solid rgba(128, 128, 128, 0.219);
  width:4.54545454%; /*調整欄寬 */
  height: 100%;
}
.sec-column{
  right:0;
  height:100%;
}
.secRoad-row{
  height:8.33333333333333333%;
  width:100%;
  border: 1px solid rgba(128, 128, 128, 0.219);
}

/* 放置四種路圖的格子 */
.bigRoad{
  top:0;
  right:0;
  height:50%;
}
.bigRoad-column{
  /* border: 2px solid yellow; */
  width:4.54545454%;  /*調整欄寬 */
  height:100%;
}
.bigRoad-item{
  /* border: blue solid 1px; */
  height:16.6666666%;
  flex-direction: column;
  align-items: center;
}
.centerRoad{
  width:100%;
  // border:solid red 2px;
  height:25%;
  right:0;
  top:50%;
}
.centerRoad-colum{
  // border:solid peru 1px;
  width:2.272727272727%;
  height:100%;
}
.centerRoad-item{
  width:100%;
  height:16.666666666%;
  // border:rebeccapurple 2px solid;
}
.bottomRoad{
  height:25%;
  /* border: blue solid 2px; */
  right:0;
  bottom:0;
}
.bottomRoad1,.bottomRoad2{
  height:100%;
  // border: solid 2px yellow;
  /* right:30%; */
} 
.bottomRoad-w10{
  width:9%;
  height:100%;
  /* border: solid 2px brown; */
}
.bottomRoad1-column{
  width:5%;
  height:100%;
  // border:red solid 2px;
}
.bottomRoad-item{
  width:100%;
  height:16.6666666666%;
  // border:springgreen solid 2px;
}
/* 共用區 */
.sideWidth{   /*用來統一調整sideRode佔寬比 */
  width:60%;
}
.boundary-bottom{
  border-bottom:1px solid rgba(0, 0, 0, 0.719);
}
.boundary-right{
  border-right:1px solid rgba(0, 0, 0, 0.719);
}

</style>