<template>
      <!-- BigRoad -->
    <div class="mainRoad d-flex">
      <div class="mainRoad-column d-flex" :class="[`mainRoad-column${index}`,{'bigRoadboundary':index===7}]" v-for="(mc,index) in mainColumn" :key="index">
        <!-- putRoad in here -->
        <div class='mainRoad-item d-flex' v-for="(mr,index) in mainRow" :key="index" :class="[`mainRoad-item${index}`]">
          <div></div>
        </div>
      </div>
    </div>
    <div class="main-row position-absolute">
      <div class="mainRoad-row d-flex" v-for="(mr,index) in mainRow" :key="index">
      </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, watch,ref,computed} from 'vue'
import {useStore} from 'vuex'
export default defineComponent({
    setup(){
        //抓取元素要在onmounted或是function中，因為setup在mounted之前，DOM還沒長出來
        //表格
        const store = useStore()
        const gameResult = computed(()=>{ //回傳的是陣列
            return store.state.dealer.BroadcastGameResult.results
        })
        const bigRoadColumn = ref(0)
        const roadIndex = ref(0)
        watch(gameResult,()=>{
          gameResult.value.forEach((i:any)=>{
            if(bigRoadColumn.value>6 && roadIndex.value>5){
              resetRoad()
            }
            if(roadIndex.value>5){
              bigRoadColumn.value++
              roadIndex.value = 0
            }
            putRoad(bigRoadColumn.value,roadIndex.value,i)
          })
        })
        const mainRow = new Array(6)
        const mainColumn = new Array(8)
        function resetRoad(){
          for(let i = 0 ; i <8 ; i++){
            let bigRoadColum = document.querySelector(`.mainRoad-column${i}`) as HTMLElement
            for(let i = 0 ; i<6 ;i++){
              let bigRoadColItem = bigRoadColum.children[i].firstChild as HTMLElement
              bigRoadColItem.setAttribute("class","")
            }
          }
          bigRoadColumn.value = 0
          roadIndex.value = 0
        }
        //任意添加格子
        function putRoad(columnNum:number,roadnum:number,gameResult:number){
          let bigRoadColum = document.querySelector(`.mainRoad-column${columnNum}`) as HTMLElement
          let bigRoadColItem = bigRoadColum.children[roadnum].firstChild as HTMLElement
          switch(gameResult){
            case 1:
              bigRoadColItem.classList.add('playerRoadIcon0')
              break
            case 2:
              bigRoadColItem.classList.add('bankerRoadIcon0')
              break
            case 3:
              bigRoadColItem.classList.add('playerRoadIcon2')
              break
            case 4:
              bigRoadColItem.classList.add('tieRoadIcon')
              break
            case 5:
              bigRoadColItem.classList.add('bankerRoadIcon1')
              break
          }
          roadIndex.value++
        }
        return {
          //data
          mainRow,mainColumn,
          //methods
         
        }
    },

})
</script>

<style>
.mainRoad{
  width:40%;  /*調整欄寬 */
  height:100%;
  background-color: white;
  /* overflow: hidden; */
}
.mainRoad-column{
  border: 1px solid rgba(128, 128, 128, 0.219);
  width:12.5%;
  height: 100%;
  flex-direction: column;
  /* justify-content: space-around; */
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