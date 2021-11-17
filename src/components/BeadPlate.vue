<template>
      <!-- BeadPlate -->
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
        const checkerboardRoadColumn = ref(0)
        const roadIndex = ref(0)
        watch(gameResult,()=>{
          showRoad ()
        })
        const mainRow = new Array(6)
        const mainColumn = new Array(8)
        function putRoad(columnNum:number,roadnum:number,gameResult:number){
          let checkerboardRoadCol = document.querySelector(`.mainRoad-column${columnNum}`) as HTMLElement
          let checkerboardRoadColItem = checkerboardRoadCol.children[roadnum].firstChild as HTMLElement
          switch(gameResult){
            case 1:
              checkerboardRoadColItem.classList.add('playerRoadIcon0')
              break
            case 2:
              checkerboardRoadColItem.classList.add('bankerRoadIcon0')
              break
            case 3:
              checkerboardRoadColItem.classList.add('playerRoadIcon2')
              break
            case 4:
              checkerboardRoadColItem.classList.add('tieRoadIcon')
              break
            case 5:
              checkerboardRoadColItem.classList.add('bankerRoadIcon1')
              break
          }
          roadIndex.value++
        }
        function showRoad () {
          gameResult.value.forEach((i:any)=>{
            if(checkerboardRoadColumn.value>6 && roadIndex.value>5){
              resetRoad()
            }
            if(roadIndex.value>5){
              checkerboardRoadColumn.value++
              roadIndex.value = 0
            }
            putRoad(checkerboardRoadColumn.value,roadIndex.value,i)
          })
        }
        function resetRoad(){
          for(let i = 0 ; i <8 ; i++){
            let checkerboardRoadCol = document.querySelector(`.mainRoad-column${i}`) as HTMLElement
            for(let i = 0 ; i<6 ;i++){
              let checkerboardRoadColItem = checkerboardRoadCol.children[i].firstChild as HTMLElement
              checkerboardRoadColItem.setAttribute("class","")
            }
          }
          checkerboardRoadColumn.value = 0
          roadIndex.value = 0
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