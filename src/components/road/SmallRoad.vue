<template>
    <div class="smallRoad d-flex w-50">
        <div class="smallRoad-column" :class="[`smallRoad-column${index}`,{'boundary-right':index===21}]" v-for="(b1,index) in bottom1width" :key="index">
          <div class="smallRoad-item" v-for="(bi,index) in bottomHeight" :key="index">
            <div></div>
          </div>
        </div>
    </div>
    <!-- <button class='position-absolute' @click="resetSmallRoad">重置小路</button> -->
</template>

<script lang="ts">
import {defineComponent,computed,ref, watch, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
export default defineComponent({
   setup(){
       //基本資料
        const bottomHeight = new Array(6)
        const bottom1width = new Array(22)
        const smallRoadColumn = ref(0)  //畫到第幾欄
        const smallRoadItemIndex = ref(0) //畫到第幾格
        const currentsmallRoadResult = ref(0) //現在是哪個陣營
        const lastsmallRoadResult = ref(0) //上次是哪個陣營
        const roadOverFlowerTimes = ref(0) //超出格子幾次
        const smallRoadInit = ref(false) //大路是否初始化過(上桌時)
        const lastSmallRoadDataLength = ref(0)
        const lastSmallDataColumnLength = ref(0)
        let smallRoadColArr = reactive<any[]>([]) //大路的Array
        const askRoadtimer = ref() //問路的計時器
        const asking = ref(false) //是否在問路中
        const addsmallRoadColumnCount = ref(0)
        for(let i = 0 ; i < bottom1width.length ; i++){  //初始化大路陣列
          smallRoadColArr.push([0,0,0,0,0,0])
        }
       //路由
       const route = useRoute()
       const tableNum = computed(()=>{
          return route.params.tableId
        })
       //vuex
        const store = useStore()
        const gameEnd = computed(()=>{
            return store.state.dealer.end
        })
        const smallRoadResult = computed(()=>{
          return store.state.roadmap.map.smallRoad
        })
        const askRoadRecall = computed(()=>{
          return store.state.roadmap.askRoadReCall
        })
        //監聽
        watch(askRoadRecall,()=>{
            asking.value = true
          //1.先清除計時器
          if(askRoadtimer.value){   
            clearTimeout(askRoadtimer.value)
          }
          //2.重置路圖
          resetSmallRoad()
          showSmallRoadInit()
          //3.放置問路
          let roadNum = askRoadRecall.value.smallRoadNext
          askRoad(roadNum)
          //4.添加動畫
          let column = document.querySelector(`.smallRoad-column${smallRoadColumn.value}`) as HTMLElement
          let road:HTMLElement
          if(smallRoadItemIndex.value>0){
           road = column.children[smallRoadItemIndex.value-1].firstChild as HTMLElement
          }else{
           road = column.children[smallRoadItemIndex.value].firstChild as HTMLElement
          }
          road.classList.add('askRoadanimation')
          //5.畫完之後等二秒就reset路圖，並重新畫
          askRoadtimer.value =  setTimeout(()=>{
            resetSmallRoad()
            showSmallRoadInit()
            road.classList.remove('askRoadanimation')
            asking.value = false
            // store.commit('roadmap/resetBigEyeRoadAsk')
          },2000)
        })
        watch(gameEnd,()=>{
          //換薛時要重置遊戲
          console.log("偵測到換靴資訊重置路圖-小路")
          resetSmallRoad()
        })
        watch(tableNum,()=>{
          console.log("換桌-重置小路")
          resetSmallRoad()
        })
        watch(smallRoadResult,()=>{
          // console.log("偵測到小路",smallRoadResult.value)
            if(asking.value){
              resetSmallRoad()
            }
            if(smallRoadResult.value.columns[0].blocks.length>0){
            if(smallRoadInit.value){
              showSmallRoad()
            }else{
              showSmallRoadInit()
            }
          }
        })
        function removeAskRoadAnimation(){
          let column = document.querySelector(`.smallRoad-column${smallRoadColumn.value}`) as HTMLElement
          let road:HTMLElement
          if(smallRoadItemIndex.value>0){
           road = column.children[smallRoadItemIndex.value-1].firstChild as HTMLElement
          }else{
           road = column.children[smallRoadItemIndex.value].firstChild as HTMLElement
          }
          road.classList.remove('askRoadanimation')
        }
        function askRoad(roadNum:number){
          recordRoad(roadNum)
            if(currentsmallRoadResult.value!==lastsmallRoadResult.value && currentsmallRoadResult.value!==0 && lastsmallRoadResult.value!==0){
                // console.log("換陣營前","行",bigRoadColumn.value,"格",bigRoadItemIndex.value)
                if(roadOverFlowerTimes.value!=0){ //第一次恢復的時候
                    if(smallRoadItemIndex.value-1<1){  //因為上一次已經被+過了，要減回來
                    smallRoadColumn.value++
                    // console.log("在第0格滿出，直接+行數","行",smallRoadColumn.value)
                    roadOverFlowerTimes.value = 0
                    }else{
                    smallRoadColumn.value = smallRoadColumn.value-roadOverFlowerTimes.value+1
                    roadOverFlowerTimes.value = 0
                    }
                    // console.log("溢出後恢復","行",smallRoadColumn.value)
                }else{
                    smallRoadColumn.value++
                }
                if(smallRoadColumn.value>=bottom1width.length+(smallRoadColArr.length-bottom1width.length)){ //溢出極限格子的時候要增加行數
                    // console.log("滿了+行")
                    addSmallRoadColumn()
                }  
                smallRoadItemIndex.value = 0
                // console.log("格",smallRoadItemIndex.value)
                }
                //換行二:溢出換行
                //當下一次溢出大於前一次溢出時，bigRoadItemIndex.value要再-1
                //溢出時如果遇到和局，其實不需要+行?!
                if(smallRoadColArr[smallRoadColumn.value][smallRoadItemIndex.value]!==0 || smallRoadItemIndex.value>5){
                // console.log("連贏溢出")
                 smallRoadColumn.value++ //換行
                //和局時不會進下面的addBigRoad
                if(smallRoadColumn.value>=bottom1width.length+(smallRoadColArr.length-bottom1width.length)){  //不可以固定監測22，因為+了格子之後總行數也變多，必須+一個"增加的行數"
                    addSmallRoadColumn()
                }  //溢出極限格子的時候要增加行數
                if(smallRoadItemIndex.value>0){ //在第0格以上才要-1
                    smallRoadItemIndex.value = smallRoadItemIndex.value-1
                }
                roadOverFlowerTimes.value++ 
                // console.log("連贏溢出","行",smallRoadColumn.value,"格",smallRoadItemIndex.value,"溢出次數",roadOverFlowerTimes.value)
                    for(let i = smallRoadItemIndex.value ; i < 6 ; i++ ){  //只有溢出時才要這麼做:把溢出當格以下的格子都變成1
                        smallRoadColArr[smallRoadColumn.value][i] = 1
                    }
                }
                putRoad(roadNum)
        }
        function recordRoad (gameResult:number){
          switch(gameResult){
              case 1:
                currentsmallRoadResult.value = 1   
                break
              case 2:
                currentsmallRoadResult.value = 2   
                break
            }
        }
        function putRoad(gameResult:number){
         let RoadCol = document.querySelector(`.smallRoad-column${smallRoadColumn.value}`) as HTMLElement
        //  console.log(RoadCol)
            let bigRoadColItem = RoadCol.children[smallRoadItemIndex.value].firstChild as HTMLElement
            switch(gameResult){
            case 1:
              bigRoadColItem.classList.add('small-red')
              break
            case 2:
              bigRoadColItem.classList.add('small-blue')
              break
            }
            smallRoadColArr[smallRoadColumn.value][smallRoadItemIndex.value] = 1  //代表那一格已經畫過了
            smallRoadItemIndex.value ++  //增加當前的index
            lastsmallRoadResult.value = currentsmallRoadResult.value //將這次陣營記錄到下一次的陣營中
            lastSmallRoadDataLength.value = smallRoadResult.value.columns[smallRoadResult.value.columns.length-1].blocks.length
            lastSmallDataColumnLength.value = smallRoadResult.value.columns.length
            // console.log("現在是第",bigRoadColumn.value,"行；","下一格格子",bigRoadItemIndex.value)
        }
        function addSmallRoadColumn(){
          let Road = document.querySelector('.smallRoad') as HTMLElement  
          let preRoad = document.querySelector(`.smallRoad-column${smallRoadColumn.value-1}`) as HTMLElement
          let firstChild = Road.firstElementChild as HTMLElement //抓取第一個元素
          Road.removeChild(firstChild) //刪除第一行
          let newCol = document.createElement('div')
          newCol.classList.add('smallRoad-column')
          newCol.classList.add(`smallRoad-column${smallRoadColumn.value}`)
          newCol.classList.add('boundary-right')
          preRoad?.classList.remove('boundary-right')
          for(let i = 0 ;i <bottomHeight.length ;i++){
            let newColItem = document.createElement('div')
            let itemDiv = document.createElement('div')
            newColItem.classList.add('smallRoad-item')
            newColItem.classList.add('d-flex')
            newColItem.classList.add(`smallRoad-item${i}`)
            newColItem.appendChild(itemDiv)
            newCol.appendChild(newColItem)
          }
          //貼上去
          Road.appendChild(newCol)
          //記得也要增加bigRoadArr
          smallRoadColArr.push([0,0,0,0,0,0])
          // console.log("加了一行","行",bigRoadColumn.value)
          addsmallRoadColumnCount.value++
          // roadOverFlowerTimes.value++
        }
        function resetSmallRoad(){
            //1.直接刪除所有column
          let RoadColContainer = document.querySelector('.smallRoad') as HTMLElement
          let lastChild = RoadColContainer.lastElementChild
          while(lastChild ){
            RoadColContainer.removeChild(lastChild); //移除行數
            lastChild  = RoadColContainer.lastElementChild //抓下一個child
          }
          //2.建立新的二十二條col
          for(let i = 0 ;i < bottom1width.length ;i++){
            let col = document.createElement('div')
            col.classList.add('smallRoad-column')
            col.classList.add('d-flex')
            col.classList.add(`smallRoad-column${i}`)
            if(i==21){
                col.classList.add('boundary-right')
              }
            for(let i = 0 ; i< bottomHeight.length ; i++){
              let colItem = document.createElement('div')
              let itemDiv = document.createElement('div') 
              colItem.classList.add('smallRoad-item')
              colItem.classList.add('d-flex')
              colItem.classList.add(`smallRoad-item${i}`)
              
              colItem.appendChild(itemDiv)
              col.appendChild(colItem)
            }
            RoadColContainer.appendChild(col)
          }
          //3.計數器規0
          smallRoadColumn.value = 0
          smallRoadItemIndex.value = 0
          currentsmallRoadResult.value = 0
          lastsmallRoadResult.value = 0
          roadOverFlowerTimes.value = 0
          addsmallRoadColumnCount.value = 0
          //大路陣列也要規0
          let newArr = []
          for(let i = 0 ; i < bottom1width.length ; i++){  //初始化大路陣列
            newArr [i] = [0,0,0,0,0,0]
          }
          smallRoadColArr = newArr
          smallRoadInit.value = false
        }
        function showSmallRoad(){
            //每次都畫最後一顆
            // console.log('小路','上次長度',lastSmallRoadDataLength.value,'當前長度',smallRoadResult.value.columns[smallRoadResult.value.columns.length-1].blocks.length)
            if(lastSmallDataColumnLength.value==smallRoadResult.value.columns.length && lastSmallRoadDataLength.value==smallRoadResult.value.columns[smallRoadResult.value.columns.length-1].blocks.length){
              return
            }else{
              // console.log('畫小路')
            let item = smallRoadResult.value.columns[smallRoadResult.value.columns.length-1].blocks[smallRoadResult.value.columns[smallRoadResult.value.columns.length-1].blocks.length-1].symbol
            recordRoad(item)
            if(currentsmallRoadResult.value!==lastsmallRoadResult.value && currentsmallRoadResult.value!==0 && lastsmallRoadResult.value!==0){
                // console.log("換陣營前","行",bigRoadColumn.value,"格",bigRoadItemIndex.value)
                if(roadOverFlowerTimes.value!=0){ //第一次恢復的時候
                    if(smallRoadItemIndex.value-1<1){  //因為上一次已經被+過了，要減回來
                    smallRoadColumn.value++
                    // console.log("在第0格滿出，直接+行數","行",smallRoadColumn.value)
                    roadOverFlowerTimes.value = 0
                    }else{
                    smallRoadColumn.value = smallRoadColumn.value-roadOverFlowerTimes.value+1
                    roadOverFlowerTimes.value = 0
                    }
                    // console.log("溢出後恢復","行",smallRoadColumn.value)
                }else{
                    smallRoadColumn.value++
                }
                if(smallRoadColumn.value>=bottom1width.length+(smallRoadColArr.length-bottom1width.length)){ //溢出極限格子的時候要增加行數
                    // console.log("滿了+行")
                    addSmallRoadColumn()
                }  
                smallRoadItemIndex.value = 0
                // console.log("格",smallRoadItemIndex.value)
                }
                //換行二:溢出換行
                //當下一次溢出大於前一次溢出時，bigRoadItemIndex.value要再-1
                //溢出時如果遇到和局，其實不需要+行?!
                if(smallRoadColArr[smallRoadColumn.value][smallRoadItemIndex.value]!==0 || smallRoadItemIndex.value>5){
                // console.log("連贏溢出")
                 smallRoadColumn.value++ //換行
                //和局時不會進下面的addBigRoad
                if(smallRoadColumn.value>=bottom1width.length+(smallRoadColArr.length-bottom1width.length)){  //不可以固定監測22，因為+了格子之後總行數也變多，必須+一個"增加的行數"
                    addSmallRoadColumn()
                }  //溢出極限格子的時候要增加行數
                if(smallRoadItemIndex.value>0){ //在第0格以上才要-1
                    smallRoadItemIndex.value = smallRoadItemIndex.value-1
                }
                roadOverFlowerTimes.value++ 
                // console.log("連贏溢出","行",smallRoadColumn.value,"格",smallRoadItemIndex.value,"溢出次數",roadOverFlowerTimes.value)
                    for(let i = smallRoadItemIndex.value ; i < 6 ; i++ ){  //只有溢出時才要這麼做:把溢出當格以下的格子都變成1
                        smallRoadColArr[smallRoadColumn.value][i] = 1
                    }
                }
                putRoad(item)
            }
            
        }
        function showSmallRoadInit(){
            smallRoadResult.value.columns.forEach((item:any)=>{
                item.blocks.forEach((i:any)=>{
                    // console.log(i)
                    recordRoad(i.symbol)
                    if(currentsmallRoadResult.value!==lastsmallRoadResult.value && currentsmallRoadResult.value!==0 && lastsmallRoadResult.value!==0){
                        // console.log("換陣營前","行",smallRoadColumn.value,"格",smallRoadItemIndex.value)
                        if(roadOverFlowerTimes.value!=0){ //第一次恢復的時候
                            if(smallRoadItemIndex.value-1<1){  //因為上一次已經被+過了，要減回來
                            smallRoadColumn.value++
                            // console.log("在第0格滿出，直接+行數","行",smallRoadColumn.value)
                            roadOverFlowerTimes.value = 0
                            }else{
                            smallRoadColumn.value = smallRoadColumn.value-roadOverFlowerTimes.value+1
                            roadOverFlowerTimes.value = 0
                            }
                            // console.log("溢出後恢復","行",smallRoadColumn.value)
                        }else{
                            smallRoadColumn.value++
                        }
                        if(smallRoadColumn.value>=bottom1width.length+(smallRoadColArr.length-bottom1width.length)){ //溢出極限格子的時候要增加行數
                            // console.log("滿了+行")
                            addSmallRoadColumn()
                        }  
                        smallRoadItemIndex.value = 0
                        // console.log("格",smallRoadItemIndex.value)
                        }
                        //換行二:溢出換行
                        //當下一次溢出大於前一次溢出時，bigRoadItemIndex.value要再-1
                        //溢出時如果遇到和局，其實不需要+行?!
                        if(smallRoadColArr[smallRoadColumn.value][smallRoadItemIndex.value]!==0 || smallRoadItemIndex.value>5){
                        // console.log("連贏溢出")
                        smallRoadColumn.value++ //換行
                        //和局時不會進下面的addBigRoad
                        if(smallRoadColumn.value>=bottom1width.length+(smallRoadColArr.length-bottom1width.length)){  //不可以固定監測22，因為+了格子之後總行數也變多，必須+一個"增加的行數"
                            addSmallRoadColumn()
                        }  //溢出極限格子的時候要增加行數
                        if(smallRoadItemIndex.value>0){ //在第0格以上才要-1
                            smallRoadItemIndex.value = smallRoadItemIndex.value-1
                        }
                        roadOverFlowerTimes.value++ 
                        // console.log("連贏溢出","行",smallRoadColumn.value,"格",smallRoadItemIndex.value,"溢出次數",roadOverFlowerTimes.value)
                            for(let i = smallRoadItemIndex.value ; i < 6 ; i++ ){  //只有溢出時才要這麼做:把溢出當格以下的格子都變成1
                                smallRoadColArr[smallRoadColumn.value][i] = 1
                            }
                        }
                        putRoad(i.symbol)
                    })
                })
            smallRoadInit.value = true
        }
        return {
            //data
            bottomHeight,
            bottom1width,
            //methods
            resetSmallRoad,
        }
    }
})
</script>