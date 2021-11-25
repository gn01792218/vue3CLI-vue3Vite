<template>
<button class="test position-absolute" @click="testshowBigRoad(1)">莊贏</button>
<button class="test3 position-absolute" @click="testshowBigRoad(2)">閒贏</button>
<button class="test4 position-absolute" @click="testshowBigRoad(13)">莊和</button>
<button class="test5 position-absolute" @click="testshowBigRoad(20)">閒和</button>
<button class="test2 position-absolute" @click="resetBigRoad">重置大路</button>
  <!-- sideRoadBackgroundGrid -->
    <div class="secRoad d-flex sideWidth">
        <div class="secRoad-column" :class="`secRoad-column${index}`" v-for="(sc,index) in secWidth" :key="index"></div>
    </div>
    <div class="sec-column position-absolute sideWidth">
      <div class="secRoad-row" :class="[{'boundary-bottom':index===5 | index===8}]" v-for="(sr,index) in secHeight" :key="index"></div>
    </div>
    <!-- bigRoadGrid -->
    <section class="bigRoad d-flex sideWidth position-absolute">
      <div class="bigRoad-column" :class="[`bigRoad-column${index}`]" v-for="(tc,index) in secWidth" :key="index">
        <div class="bigRoad-item d-flex" :class="[`bigRoad-item${index}`]" v-for="(tci,index) in topHeight" :key="index">
          <div></div>
        </div>
      </div>
    </section>
    <!-- centerRoad -->
    <section class="centerRoad d-flex sideWidth position-absolute">
      <div class="centerRoad-colum" :class="[`centerRoad-column${index}`]" v-for="(cc,index) in centerRoadWidth" :key="index">
        <div class="centerRoad-item" :class="[`centerRoad-item${index}`]" v-for="(cci,index) in bottomHeight" :key="index">
          <!-- <div class="playerRoadIcon3-1"></div> -->
        </div>
      </div>
    </section>
    <section class="bottomRoad d-flex sideWidth position-absolute">
    <!-- bottom1Grid -->
      <div class="bottomRoad1 d-flex w-50">
        <div class="bottomRoad1-column" :class="[`bottomRoad1-column${index}`,{'boundary-right':index===21}]" v-for="(b1,index) in bottom1width" :key="index">
          <div class="bottomRoad-item" v-for="(bi,index) in bottomHeight" :key="index">
            <!-- <div class="playerRoadIcon7"></div> -->
          </div>
        </div>
      </div>
      <!-- bottom2Grid -->
      <div class="bottomRoad2 d-flex w-50">
        <div class="bottomRoad1-column" :class="[`bottomRoad2-column${index}`]" v-for="(b1,index) in bottom1width" :key="index">
          <div class="bottomRoad-item" v-for="(bi,index) in bottomHeight" :key="index">
            <!-- <div class="bankerRoadIcon8"></div> -->
          </div>
        </div>
      </div>
    </section>
</template>

