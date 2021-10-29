<template>
      <!-- BigRoad -->
    <div class="mainRoad d-flex">
      <div class="mainRoad-column d-flex" :class="[`mainRoad-column${index}`,{'bigRoadboundary':index===7}]" v-for="(mc,index) in mainColumn" :key="index">
        <!-- putRoad in here -->
        <div class='mainRoad-item d-flex' v-for="(mr,index) in mainRow" :key="index" :class="[`mainRoad-item${index}`]">
        </div>
      </div>
    </div>
    <div class="main-row position-absolute">
      <div class="mainRoad-row d-flex" v-for="(mr,index) in mainRow" :key="index">
      </div>
    </div>
    <button class="position-absolute" @click="pushRoad">玩玩看</button>
</template>

<script laang="ts">
import {defineComponent} from 'vue'
export default defineComponent({
    setup(){
        //抓取元素要在onmounted或是function中，因為setup在mounted之前，DOM還沒長出來
        //表格
        const mainRow = new Array(6)
        const mainColumn = new Array(8)
        //添加格子
        function pushRoad(){
          let columnCount = 0
          let count = 0
          const watchTimer = setInterval(()=>{
            if(columnCount>6 && count>5){
              clearInterval(timer)
              clearInterval(watchTimer)
            }
          },500)
          const timer = setInterval(()=>{
            //每秒放一個東西進去
            if(count>5){
              columnCount++
              count = 0
            }else if(columnCount>6 && count>5){clearInterval(timer)}
            let element = document.querySelector(`.mainRoad-column${columnCount}`)
            element.children[count].classList.add('tieRoadIcon')   //0 1 2 3 4 5
            count++  //1 2 3 4 5 6
          },1000)
        }
        return {
          //data
          mainRow,mainColumn,
          //methods
          pushRoad,
        }
    },

})
</script>

<style>
.mainRoad{
  width:40%;  /*調整欄寬 */
  height:100%;
  background-color: white;
}
.mainRoad-column{
  border: 1px solid rgba(128, 128, 128, 0.219);
  width:12.5%;
  height: 100%;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.mainRoad-row{
   border: 1px solid rgba(128, 128, 128, 0.219);
   width:100%;
   height:16.6666666%;
   justify-content: space-around;
   border-right: 0px;
}
.main-row{
  width:40%; /*調整欄寬 */
  left:0;
  height:100%;
}
.mainRoad-item{
  width:100%;
  height:16.666666%;
  align-items: center;
  justify-content: center;
}
.bigRoadboundary{
  border-right: solid 1px rgba(0, 0, 0, 0.719);
}
</style>