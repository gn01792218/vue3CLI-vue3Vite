<template>
  <!-- sideRoadBackgroundGrid -->
    <div class="secRoad d-flex sideWidth">
        <div class="secRoad-column" :class="`secRoad-column${index}`" v-for="(sc,index) in secWidth" :key="index"></div>
    </div>
    <div class="sec-column position-absolute sideWidth">
      <div class="secRoad-row" :class="[{'boundary-bottom':index===5 | index===8}]" v-for="(sr,index) in secHeight" :key="index"></div>
    </div>
    <!-- topRoadGrid -->
    <section class="topRoad d-flex sideWidth position-absolute">
      <div class="topRoad-column" :class="[`topRoad-column${index}`]" v-for="(tc,index) in secWidth" :key="index">
        <div class="tpRoad-item d-flex" :class="[`tpRoad-item${index}`]" v-for="(tci,index) in topHeight" :key="index">
          <i class="btn-bs">閒</i>
        </div>
      </div>
    </section>
    <!-- centerRoad -->
    <section class="centerRoad d-flex sideWidth position-absolute">
      <div class="centerRoad-colum" :class="[`centerRoad-column${index}`]" v-for="(cc,index) in secWidth" :key="index">
        <div class="centerRoad-item" :class="[`centerRoad-item${index}`]" v-for="(cci,index) in bottomHeight" :key="index">
          <i></i>
        </div>
      </div>
    </section>
    <section class="bottomRoad d-flex sideWidth position-absolute">
    <!-- bottom1Grid -->
      <div class="bottomRoad1 d-flex w-50">
        <div class="bottomRoad1-column" :class="[`bottomRoad1-column${index}`,{'boundary-right':index===10}]" v-for="(b1,index) in bottom1width" :key="index">
          <div class="bottomRoad-item" v-for="(bi,index) in bottomHeight" :key="index">
            <i></i>
          </div>
        </div>
      </div>
      <!-- bottom2Grid -->
      <div class="bottomRoad2 d-flex w-50">
        <div class="bottomRoad1-column" :class="[`bottomRoad2-column${index}`]" v-for="(b1,index) in bottom1width" :key="index">
          <div class="bottomRoad-item" v-for="(bi,index) in bottomHeight" :key="index">
            <i></i>
          </div>
        </div>
      </div>
    </section>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
export default defineComponent({
    setup(){
        //抓取元素要在onmounted或是function中，因為setup在mounted之前，DOM還沒長出來
        //表格
        const secWidth = new Array(22)
        const secHeight = new Array(12)
        const topHeight = new Array(6)
        const bottomHeight = new Array(3)
        const bottom1width = new Array(11)
        //添加格子
        function pushRoad(){
          console.log("開始")
          let columnCount = 0
          let count = 0
          const watchTimer = setInterval(()=>{
            if(columnCount>6 && count>5){
              clearInterval(timer)
              clearInterval(watchTimer)
            }
          },500)
          const timer = setInterval(()=>{
            console.log("開始史")
            //每秒放一個東西進去
            if(count>5){
              columnCount++
              count = 0
            }else if(columnCount>6 && count>5){clearInterval(timer)}
            let element = document.querySelector(`.mainRoad-column${columnCount}`)
            element?.children[count].children[0].classList.add('btn-c')   //0 1 2 3 4 5
            count++  //1 2 3 4 5 6
          },1000)
        }
        return {
          //data
          topHeight,secWidth,bottomHeight,secHeight,bottom1width,
          //methods
          pushRoad,
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
.topRoad{
  top:0;
  right:0;
  height:50%;
}
.topRoad-column{
  /* border: 2px solid yellow; */
  width:4.54545454%;  /*調整欄寬 */
  height:100%;
}
.tpRoad-item{
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
  // border:solid peru 2px;
  width:4.5454545454%;
  height:100%;
}
.centerRoad-item{
  width:100%;
  height:33.333333333%;
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
  width:10%;
  height:100%;
  /* border:red solid 2px; */
}
.bottomRoad-item{
  width:100%;
  height:33.333333333%;
  // border:springgreen solid 2px;
}
/* 共用區 */
.sideWidth{   /*用來統一調整sideRode佔寬比 */
  width:65%;
}
.boundary-bottom{
  border-bottom:1px solid rgba(0, 0, 0, 0.719);
}
.boundary-right{
  border-right:1px solid rgba(0, 0, 0, 0.719);
}

</style>