<template>
      <!-- BeadPlateGrid -->
    <div class="beadPlate d-flex">
      <div class="beadPlateGrid-column d-flex" :class="[{'beadPlateboundary':index===7}]" v-for="(mc,index) in beadPlateColumn" :key="index">
      </div>
    </div>
    <div class="main-row position-absolute">
      <div class="beadPlateGrid-row d-flex" v-for="(mr,index) in beadPlateRow" :key="index">
      </div>
    </div>

    <!-- BeadPlate -->
    <div class="beadPlate-container position-absolute">
      <div class="beadPlatRoadPlace d-flex ">
        <div class="beadPlate-column d-flex" :class="[`beadPlate-column${index}`]" v-for="(mc,index) in beadPlateColumn" :key="index">
          <div class='beadPlate-item d-flex' v-for="(mr,index) in beadPlateRow" :key="index" :class="[`beadPlate-item${index}`]">
            <div></div>
          </div>
        </div>
      </div>
    </div>
    <!-- <button class="position-absolute" @click="resetRoad">重置路圖</button> -->
</template>

<script lang="ts">
import {defineComponent, watch,ref,computed} from 'vue'
import { useRoute } from 'vue-router'
import {useStore} from 'vuex'
import proto from '../../assets/js/bundle'
export default defineComponent({
    setup(){
        //桌號
        const route = useRoute()
        const tableNum = computed(()=>{
          return route.params.tableId
        })
        const beadPlateRow = new Array(6)
        const beadPlateColumn = new Array(8)
        // const gameResult = ref([1])
        const beadPlateColumnCount = ref(0)
        const roadIndex = ref(0)
        const overflowCount = ref(0)
        const isInit = ref(false)
        const store = useStore()
        const timer = ref()
        const asking = ref(false) //是否在問路中
        const beadPlateResult = computed(()=>{
          return store.state.roadmap.map.beadPlate
        })
        const gameEnd = computed(()=>{
            return store.state.dealer.end
        })
        const askRoadArr = computed(()=>{
          return store.state.roadmap.askRoad
        })
        watch(askRoadArr.value,()=>{ //有人問路時，就啟動
          asking.value = true
        //1.先清除計時器
          if(timer.value){   
            clearTimeout(timer.value)
          }
          //2.重置路圖
          resetRoad()
          showRoadInit ()
          //3.放置問路
          let roadNum = askRoadArr.value[askRoadArr.value.length-1]
          askRoad(roadNum)
          //4.添加動畫
          let column = document.querySelector(`.beadPlate-column${beadPlateColumnCount.value}`) as HTMLElement
          let road:HTMLElement
          if(roadIndex.value>0){
           road = column.children[roadIndex.value-1].firstChild as HTMLElement
          }else{
           road = column.children[roadIndex.value].firstChild as HTMLElement
          }
          road.classList.add('askRoadanimation')
          //5.畫完之後等二秒就reset路圖，並重新畫
          timer.value =  setTimeout(()=>{
            resetRoad()
            showRoadInit ()
            road.classList.remove('askRoadanimation')
            asking.value = false
          },2000)
        })
        watch(gameEnd,()=>{  //換薛時要重置
        console.log("換靴重置諸朱盤路")
          resetRoad()
        })
        watch(tableNum,()=>{
          // console.log("換桌豬盤路重置")
          resetRoad()
        })
        watch(beadPlateResult,()=>{ 
          if(asking.value){
            resetRoad()
          }
            if(beadPlateResult.value){
            if(!isInit.value){
              showRoadInit ()
            }else{
              showRoad ()
            }
          }  
        })
        function putRoad(columnNum:number,roadnum:number,gameResult:number){
          let beadPlateCol = document.querySelector(`.beadPlate-column${columnNum}`) as HTMLElement
          let beadPlateColItem = beadPlateCol.children[roadnum].firstChild as HTMLElement
          switch(gameResult){
            case proto.roadmap.Symbol.Banker:
              beadPlateColItem.classList.add('BeadPlate-B')
              break
            case proto.roadmap.Symbol.Player:
              beadPlateColItem.classList.add('BeadPlate-P')
              break
            case proto.roadmap.Symbol.Tie:
              beadPlateColItem.classList.add('BeadPlate-T')
              break
            case proto.roadmap.Symbol.BankerAndBankerPair:
              beadPlateColItem.classList.add('BeadPlate-B-BPair')
              break
            case proto.roadmap.Symbol.BankerAndPlayerPair:
              beadPlateColItem.classList.add('BeadPlate-B-PPair')
              break
            case proto.roadmap.Symbol.BankerAndBothPair:
              beadPlateColItem.classList.add('BeadPlate-B-BothPair')
              break
            case proto.roadmap.Symbol.PlayerAndBankerPair:
              beadPlateColItem.classList.add('BeadPlate-P-BPair')
              break
            case proto.roadmap.Symbol.PlayerAndPlayerPair:
              beadPlateColItem.classList.add('BeadPlate-P-PPair')
              break
            case proto.roadmap.Symbol.PlayerAndBothPair:
              beadPlateColItem.classList.add('BeadPlate-P-BothPair')
              break
            case proto.roadmap.Symbol.TieAndBankerPair:
              beadPlateColItem.classList.add('BeadPlate-T-BPair')
              break
            case proto.roadmap.Symbol.TieAndPlayerPair:
              beadPlateColItem.classList.add('BeadPlate-T-PPair')
              break
            case proto.roadmap.Symbol.TieAndBothPair:
              beadPlateColItem.classList.add('BeadPlate-T-BothPair')
              break
          }
          roadIndex.value++
        }
        function removeAskRoadAnimation(){
          let column = document.querySelector(`.beadPlate-column${beadPlateColumnCount.value}`) as HTMLElement
          let road:HTMLElement
          if(roadIndex.value>0){
           road = column.children[roadIndex.value-1].firstChild as HTMLElement
          }else{
           road = column.children[roadIndex.value].firstChild as HTMLElement
          }
          road.classList.remove('askRoadanimation')
        }
        function askRoad(road:number){
            if(beadPlateColumnCount.value>=beadPlateColumn.length-1 && roadIndex.value>beadPlateRow.length-1){
              addColumn()
            }
            if(roadIndex.value>beadPlateRow.length-1){  //row放滿時
              beadPlateColumnCount.value++
              roadIndex.value = 0
            }
            putRoad(beadPlateColumnCount.value,roadIndex.value,road)
        }
        function showRoadInit () {  //進場前補畫前面的路圖
            beadPlateResult.value.blocks.forEach((i:any,index:number)=>{
              if(beadPlateColumnCount.value>=beadPlateColumn.length-1 && roadIndex.value>beadPlateRow.length-1){
              addColumn()
            }
            if(roadIndex.value>beadPlateRow.length-1){  //row放滿時
              beadPlateColumnCount.value++
              roadIndex.value = 0
            }
            putRoad(beadPlateColumnCount.value,roadIndex.value,i.symbol)
          })
          isInit.value = true
        }
        function showRoad () { //進場後都是畫陣列的最後一顆
            let draw = beadPlateResult.value.blocks.filter((i:any,index:number)=>{
              return index==beadPlateResult.value.blocks.length-1   //返回最後一個
            })
            draw.forEach((i:any)=>{
              if(beadPlateColumnCount.value>=beadPlateColumn.length-1 && roadIndex.value>beadPlateRow.length-1){
              // resetRoad()
              addColumn()
            }
            if(roadIndex.value>beadPlateRow.length-1){  //row放滿時
              beadPlateColumnCount.value++
              roadIndex.value = 0
            }
            putRoad(beadPlateColumnCount.value,roadIndex.value,i.symbol)
            })
        }
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
          //萬全版本:
          //1.直接刪除beadPlatRoadPlace下所有的beadPlate-column
          
          let beadPlatePlace = document.querySelector('.beadPlatRoadPlace') as HTMLElement
          let firstChild = beadPlatePlace.lastElementChild
          while(firstChild){
            beadPlatePlace.removeChild(firstChild); //移除行數
            firstChild = beadPlatePlace.lastElementChild //抓下一個child
          }
          //2.建立新的八條beadPlate-column，記得包beadPlate-item下要再增加一個空div
          for(let i = 0 ;i < beadPlateColumn.length ;i++){
            let col = document.createElement('div')
            col.classList.add('beadPlate-column')
            col.classList.add('d-flex')
            col.classList.add(`beadPlate-column${i}`)
            for(let i = 0 ; i< beadPlateRow.length ; i++){
              let colItem = document.createElement('div')
              let itemDiv = document.createElement('div') 
              colItem.classList.add('beadPlate-item')
              colItem.classList.add('d-flex')
              colItem.classList.add(`beadPlate-item${i}`)
              colItem.appendChild(itemDiv)
              col.appendChild(colItem)
            }
            beadPlatePlace.appendChild(col)
          }
          // for(let i = 0 ; i <beadPlateColumn.length ; i++){  //目前版本只要跑固定8行就好；之後若可以滑動需要跑原本的長度+overflowCount的col
          //   let beadPlateCol = document.querySelector(`.beadPlate-column${i}`) as HTMLElement
          //   beadPlateCol.setAttribute("class",`beadPlate-column${i}`)
          //   for(let i = 0 ; i<beadPlateRow.length ;i++){  //清空col下所有item的class
          //     let checkerboardRoadColItem = beadPlateCol.children[i].firstChild as HTMLElement
          //     checkerboardRoadColItem.setAttribute("class","")
          //   }
          // }
          beadPlateColumnCount.value = 0
          roadIndex.value = 0
          isInit.value = false
        }
        return {
          //data
          beadPlateRow,beadPlateColumn,
          //methods
        //  put,
        resetRoad,
        }
    },

})
</script>