<script lang="ts">
import {defineComponent,computed,ref, watch, reactive} from 'vue'
import { useStore } from 'vuex'
import proto from '../assets/js/bundle'
export default defineComponent({
    setup(){
        //vuex
        const store = useStore()
        // const gameResult = computed(()=>{ //回傳的是陣列
        //     return store.state.dealer.BroadcastGameResult.results
        // })
        const bigRoadResult = computed(()=>{
          return store.state.roadmap.map.bigRoad
        })
        const gameEnd = computed(()=>{
            return store.state.dealer.end
        })
        const gameResult = ref([1])
        const gameResult2 = ref([2])
        //表格
        const secWidth = new Array(22)
        const secHeight = new Array(12)
        const topHeight = new Array(6)
        const centerRoadWidth =new Array(44)
        const bottomHeight = new Array(6)
        const bottom1width = new Array(22)
        //基本資料
        const bigRoadColumn = ref(0)  //這裡還是要記錄現在要到第幾欄
        const bigRoadItemIndex = ref(0)
        const currentBigRoadResult = ref(0)
        const lastBigRoadResult = ref(0)
        const roadOverFlowerTimes = ref(0)
        const bigRoadTie = ref(false)
        const bigRoadInit = ref(false)
        const bigRoadColArr = reactive<any[]>([])
        for(let i = 0 ; i < secWidth.length ; i++){  //初始化大路陣列
          bigRoadColArr.push([0,0,0,0,0,0])
        }
        watch(gameEnd,()=>{
          //換薛時要重置遊戲
          resetBigRoad()
        })
        watch(bigRoadResult,()=>{
          // if(bigRoadInit){
          //   showBigRoad()
          // }else{  //沒有初始化過先畫
          //   showBigRoadInit()
          // }
        })
        function recordBigRoad (gameResult:number){
          switch(gameResult){
              case proto.roadmap.Block.Banker:
              case proto.roadmap.Block.BankerAndBankerPair:
              case proto.roadmap.Block.BankerAndPlayerPair:
              case proto.roadmap.Block.BankerAndBothPair:
              case proto.roadmap.Block.BankerAndTie:
              case proto.roadmap.Block.BankerAndBankerPairAndTie:
              case proto.roadmap.Block.BankerAndPlayerPairAndTie:
              case proto.roadmap.Block.BankerAndBothPairAndTie:
                currentBigRoadResult.value = 1   
                break
              case proto.roadmap.Block.Player:
              case proto.roadmap.Block.PlayerAndBankerPair:
              case proto.roadmap.Block.PlayerAndPlayerPair:
              case proto.roadmap.Block.PlayerAndBothPair:
              case proto.roadmap.Block.PlayerAndTie:
              case proto.roadmap.Block.PlayerAndBankerPairAndTie:
              case proto.roadmap.Block.PlayerAndPlayerPairAndTie:
              case proto.roadmap.Block.PlayerAndBothPairAndTie:
                currentBigRoadResult.value = 2   
                break
            }
        }
        function putBigRoad(gameResult:number){
            let bigRoadCol = document.querySelector(`.bigRoad-column${bigRoadColumn.value}`) as HTMLElement
            let bigRoadColItem = bigRoadCol.children[bigRoadItemIndex.value].firstChild as HTMLElement
            switch(gameResult){
            case proto.roadmap.Block.Banker:
              // bigRoadTie.value = false
              bigRoadColItem.classList.add('big-B')
              break
            case proto.roadmap.Block.Player:
              // bigRoadTie.value = false
              bigRoadColItem.classList.add('big-P')
              break
            case proto.roadmap.Block.BankerAndBankerPair:
              // bigRoadTie.value = false
              bigRoadColItem.classList.add('big-B-BPair')
              break
            case proto.roadmap.Block.BankerAndPlayerPair:
              // bigRoadTie.value = false
              bigRoadColItem.classList.add('big-B-PPair')
              break
            case proto.roadmap.Block.BankerAndBothPair:
              // bigRoadTie.value = false
              bigRoadColItem.classList.add('big-B-BothPair')
              break
            case proto.roadmap.Block.PlayerAndBankerPair:
              // bigRoadTie.value = false
              bigRoadColItem.classList.add('big-P-BPair')
              break
            case proto.roadmap.Block.PlayerAndPlayerPair:
              // bigRoadTie.value = false
              bigRoadColItem.classList.add('big-P-PPair')
              break
            case proto.roadmap.Block.PlayerAndBothPair:
              // bigRoadTie.value = false
              bigRoadColItem.classList.add('big-P-BothPair')
              break
            case proto.roadmap.Block.BankerAndTie:
              // bigRoadTie.value = true
              bigRoadColItem.classList.add('big-BT')
              break
            case proto.roadmap.Block.BankerAndBankerPairAndTie:
              // bigRoadTie.value = true
              bigRoadColItem.classList.add('big-BT-BPair')
              break
            case proto.roadmap.Block.BankerAndPlayerPairAndTie:
              // bigRoadTie.value = true
              bigRoadColItem.classList.add('big-BT-PPair')
              break
            case proto.roadmap.Block.BankerAndBothPairAndTie:
              // bigRoadTie.value = true
              bigRoadColItem.classList.add('big-BT-BothPair')
              break
            case proto.roadmap.Block.PlayerAndTie:
              // bigRoadTie.value = true
              bigRoadColItem.classList.add('big-PT')
              break
            case proto.roadmap.Block.PlayerAndBankerPairAndTie:
              // bigRoadTie.value = true
              bigRoadColItem.classList.add('big-PT-BPair')
              break
            case proto.roadmap.Block.PlayerAndPlayerPairAndTie:
              // bigRoadTie.value = true
              bigRoadColItem.classList.add('big-PT-PPair')
              break
            case proto.roadmap.Block.PlayerAndBothPairAndTie:
              // bigRoadTie.value = true
              bigRoadColItem.classList.add('big-PT-BothPair')
              break
            }
            bigRoadColArr[bigRoadColumn.value][bigRoadItemIndex.value] = 1  //代表那一格已經畫過了
            bigRoadItemIndex.value ++  //增加當前的index
            lastBigRoadResult.value = currentBigRoadResult.value //將這次陣營記錄到下一次的陣營中
            console.log("現在是第",bigRoadColumn.value,"行；","下一格格子",bigRoadItemIndex.value)
        }
        function testshowBigRoad (winner:number) {
          // gameResult.value.forEach(i=>{
            recordBigRoad(winner)  //1.紀錄陣營
            if(winner == 13 || winner == 14 || winner ==15 || winner == 16 || winner ==17 ||
                winner == 18 || winner == 19 || winner == 20){
                  bigRoadTie.value = true
                  console.log("是否和局",bigRoadTie.value)
            }
            //換行一:不同陣營
            if(currentBigRoadResult.value!==lastBigRoadResult.value && currentBigRoadResult.value!==0 && lastBigRoadResult.value!==0){
              // console.log("換陣營前","行",bigRoadColumn.value,"格",bigRoadItemIndex.value)
              if(roadOverFlowerTimes.value!=0){ //第一次恢復的時候
                if(bigRoadItemIndex.value-1<1){  //因為上一次已經被+過了，要減回來
                  bigRoadColumn.value++
                  console.log("在第0格滿出，直接+行數","行",bigRoadColumn.value)
                  roadOverFlowerTimes.value = 0
                }else{
                  bigRoadColumn.value = bigRoadColumn.value-roadOverFlowerTimes.value+1
                  roadOverFlowerTimes.value = 0
                }
                console.log("溢出後恢復","行",bigRoadColumn.value)
              }else{
                bigRoadColumn.value++
              }
              if(bigRoadColumn.value>=secWidth.length+(bigRoadColArr.length-secWidth.length)){ //溢出極限格子的時候要增加行數
                console.log("滿了+行")
                addBigRoadColumn()
              }  
               bigRoadItemIndex.value = 0
               console.log("格",bigRoadItemIndex.value)
            }
            //換行二:溢出換行
            //當下一次溢出大於前一次溢出時，bigRoadItemIndex.value要再-1
            //溢出時如果遇到和局，其實不需要+行?!
            if(bigRoadColArr[bigRoadColumn.value][bigRoadItemIndex.value]!==0 || bigRoadItemIndex.value>5){
              console.log("連贏溢出")
              if(!bigRoadTie.value){  //不是和局時，才要+行
                bigRoadColumn.value++ //換行
              }
              //和局時不會進下面的addBigRoad
              if(bigRoadColumn.value>=secWidth.length+(bigRoadColArr.length-secWidth.length)){  //不可以固定監測22，因為+了格子之後總行數也變多，必須+一個"增加的行數"
                  addBigRoadColumn()
              }  //溢出極限格子的時候要增加行數
              if(bigRoadItemIndex.value>0){ //在第0格以上才要-1
                bigRoadItemIndex.value = bigRoadItemIndex.value-1
              }
              roadOverFlowerTimes.value++ 
              console.log("連贏溢出","行",bigRoadColumn.value,"格",bigRoadItemIndex.value,"溢出次數",roadOverFlowerTimes.value)
                  for(let i = bigRoadItemIndex.value ; i < 6 ; i++ ){  //只有溢出時才要這麼做:把溢出當格以下的格子都變成1
                    bigRoadColArr[bigRoadColumn.value][i] = 1
                  }
            }
             if(bigRoadTie.value && bigRoadItemIndex.value>=0){  //假如是和局狀態
              console.log('偵測到和局')
              if(bigRoadColArr[bigRoadColumn.value][bigRoadItemIndex.value]!==0 || bigRoadItemIndex.value>5){ //連贏的時候必須要--col和index
                // bigRoadColumn.value-- //不要往下加一行
                roadOverFlowerTimes.value-- //不要算溢出
                bigRoadTie.value = false
                console.log("和局溢出狀態","畫行",bigRoadColumn.value,"畫格",bigRoadItemIndex.value,"溢出次數",roadOverFlowerTimes.value)
              }else{
                if(bigRoadItemIndex.value>0){
                  bigRoadItemIndex.value--
                }
                console.log("和局狀態","畫行",bigRoadColumn.value,'畫格',bigRoadItemIndex.value)
                bigRoadTie.value = false
              }
            }
            putBigRoad(winner)
          // })
        }
        function showBigRoadInit () {
          bigRoadResult.value.columns.foeEach((i:any)=>{  //初始化時所有都畫
            i.forEach((item:any)=>{
              recordBigRoad(i)  //1.紀錄陣營
            //換行一:不同陣營
            if(currentBigRoadResult.value!==lastBigRoadResult.value && currentBigRoadResult.value!==0 && lastBigRoadResult.value!==0){
              // console.log("換陣營前","行",bigRoadColumn.value,"格",bigRoadItemIndex.value)
              if(roadOverFlowerTimes.value!=0){ //第一次恢復的時候
                if(bigRoadItemIndex.value-1<1){  //因為上一次已經被+過了，要減回來
                  bigRoadColumn.value++
                  console.log("在第0格滿出，直接+行數","行",bigRoadColumn.value)
                  roadOverFlowerTimes.value = 0
                }else{
                  bigRoadColumn.value = bigRoadColumn.value-roadOverFlowerTimes.value+1
                  roadOverFlowerTimes.value = 0
                }
                console.log("溢出後恢復","行",bigRoadColumn.value)
              }else{
                bigRoadColumn.value++
              }
              if(bigRoadColumn.value>=secWidth.length+(bigRoadColArr.length-secWidth.length)){ //溢出極限格子的時候要增加行數
                console.log("滿了+行")
                addBigRoadColumn()
              }  
               bigRoadItemIndex.value = 0
               console.log("格",bigRoadItemIndex.value)
            }
            //換行二:溢出換行
            //當下一次溢出大於前一次溢出時，bigRoadItemIndex.value要再-1
            if(bigRoadColArr[bigRoadColumn.value][bigRoadItemIndex.value]!==0 || bigRoadItemIndex.value>5){
              console.log("連贏溢出")
              bigRoadColumn.value++ //換行
              if(bigRoadColumn.value>=secWidth.length+(bigRoadColArr.length-secWidth.length)){  //不可以固定監測22，因為+了格子之後總行數也變多，必須+一個"增加的行數"
                console.log("滿了+行")
                addBigRoadColumn()
              }  //溢出極限格子的時候要增加行數
              if(bigRoadItemIndex.value>0){ //在第0格以上才要-1
                bigRoadItemIndex.value = bigRoadItemIndex.value-1
              }
              roadOverFlowerTimes.value++ 
              console.log("連贏溢出","行",bigRoadColumn.value,"格",bigRoadItemIndex.value,"溢出次數",roadOverFlowerTimes.value)
               for(let i = bigRoadItemIndex.value ; i < 6 ; i++ ){  //只有溢出時才要這麼做:把溢出當格以下的格子都變成1
                bigRoadColArr[bigRoadColumn.value][i] = 1
              }
            }
            putBigRoad(i)
            })
          })
        }
        function showBigRoad () {
          let i = bigRoadResult.value.columns[bigRoadResult.value.columns.length-1][bigRoadResult.value.columns[bigRoadResult.value.columns.length-1].length-1]  //只取最後一條col的最後一個值出來畫
            recordBigRoad(i)  //1.紀錄陣營
            //換行一:不同陣營
            if(currentBigRoadResult.value!==lastBigRoadResult.value && currentBigRoadResult.value!==0 && lastBigRoadResult.value!==0){
              // console.log("換陣營前","行",bigRoadColumn.value,"格",bigRoadItemIndex.value)
              if(roadOverFlowerTimes.value!=0){ //第一次恢復的時候
                if(bigRoadItemIndex.value-1<1){  //因為上一次已經被+過了，要減回來
                  bigRoadColumn.value++
                  console.log("在第0格滿出，直接+行數","行",bigRoadColumn.value)
                  roadOverFlowerTimes.value = 0
                }else{
                  bigRoadColumn.value = bigRoadColumn.value-roadOverFlowerTimes.value+1
                  roadOverFlowerTimes.value = 0
                }
                console.log("溢出後恢復","行",bigRoadColumn.value)
              }else{
                bigRoadColumn.value++
              }
              if(bigRoadColumn.value>=secWidth.length+(bigRoadColArr.length-secWidth.length)){ //溢出極限格子的時候要增加行數
                console.log("滿了+行")
                addBigRoadColumn()
              }  
               bigRoadItemIndex.value = 0
               console.log("格",bigRoadItemIndex.value)
            }
            //換行二:溢出換行
            //當下一次溢出大於前一次溢出時，bigRoadItemIndex.value要再-1
            if(bigRoadColArr[bigRoadColumn.value][bigRoadItemIndex.value]!==0 || bigRoadItemIndex.value>5){
              console.log("連贏溢出")
              bigRoadColumn.value++ //換行
              if(bigRoadColumn.value>=secWidth.length+(bigRoadColArr.length-secWidth.length)){  //不可以固定監測22，因為+了格子之後總行數也變多，必須+一個"增加的行數"
                console.log("滿了+行")
                addBigRoadColumn()
              }  //溢出極限格子的時候要增加行數
              if(bigRoadItemIndex.value>0){ //在第0格以上才要-1
                bigRoadItemIndex.value = bigRoadItemIndex.value-1
              }
              roadOverFlowerTimes.value++ 
              console.log("連贏溢出","行",bigRoadColumn.value,"格",bigRoadItemIndex.value,"溢出次數",roadOverFlowerTimes.value)
               for(let i = bigRoadItemIndex.value ; i < 6 ; i++ ){  //只有溢出時才要這麼做:把溢出當格以下的格子都變成1
                bigRoadColArr[bigRoadColumn.value][i] = 1
              }
            }
            putBigRoad(i)
        }
        function addBigRoadColumn () {  //滿格時一次增加一格的方法
          // bigRoadColumn.value++
          // bigRoadItemIndex.value = 0
          let bigRoad = document.querySelector('.bigRoad') as HTMLElement  
          let firstChild = bigRoad.firstElementChild as HTMLElement //抓取第一個元素
          bigRoad.removeChild(firstChild) //刪除第一行
          let newCol = document.createElement('div')
          newCol.classList.add('bigRoad-column')
          // newCol.classList.add('d-flex')
          newCol.classList.add(`bigRoad-column${bigRoadColumn.value}`)
          for(let i = 0 ;i <6 ;i++){
            let newColItem = document.createElement('div')
            let itemDiv = document.createElement('div')
            newColItem.classList.add('bigRoad-item')
            newColItem.classList.add('d-flex')
            newColItem.classList.add(`bigRoad-item${i}`)
            newColItem.appendChild(itemDiv)
            newCol.appendChild(newColItem)
          }
          //貼上去
          bigRoad.appendChild(newCol)
          //記得也要增加bigRoadArr
          bigRoadColArr.push([0,0,0,0,0,0])
          console.log("加了一行","行",bigRoadColumn.value)
          // roadOverFlowerTimes.value++
        }
        function resetBigRoad(){
          //1.直接刪除beadPlatRoadPlace下所有的beadPlate-column
          let bigRoadColContainer = document.querySelector('.bigRoad') as HTMLElement
          let lastChild = bigRoadColContainer.lastElementChild
          while(lastChild ){
            bigRoadColContainer.removeChild(lastChild); //移除行數
            lastChild  = bigRoadColContainer.lastElementChild //抓下一個child
          }
          //2.建立新的二十二條col
          for(let i = 0 ;i < secWidth.length ;i++){
            let col = document.createElement('div')
            col.classList.add('bigRoad-column')
            col.classList.add('d-flex')
            col.classList.add(`bigRoad-column${i}`)
            for(let i = 0 ; i< topHeight.length ; i++){
              let colItem = document.createElement('div')
              let itemDiv = document.createElement('div') 
              colItem.classList.add('bigRoad-item')
              colItem.classList.add('d-flex')
              colItem.classList.add(`bigRoad-item${i}`)
              colItem.appendChild(itemDiv)
              col.appendChild(colItem)
            }
            bigRoadColContainer.appendChild(col)
          }
          //3.計數器規0
          bigRoadColumn.value = 0
          bigRoadItemIndex.value = 0
          currentBigRoadResult.value = 0
          lastBigRoadResult.value = 0
          roadOverFlowerTimes.value = 0
          console.log(bigRoadColumn.value,bigRoadItemIndex.value,currentBigRoadResult.value,lastBigRoadResult.value,roadOverFlowerTimes.value)
          //大路陣列也要規0
          for(let i = 0 ; i < secWidth.length ; i++){  //初始化大路陣列
            bigRoadColArr[i] = [0,0,0,0,0,0]
          }
        }
        return {
          //data
          topHeight,centerRoadWidth ,secWidth,bottomHeight,secHeight,bottom1width,
          //methods
          resetBigRoad,testshowBigRoad,
        }
    },
})
</script>

<style lang="scss">
.test{
  left:-5%;
  bottom: 100%;
}
.test2{
  top:50%;
}
.test3{
  bottom:0;
}
.test4{
  bottom:0;
  left:5%;
}
.test5{
  bottom:0;
  left:10%;
}
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
.bigRoad{
  top:0;
  right:0;
  height:50%;
}
.bigRoad-column{
  /* border: 2px solid yellow; */
  width:4.54545454%;  /*調整欄寬 */
  height:100%;
  flex-direction: column;
}
.bigRoad-item{
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
  // border:solid peru 1px;
  width:2.272727272727%;
  height:100%;
}
.centerRoad-item{
  width:100%;
  height:16.666666666%;
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
  width:5%;
  height:100%;
  // border:red solid 2px;
}
.bottomRoad-item{
  width:100%;
  height:16.6666666666%;
  // border:springgreen solid 2px;
}
/* 共用區 */
.sideWidth{   /*用來統一調整sideRode佔寬比 */
  width:60%;
}
.boundary-bottom{
  border-bottom:1px solid rgba(0, 0, 0, 0.719);
}
.boundary-right{
  border-right:1px solid rgba(0, 0, 0, 0.719);
}

</style>