<template>
      <!-- BigRoad -->
        <div class="mainRoad">
      <div class="mainRoad-column" :class="`mainRoad-column${index}`" v-for="(mc,index) in mainColumn" :key="index">
        <!-- putRoad in here -->
        <div class='mainRoad-item' v-for="(mr,index) in mainRow" :key="index" :class="[`mainRoad-item${index}`]">
          <i>莊</i>
        </div>
      </div>
    </div>
    <div class="main-row position-absolute">
      <div class="mainROad-row" v-for="(mr,index) in mainRow" :key="index">
      </div>
    </div>
    <button class="try" @click="pushRoad">玩玩看</button>
</template>

<script>
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
            element.children[count].children[0].classList.add('btn-c')   //0 1 2 3 4 5
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
.try{
  position: absolute;
}
.mainRoad{
  width:35%;  /*調整欄寬 */
  height:100%;
  display: flex;
  background-color: white;
}
.mainRoad-column{
  border: 0.5px solid gray;
  width:12.5%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.mainROad-row{
   border: 0.5px solid gray;
   width:100%;
   height:16.6666666%;
   display: flex;
   justify-content: space-around;
}
.main-row{
  width:35%; /*調整欄寬 */
  left:0;
  height:100%;
}
.mainRoad-item{
  width:100%;
  height:16.666666%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>