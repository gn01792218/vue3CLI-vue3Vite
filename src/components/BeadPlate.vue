<template>
      <!-- BeadPlateGrid -->
    <div class="beadPlate d-flex">
      <div class="beadPlate-column d-flex" :class="[{'beadPlateboundary':index===7}]" v-for="(mc,index) in beadPlateColumn" :key="index">
      </div>
    </div>
    <div class="main-row position-absolute">
      <div class="beadPlate-row d-flex" v-for="(mr,index) in beadPlateRow" :key="index">
      </div>
    </div>

    <!-- BeadPlate -->
    <div class="beadPlatRoadPlace d-flex position-absolute">
      <div class="beadPlate-column d-flex" :class="[`beadPlate-column${index}`]" v-for="(mc,index) in beadPlateColumn" :key="index">
        <div class='beadPlate-item d-flex' v-for="(mr,index) in beadPlateRow" :key="index" :class="[`beadPlate-item${index}`]">
          <div></div>
        </div>
      </div>
    </div>
    <!-- <button class="position-absolute" @click="put">放路圖</button> -->
</template>

<script lang="ts">
import {defineComponent, watch,ref,computed} from 'vue'
import {useStore} from 'vuex'
import proto from '../assets/js/bundle'
export default defineComponent({
    setup(){
        //抓取元素要在onmounted或是function中，因為setup在mounted之前，DOM還沒長出來
        //表格
        const beadPlateRow = new Array(6)
        const beadPlateColumn = new Array(8)
        // const gameResult = ref([1])
        const beadPlateColumnCount = ref(0)
        const roadIndex = ref(0)
        const overflowCount = ref(0)
        const store = useStore()
        const beadPlateResult = computed(()=>{
          return store.state.roadmap.map.beadPlate
        })
        watch(beadPlateResult,()=>{
          if(beadPlateResult.value){
            showRoad ()
          }
          console.log("有豬仔路",beadPlateResult.value)
        })
        // function put (){
        //   showRoadByGameResult  ()
        // }
        function putRoad(columnNum:number,roadnum:number,gameResult:number){
          let beadPlateCol = document.querySelector(`.beadPlate-column${columnNum}`) as HTMLElement
          let beadPlateColItem = beadPlateCol.children[roadnum].firstChild as HTMLElement
          switch(gameResult){
            case 1:
              beadPlateColItem.classList.add('bankerRoadIcon0')
              break
            case 2:
              beadPlateColItem.classList.add('playerRoadIcon0')
              break
            case 3:
              beadPlateColItem.classList.add('bankerRoadIcon1')
              break
            case 4:
              beadPlateColItem.classList.add('tieRoadIcon')
              break
            case 5:
              beadPlateColItem.classList.add('playerRoadIcon2')
              break
          }
          roadIndex.value++
        }
        function showRoad () {
            beadPlateResult.value.blocks.forEach((i:any)=>{
            if(beadPlateColumnCount.value>=beadPlateColumn.length-1 && roadIndex.value>beadPlateRow.length-1){
              // resetRoad()
              addColumn()
            }
            if(roadIndex.value>beadPlateRow.length-1){  //row放滿時
              beadPlateColumnCount.value++
              roadIndex.value = 0
            }
            putRoad(beadPlateColumnCount.value,roadIndex.value,i)
          })
        }
        // function showRoadByGameResult () {
        //   gameResult.value.forEach((i:any)=>{
        //     if(beadPlateColumnCount.value>=beadPlateColumn.length-1 && roadIndex.value>beadPlateRow.length-1){
        //       // resetRoad()
        //       addColumn()
        //     }
        //     if(roadIndex.value>beadPlateRow.length-1){  //row放滿時
        //       beadPlateColumnCount.value++
        //       roadIndex.value = 0
        //     }
        //     putRoad(beadPlateColumnCount.value,roadIndex.value,i)
        //   })
        // }
        function addColumn () {  //滿格時一次增加一格的方法
          beadPlateColumnCount.value++
          roadIndex.value = 0
          let beadPlate = document.querySelector('.beadPlatRoadPlace') as HTMLElement  
          let firstChild = beadPlate.firstElementChild as HTMLElement //抓取第一個元素
          beadPlate.removeChild(firstChild) //刪除第一行
          let newCol = document.createElement('div')
          newCol.classList.add('beadPlate-column')
          newCol.classList.add('d-flex')
          newCol.classList.add(`beadPlate-column${beadPlateColumnCount.value}`)
          for(let i = 0 ;i <beadPlateRow.length ;i++){
            let newColItem = document.createElement('div')
            let itemDiv = document.createElement('div')
            newColItem.classList.add('beadPlate-item')
            newColItem.classList.add('d-flex')
            newColItem.classList.add(`beadPlate-item${i}`)
            newColItem.appendChild(itemDiv)
            newCol.appendChild(newColItem)
          }
          //貼上去
          beadPlate.appendChild(newCol)
          overflowCount.value++
        }
        function resetRoad(){ //路圖全部清空，換靴時呼叫
          //還要重置所有col原本的class 
          //使用document.setAttribute("class","")
          for(let i = 0 ; i <beadPlateColumn.length ; i++){
            let beadPlateCol = document.querySelector(`.beadPlate-column${i+overflowCount.value}`) as HTMLElement
            beadPlateCol.setAttribute("class",`beadPlate-column${i}`)
            for(let i = 0 ; i<beadPlateRow.length ;i++){
              let checkerboardRoadColItem = beadPlateCol.children[i].firstChild as HTMLElement
              checkerboardRoadColItem.setAttribute("class","")
            }
          }
          beadPlateColumnCount.value = 0
          roadIndex.value = 0
        }
        return {
          //data
          beadPlateRow,beadPlateColumn,
          //methods
        //  put,
        }
    },

})
</script>

<style>
.beadPlate{
  width:40%;  /*調整欄寬 */
  height:100%;
  background-color: white;
  /* overflow: hidden; */
}
.beadPlatRoadPlace{
  width:40%;
  height:100%;
}
.beadPlate-column{
  border: 1px solid rgba(128, 128, 128, 0.219);
  width:12.5%;
  height: 100%;
  flex-direction: column;
  /* justify-content: space-around; */
  align-items: center;
}
.beadPlate-row{
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
.beadPlate-item{  
  width:100%;
  height:16.666666%;
  align-items: center;
  justify-content: center;
}
.beadPlateboundary{
  border-right: solid 1px rgba(0, 0, 0, 0.719);
}
</style>