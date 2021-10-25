<template>
  <!-- sideRoadBackgroundGrid -->
    <div class="secRoad sideWidth">
        <div class="secRoad-column" :class="`secRoad-column${index}`" v-for="(sc,index) in secWidth" :key="index"></div>
    </div>
    <div class="sec-column position-absolute sideWidth">
      <div class="secRoad-row" :class="[{'boundary-bottom':index===5}]" v-for="(sr,index) in secHeight" :key="index"></div>
    </div>
    <!-- topRoadGrid -->
    <div class="topRoad sideWidth">
      <div class="topRoad-column" :class="[`topRoad-column${index}`]" v-for="(tc,index) in secWidth" :key="index">
        <div class="tpRoad-item" :class="[`tpRoad-item${index}`]" v-for="(tci,index) in topHeight" :key="index">
          <i class="btn-bs">閒</i>
        </div>
      </div>
    </div>
    <div class="bottomRoad sideWidth position-absolute">
       <!-- bottom1Grid -->
      <div class="bottomRoad-w45 bottomFlex">
        <div class="bottomRoad1-column" :class="[`bottomRoad1-column${index}`,{'boundary-right':index===9}]" v-for="(b1,index) in bottom1width" :key="index">
          <div class="bottomRoad-item" v-for="(bi,index) in bottomHeight" :key="index">
            <i></i>
          </div>
        </div>
      </div>
      <!-- bottom2Grid -->
      <div class="bottomRoad-w45 bottomFlex">
        <div class="bottomRoad1-column" :class="[`bottomRoad2-column${index}`,{'boundary-right':index===9}]" v-for="(b1,index) in bottom1width" :key="index">
          <div class="bottomRoad-item" v-for="(bi,index) in bottomHeight" :key="index">
            <i></i>
          </div>
        </div>
      </div>
      <!-- bottom3Grid -->
      <div class="bottomRoad-w10 bottomFlex">
        <div class="bottomRoad3-column" v-for="(b1,index) in bottom3width" :key="index">
          <div class="bottomRoad-item" v-for="(bi,index) in bottomHeight" :key="index">
            <i></i>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import {defineComponent} from 'vue'
export default defineComponent({
    setup(){
        //抓取元素要在onmounted或是function中，因為setup在mounted之前，DOM還沒長出來
        //表格
        const secWidth = new Array(22)
        const secHeight = new Array(9)
        const topHeight = new Array(6)
        const bottomHeight = new Array(3)
        const bottom1width = new Array(10)
        const bottom3width = new Array(2)
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
            element.children[count].children[0].classList.add('btn-c')   //0 1 2 3 4 5
            count++  //1 2 3 4 5 6
          },1000)
        }
        return {
          //data
          topHeight,secWidth,bottomHeight,secHeight,bottom1width,bottom3width,
          //methods
          pushRoad,
        }
    },
})
</script>

<style>
/* 背景格子 */
.secRoad{
  height:100%;
  display: flex;
  background-color: white;
}
.secRoad-column{
  border: 1px solid gray;
  width:4.54545454%; /*調整欄寬 */
  height: 100%;
}
.sec-column{
  right:0;
  height:100%;
}
.secRoad-row{
  height:11.1111111%;
  width:100%;
  border: 1px solid gray;
}

/* 放置四種路圖的格子 */
.topRoad{
  position: absolute;
  top:0;
  right:0;
  height:66%;
  display: flex;
}
.topRoad-column{
  /* border: 2px solid yellow; */
  width:4.54545454%;  /*調整欄寬 */
  height:100%;
}
.tpRoad-item{
  /* border: blue solid 1px; */
  height:16.6666666%;
}
.bottomRoad{
  display: flex;
  height:33.3333333%;
  /* border: blue solid 2px; */
  right:0;
  bottom:0;
}
.bottomRoad-w45{
  width:45.4545454545%;
  height:100%;
  /* border: solid 2px yellow; */
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
  /* border:springgreen solid 2px; */
}
.bottomRoad3-column{
  width:50%;
  height:100%;
  /* border:red solid 2px; */
}
/* 共用區 */
.sideWidth{   /*用來統一調整sideRode佔寬比 */
  width:65%;
}
.bottomFlex{
  display: flex;
}
.boundary-bottom{
  border-bottom:2px solid gray;
}
.boundary-right{
  border-right:2px solid gray;
}
</style>