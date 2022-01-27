<template>
    <section class="BigEyesRoad d-flex sideWidth position-absolute">
      <div class="BigEyesRoad-colum" :class="[`BigEyesRoad-colum${index}`]" v-for="(cc,index) in BigEyesRoadWidth" :key="index">
        <div class="BigEyesRoad-item" :class="[`BigEyesRoad-item${index}`]" v-for="(cci,index) in bottomHeight" :key="index">
          <div></div>
        </div>
      </div>
    </section>
    <!-- <button class="position-absolute" @click="testBigEyes(2)">藍圈</button>
    <button class="position-absolute test" @click="testBigEyes(1)">紅圈</button>
    <button class="position-absolute test2" @click="resetBigEyesRoad">重置大眼路</button> -->
</template>

<script lang="ts">
import {defineComponent ,computed , ref , watch , reactive } from 'vue'
import proto from '../../assets/js/bundle'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
export default defineComponent({
  
   setup(){
       //偵測重新連線機制
       window.addEventListener('reConnect',()=>{
        // console.log('重連畫大眼路')
        resetBigEyesRoad()
        showBigEyesRoad ()
      }) 
      //基本資料
        const BigEyesRoadWidth =new Array(44)
        const bottomHeight = new Array(6)
        const bigEyesRoadColumn = ref(0)  //畫到第幾欄
        const bigEyesRoadItemIndex = ref(0) //畫到第幾格
        const currentbigEyesRoadResult = ref(0) //現在是哪個陣營
        const lastbigEyesRoadResult = ref(0) //上次是哪個陣營
        const roadOverFlowerTimes = ref(0) //超出格子幾次
        const bigEyesRoadInit = ref(false) //大路是否初始化過(上桌時)
        const lastbigEyesRoadDataLength = ref(0)
        const lastBigEyesRoadColumnLength = ref(0)
        let bigEyesRoadColArr = reactive<any[]>([]) //大路的Array
        const askRoadtimer = ref() //問路的計時器
        const asking = ref(false) //是否在問路中
        const addBigEyesRoadColumnCount = ref(0)
        for(let i = 0 ; i < BigEyesRoadWidth.length ; i++){  //初始化大路陣列
          bigEyesRoadColArr.push([0,0,0,0,0,0])
        }
      //vuex
        const store = useStore()
        const route = useRoute()
        const bigEyesRoadResult = computed(()=>{
          return store.state.roadmap.map.bigEyeRoad
        })
        const gameEnd = computed(()=>{
            return store.state.dealer.end
        })
        const tableNum = computed(()=>{
          return route.params.tableId
        })
        const askRoadRecall = computed(()=>{
          return store.state.roadmap.askRoadReCall
        })
        watch(askRoadRecall,()=>{
            asking.value = true
          //1.先清除計時器
          if(askRoadtimer.value){   
            clearTimeout(askRoadtimer.value)
          }
          //2.重置路圖
          resetBigEyesRoad()
          showBigEyesRoadInit()
          //3.放置問路
          let roadNum = askRoadRecall.value.bigEyeRoadNext.symbol
          askRoad(roadNum)
          //4.添加動畫
          let column = document.querySelector(`.BigEyesRoad-colum${bigEyesRoadColumn.value}`) as HTMLElement
          let road:HTMLElement
          if(bigEyesRoadItemIndex.value>0){
           road = column.children[bigEyesRoadItemIndex.value-1].firstChild as HTMLElement
          }else{
           road = column.children[bigEyesRoadItemIndex.value].firstChild as HTMLElement
          }
          road.classList.add('askRoadanimation')
          //5.畫完之後等二秒就reset路圖，並重新畫
          askRoadtimer.value =  setTimeout(()=>{
            resetBigEyesRoad()
            showBigEyesRoadInit()
            road.classList.remove('askRoadanimation')
            asking.value = false
            // store.commit('roadmap/resetBigEyeRoadAsk')
          },2000)
        })
        watch(gameEnd,()=>{
          //換靴時要重置遊戲
          // console.log("偵測到換靴資訊重置路圖-大眼路")
          resetBigEyesRoad()
        })
        watch(tableNum,()=>{
          // console.log("換桌-重置大眼路")
          resetBigEyesRoad()
        })
        watch(bigEyesRoadResult,()=>{
          // console.log("偵測到大眼路")
          if(asking.value){
            resetBigEyesRoad()
          }
            if(bigEyesRoadResult.value.columns[0].blocks.length>0){
            if(bigEyesRoadInit.value){
              showBigEyesRoad()
            }else{
              showBigEyesRoadInit()
            }
          }
        })
      //function
      function recordRoad (gameResult:number){
          switch(gameResult){
              case 1:
                currentbigEyesRoadResult.value = 1   
                break
              case 2:
                currentbigEyesRoadResult.value = 2   
                break
            }
      }
      function putBigEyesRoad(gameResult:number){
        let RoadCol = document.querySelector(`.BigEyesRoad-colum${bigEyesRoadColumn.value}`) as HTMLElement
        let RoadColItem = RoadCol.children[bigEyesRoadItemIndex.value].firstChild as HTMLElement
        switch(gameResult){
          case 1:
            RoadColItem.classList.add('bigEye-red')
            break
          case 2:
            RoadColItem.classList.add('bigEye-blue')
            break
        } 
        bigEyesRoadColArr[bigEyesRoadColumn.value][bigEyesRoadItemIndex.value] = 1  //代表那一格已經畫過了
        bigEyesRoadItemIndex.value ++  //增加當前的index
        lastbigEyesRoadResult.value = currentbigEyesRoadResult.value //將這次陣營記錄到下一次的陣營中
        lastbigEyesRoadDataLength.value = bigEyesRoadResult.value.columns[bigEyesRoadResult.value.columns.length-1].blocks.length  //將這次的最後一個columns的blocks的長度紀錄起來
        lastBigEyesRoadColumnLength.value = bigEyesRoadResult.value.columns.length
            // console.log("現在是第",bigEyesRoadColumn.value,"行；","下一格格子",bigEyesRoadItemIndex.value)
      }
      function removeAskRoadAnimation(){
        let column = document.querySelector(`.BigEyesRoad-colum${bigEyesRoadColumn.value}`) as HTMLElement
          let road:HTMLElement
          if(bigEyesRoadItemIndex.value>0){
           road = column.children[bigEyesRoadItemIndex.value-1].firstChild as HTMLElement
          }else{
           road = column.children[bigEyesRoadItemIndex.value].firstChild as HTMLElement
          }
          road.classList.remove('askRoadanimation')
      }
      function askRoad(roadNum:number){
        //每次都畫最後一顆
          // console.log('畫大眼露')
        recordRoad(roadNum)
        if(currentbigEyesRoadResult.value!==lastbigEyesRoadResult.value && currentbigEyesRoadResult.value!==0 && lastbigEyesRoadResult.value!==0){
              // console.log("換陣營前","行",bigEyesRoadColumn.value,"格",bigEyesRoadItemIndex.value)
              if(roadOverFlowerTimes.value!=0){ //第一次恢復的時候
                if(bigEyesRoadItemIndex.value-1<1){  //因為上一次已經被+過了，要減回來
                  bigEyesRoadColumn.value++
                  // console.log("在第0格滿出，直接+行數","行",bigEyesRoadColumn.value)
                  roadOverFlowerTimes.value = 0
                }else{
                  bigEyesRoadColumn.value = bigEyesRoadColumn.value-roadOverFlowerTimes.value+1
                  roadOverFlowerTimes.value = 0
                }
                // console.log("溢出後恢復","行",bigEyesRoadColumn.value)
              }else{
                bigEyesRoadColumn.value++
              }
              if(bigEyesRoadColumn.value>=BigEyesRoadWidth.length+(bigEyesRoadColArr.length-BigEyesRoadWidth.length)){ //溢出極限格子的時候要增加行數
                // console.log("滿了+行")
                addBigEyesRoadColumn()
              }  
               bigEyesRoadItemIndex.value = 0
              //  console.log("格",bigEyesRoadItemIndex.value)
            }
            //換行二:溢出換行
            //當下一次溢出大於前一次溢出時，bigRoadItemIndex.value要再-1
            //溢出時如果遇到和局，其實不需要+行?!
            if(bigEyesRoadColArr[bigEyesRoadColumn.value][bigEyesRoadItemIndex.value]!==0 || bigEyesRoadItemIndex.value>5){
              // console.log("連贏溢出")
              bigEyesRoadColumn.value++ //換行
              //和局時不會進下面的addBigRoad
              if(bigEyesRoadColumn.value>=BigEyesRoadWidth.length+(bigEyesRoadColArr.length-BigEyesRoadWidth.length)){  //不可以固定監測22，因為+了格子之後總行數也變多，必須+一個"增加的行數"
                 addBigEyesRoadColumn()
              }  //溢出極限格子的時候要增加行數
              if(bigEyesRoadItemIndex.value>0){ //在第0格以上才要-1
                bigEyesRoadItemIndex.value = bigEyesRoadItemIndex.value-1
              }
              roadOverFlowerTimes.value++ 
              // console.log("連贏溢出","行",bigEyesRoadColumn.value,"格",bigEyesRoadItemIndex.value,"溢出次數",roadOverFlowerTimes.value)
                  for(let i = bigEyesRoadItemIndex.value ; i < 6 ; i++ ){  //只有溢出時才要這麼做:把溢出當格以下的格子都變成1
                    bigEyesRoadColArr[bigEyesRoadColumn.value][i] = 1
                  }
            }
            putBigEyesRoad(roadNum)
      }
      function showBigEyesRoad(){
        //每次都畫最後一顆
        // console.log('大眼露','上一次的長度',lastbigEyesRoadDataLength.value,'當前的長度',bigEyesRoadResult.value.columns[bigEyesRoadResult.value.columns.length-1].blocks.length)
        if(lastBigEyesRoadColumnLength.value==bigEyesRoadResult.value.columns.length && lastbigEyesRoadDataLength.value==bigEyesRoadResult.value.columns[bigEyesRoadResult.value.columns.length-1].blocks.length){
          return
        }else{
          // console.log('畫大眼露')
          let item = bigEyesRoadResult.value.columns[bigEyesRoadResult.value.columns.length-1].blocks[bigEyesRoadResult.value.columns[bigEyesRoadResult.value.columns.length-1].blocks.length-1]
          recordRoad(item.symbol)
          if(currentbigEyesRoadResult.value!==lastbigEyesRoadResult.value && currentbigEyesRoadResult.value!==0 && lastbigEyesRoadResult.value!==0){
              // console.log("換陣營前","行",bigEyesRoadColumn.value,"格",bigEyesRoadItemIndex.value)
              if(roadOverFlowerTimes.value!=0){ //第一次恢復的時候
                if(bigEyesRoadItemIndex.value-1<1){  //因為上一次已經被+過了，要減回來
                  bigEyesRoadColumn.value++
                  // console.log("在第0格滿出，直接+行數","行",bigEyesRoadColumn.value)
                  roadOverFlowerTimes.value = 0
                }else{
                  bigEyesRoadColumn.value = bigEyesRoadColumn.value-roadOverFlowerTimes.value+1
                  roadOverFlowerTimes.value = 0
                }
                // console.log("溢出後恢復","行",bigEyesRoadColumn.value)
              }else{
                bigEyesRoadColumn.value++
              }
              if(bigEyesRoadColumn.value>=BigEyesRoadWidth.length+(bigEyesRoadColArr.length-BigEyesRoadWidth.length)){ //溢出極限格子的時候要增加行數
                // console.log("滿了+行")
                addBigEyesRoadColumn()
              }  
               bigEyesRoadItemIndex.value = 0
              //  console.log("格",bigEyesRoadItemIndex.value)
            }
            //換行二:溢出換行
            //當下一次溢出大於前一次溢出時，bigRoadItemIndex.value要再-1
            //溢出時如果遇到和局，其實不需要+行?!
            if(bigEyesRoadColArr[bigEyesRoadColumn.value][bigEyesRoadItemIndex.value]!==0 || bigEyesRoadItemIndex.value>5){
              // console.log("連贏溢出")
              bigEyesRoadColumn.value++ //換行
              //和局時不會進下面的addBigRoad
              if(bigEyesRoadColumn.value>=BigEyesRoadWidth.length+(bigEyesRoadColArr.length-BigEyesRoadWidth.length)){  //不可以固定監測22，因為+了格子之後總行數也變多，必須+一個"增加的行數"
                 addBigEyesRoadColumn()
              }  //溢出極限格子的時候要增加行數
              if(bigEyesRoadItemIndex.value>0){ //在第0格以上才要-1
                bigEyesRoadItemIndex.value = bigEyesRoadItemIndex.value-1
              }
              roadOverFlowerTimes.value++ 
              // console.log("連贏溢出","行",bigEyesRoadColumn.value,"格",bigEyesRoadItemIndex.value,"溢出次數",roadOverFlowerTimes.value)
                  for(let i = bigEyesRoadItemIndex.value ; i < 6 ; i++ ){  //只有溢出時才要這麼做:把溢出當格以下的格子都變成1
                    bigEyesRoadColArr[bigEyesRoadColumn.value][i] = 1
                  }
            }
            putBigEyesRoad(item.symbol)
        }
      }
      function showBigEyesRoadInit(){
        //第一次全畫
        bigEyesRoadResult.value.columns.forEach((item:any)=>{
          item.blocks.forEach((i:any)=>{
            // console.log(i)
          recordRoad(i.symbol)
        if(currentbigEyesRoadResult.value!==lastbigEyesRoadResult.value && currentbigEyesRoadResult.value!==0 && lastbigEyesRoadResult.value!==0){
              // console.log("換陣營前","行",bigEyesRoadColumn.value,"格",bigEyesRoadItemIndex.value)
              if(roadOverFlowerTimes.value!=0){ //第一次恢復的時候
                if(bigEyesRoadItemIndex.value-1<1){  //因為上一次已經被+過了，要減回來
                  bigEyesRoadColumn.value++
                  // console.log("在第0格滿出，直接+行數","行",bigEyesRoadColumn.value)
                  roadOverFlowerTimes.value = 0
                }else{
                  bigEyesRoadColumn.value = bigEyesRoadColumn.value-roadOverFlowerTimes.value+1
                  roadOverFlowerTimes.value = 0
                }
                // console.log("溢出後恢復","行",bigEyesRoadColumn.value)
              }else{
                bigEyesRoadColumn.value++
              }
              if(bigEyesRoadColumn.value>=BigEyesRoadWidth.length+(bigEyesRoadColArr.length-BigEyesRoadWidth.length)){ //溢出極限格子的時候要增加行數
                // console.log("滿了+行")
                addBigEyesRoadColumn()
              }  
               bigEyesRoadItemIndex.value = 0
              //  console.log("格",bigEyesRoadItemIndex.value)
            }
            //換行二:溢出換行
            //當下一次溢出大於前一次溢出時，ItemIndex.value要再-1
            //溢出時如果遇到和局，其實不需要+行?!
            if(bigEyesRoadColArr[bigEyesRoadColumn.value][bigEyesRoadItemIndex.value]!==0 || bigEyesRoadItemIndex.value>5){
              // console.log("連贏溢出")
              bigEyesRoadColumn.value++ //換行
              //和局時不會進下面的addBigRoad
              if(bigEyesRoadColumn.value>=BigEyesRoadWidth.length+(bigEyesRoadColArr.length-BigEyesRoadWidth.length)){  //不可以固定監測22，因為+了格子之後總行數也變多，必須+一個"增加的行數"
                 addBigEyesRoadColumn()
              }  //溢出極限格子的時候要增加行數
              if(bigEyesRoadItemIndex.value>0){ //在第0格以上才要-1
                bigEyesRoadItemIndex.value = bigEyesRoadItemIndex.value-1
              }
              roadOverFlowerTimes.value++ 
              // console.log("連贏溢出","行",bigEyesRoadColumn.value,"格",bigEyesRoadItemIndex.value,"溢出次數",roadOverFlowerTimes.value)
                  for(let i = bigEyesRoadItemIndex.value ; i < 6 ; i++ ){  //只有溢出時才要這麼做:把溢出當格以下的格子都變成1
                    bigEyesRoadColArr[bigEyesRoadColumn.value][i] = 1
                  }
            }
            putBigEyesRoad(i.symbol)
          })
        })
        bigEyesRoadInit.value = true
      }
      function resetBigEyesRoad(){
        console.log('重置大眼路')
        //1.直接刪除所有column
          let RoadColContainer = document.querySelector('.BigEyesRoad') as HTMLElement
          let lastChild = RoadColContainer.lastElementChild
          // console.log('富元素',RoadColContainer,'子元素',lastChild)
          while(lastChild){
            RoadColContainer.removeChild(lastChild); //移除行數
            lastChild  = RoadColContainer.lastElementChild //抓下一個child
            // console.log('刪除子元素')
          }
          //2.建立新的四十四條col
          for(let i = 0 ;i < BigEyesRoadWidth.length ;i++){
            let col = document.createElement('div')
            col.classList.add('BigEyesRoad-colum')
            col.classList.add('d-flex')
            col.classList.add(`BigEyesRoad-colum${i}`)
            for(let i = 0 ; i< bottomHeight.length ; i++){
              let colItem = document.createElement('div')
              let itemDiv = document.createElement('div') 
              colItem.classList.add('BigEyesRoad-item')
              colItem.classList.add('d-flex')
              colItem.classList.add(`BigEyesRoad-item${i}`)
              colItem.appendChild(itemDiv)
              col.appendChild(colItem)
            }
            RoadColContainer.appendChild(col)
          }
          //3.計數器規0
          bigEyesRoadColumn.value = 0
          bigEyesRoadItemIndex.value = 0
          currentbigEyesRoadResult.value = 0
          lastbigEyesRoadResult.value = 0
          roadOverFlowerTimes.value = 0
          addBigEyesRoadColumnCount.value = 0
          //大路陣列也要規0
          let newArr = []
          for(let i = 0 ; i < BigEyesRoadWidth.length ; i++){  //初始化大路陣列
            newArr [i] = [0,0,0,0,0,0]
          }
          bigEyesRoadColArr = newArr
          bigEyesRoadInit.value = false
      }
      function addBigEyesRoadColumn(){
        let Road = document.querySelector('.BigEyesRoad') as HTMLElement  
          let firstChild = Road.firstElementChild as HTMLElement //抓取第一個元素
          Road.removeChild(firstChild) //刪除第一行
          let newCol = document.createElement('div')
          newCol.classList.add('BigEyesRoad-colum')
          newCol.classList.add(`BigEyesRoad-colum${bigEyesRoadColumn.value}`)
          for(let i = 0 ;i <bottomHeight.length ;i++){
            let newColItem = document.createElement('div')
            let itemDiv = document.createElement('div')
            newColItem.classList.add('BigEyesRoad-item')
            newColItem.classList.add('d-flex')
            newColItem.classList.add(`BigEyesRoad-item${i}`)
            newColItem.appendChild(itemDiv)
            newCol.appendChild(newColItem)
          }
          //貼上去
          Road.appendChild(newCol)
          //記得也要增加Arr
          bigEyesRoadColArr.push([0,0,0,0,0,0])
          // console.log("加了一行","行",bigEyesRoadColumn.value)
          addBigEyesRoadColumnCount.value++
          // roadOverFlowerTimes.value++
      }
      function testBigEyes(num:number){
        recordRoad(num)
        if(currentbigEyesRoadResult.value!==lastbigEyesRoadResult.value && currentbigEyesRoadResult.value!==0 && lastbigEyesRoadResult.value!==0){
              // console.log("換陣營前","行",bigEyesRoadColumn.value,"格",bigEyesRoadItemIndex.value)
              if(roadOverFlowerTimes.value!=0){ //第一次恢復的時候
                if(bigEyesRoadItemIndex.value-1<1){  //因為上一次已經被+過了，要減回來
                  bigEyesRoadColumn.value++
                  // console.log("在第0格滿出，直接+行數","行",bigEyesRoadColumn.value)
                  roadOverFlowerTimes.value = 0
                }else{
                  bigEyesRoadColumn.value = bigEyesRoadColumn.value-roadOverFlowerTimes.value+1
                  roadOverFlowerTimes.value = 0
                }
                // console.log("溢出後恢復","行",bigEyesRoadColumn.value)
              }else{
                bigEyesRoadColumn.value++
              }
              if(bigEyesRoadColumn.value>=BigEyesRoadWidth.length+(bigEyesRoadColArr.length-BigEyesRoadWidth.length)){ //溢出極限格子的時候要增加行數
                // console.log("滿了+行")
                addBigEyesRoadColumn()
              }  
               bigEyesRoadItemIndex.value = 0
              //  console.log("格",bigEyesRoadItemIndex.value)
            }
            //換行二:溢出換行
            //當下一次溢出大於前一次溢出時，bigRoadItemIndex.value要再-1
            //溢出時如果遇到和局，其實不需要+行?!
            if(bigEyesRoadColArr[bigEyesRoadColumn.value][bigEyesRoadItemIndex.value]!==0 || bigEyesRoadItemIndex.value>5){
              // console.log("連贏溢出")
              bigEyesRoadColumn.value++ //換行
              //和局時不會進下面的addBigRoad
              if(bigEyesRoadColumn.value>=BigEyesRoadWidth.length+(bigEyesRoadColArr.length-BigEyesRoadWidth.length)){  //不可以固定監測22，因為+了格子之後總行數也變多，必須+一個"增加的行數"
                 addBigEyesRoadColumn()
              }  //溢出極限格子的時候要增加行數
              if(bigEyesRoadItemIndex.value>0){ //在第0格以上才要-1
                bigEyesRoadItemIndex.value = bigEyesRoadItemIndex.value-1
              }
              roadOverFlowerTimes.value++ 
              // console.log("連贏溢出","行",bigEyesRoadColumn.value,"格",bigEyesRoadItemIndex.value,"溢出次數",roadOverFlowerTimes.value)
                  for(let i = bigEyesRoadItemIndex.value ; i < 6 ; i++ ){  //只有溢出時才要這麼做:把溢出當格以下的格子都變成1
                    bigEyesRoadColArr[bigEyesRoadColumn.value][i] = 1
                  }
            }
            putBigEyesRoad(num)
      }
        return {
            //data
            BigEyesRoadWidth,
            bottomHeight,
            //methods
            testBigEyes,
            resetBigEyesRoad,
        }
    }
})
</script>
<style scoped>
  .test{
    left:0%;
  }
  .test2{
    left:20%;
  }
</style>