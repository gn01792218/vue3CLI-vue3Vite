<template>
<button class="test position-absolute" @click="put(2)">莊贏</button>
<button class="position-absolute" @click="put(1)">閒贏</button>
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
          <div class="playerRoadIcon3-1"></div>
        </div>
      </div>
    </section>
    <section class="bottomRoad d-flex sideWidth position-absolute">
    <!-- bottom1Grid -->
      <div class="bottomRoad1 d-flex w-50">
        <div class="bottomRoad1-column" :class="[`bottomRoad1-column${index}`,{'boundary-right':index===21}]" v-for="(b1,index) in bottom1width" :key="index">
          <div class="bottomRoad-item" v-for="(bi,index) in bottomHeight" :key="index">
            <div class="playerRoadIcon7"></div>
          </div>
        </div>
      </div>
      <!-- bottom2Grid -->
      <div class="bottomRoad2 d-flex w-50">
        <div class="bottomRoad1-column" :class="[`bottomRoad2-column${index}`]" v-for="(b1,index) in bottom1width" :key="index">
          <div class="bottomRoad-item" v-for="(bi,index) in bottomHeight" :key="index">
            <div class="bankerRoadIcon8"></div>
          </div>
        </div>
      </div>
    </section>
</template>

<script lang="ts">
import {defineComponent,computed,ref, watch, reactive} from 'vue'
import { useStore } from 'vuex'
// interface colObject{
//   limit:number,  //還剩下幾格可以放
//   putIndex:number, //目前放到第幾格
// }
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
        const preOverFlowerTimes = ref(22)
        const bigRoadColArr = reactive<any[]>([])
        for(let i = 0 ; i < secWidth.length ; i++){
          bigRoadColArr.push([0,0,0,0,0,0])
        }
        console.log(bigRoadColArr)
        //新想法
        // const BigRoadColArr = reactive<colObject[]>([])
        // for(let i = 0 ; i <secWidth.length ;i++){ //初始化col物件
        //   BigRoadColArr.push({
        //     limit:5,
        //     putIndex:0,
        //   })
        // }
        // watch(gameResult,()=>{
        //   showBigRoad()
        // })
        function put(num:number) {
          switch(num){
            case 1:
              showBigRoad()
              break
            case 2:
              showBigRoad2()
          }
        }
        function recordBigRoad (gameResult:number){
          switch(gameResult){
              case 1:
                currentBigRoadResult.value = 1   //閒贏
                break
              case 2:
                currentBigRoadResult.value = 2   //莊贏
                break
              case 3:
                currentBigRoadResult.value = 1   //等同於閒贏
                break
              case 5:
                currentBigRoadResult.value = 2   //等同於莊贏
                break
            }
        }
        function putBigRoad(gameResult:number){
          if(gameResult!==4){ //和局不會記錄
            let bigRoadCol = document.querySelector(`.bigRoad-column${bigRoadColumn.value}`) as HTMLElement
            let bigRoadColItem = bigRoadCol.children[bigRoadItemIndex.value].firstChild as HTMLElement
            switch(gameResult){
            case 1:
              bigRoadColItem.classList.add('playerRoadIcon3')
              break
            case 2:
              bigRoadColItem.classList.add('bankerRoadIcon3')
              break
            case 3:
              bigRoadColItem.classList.add('playerRoadIcon5')
              break
            case 5:
              bigRoadColItem.classList.add('bankerRoadIcon4')
              break
            }
            if(bigRoadItemIndex.value<=5){  //+到五就好了
              bigRoadColArr[bigRoadColumn.value][bigRoadItemIndex.value] = 1  //代表那一格已經畫過了
              bigRoadItemIndex.value ++  //增加當前的index
            }
            lastBigRoadResult.value = currentBigRoadResult.value //將這次陣營記錄到下一次的陣營中
            console.log("現在的格子",bigRoadItemIndex.value)
          }
        }
        function showBigRoad2 () {
          gameResult2.value.forEach(i=>{
            recordBigRoad(i)  //紀錄陣營
            //換行一:不同陣營
            if(currentBigRoadResult.value!==lastBigRoadResult.value && currentBigRoadResult.value!==0 && lastBigRoadResult.value!==0){
              console.log("換陣營前","行",bigRoadColumn.value,"格",bigRoadItemIndex.value)
              if(roadOverFlowerTimes.value!=0){
                bigRoadColumn.value = bigRoadColumn.value-roadOverFlowerTimes.value+1
                roadOverFlowerTimes.value = 0
                console.log("溢出後恢復","行",bigRoadColumn.value)
              }else{
                bigRoadColumn.value++
              }
               bigRoadItemIndex.value = 0
               console.log("格",bigRoadItemIndex.value)
            }
            //換行二:溢出換行
            if(bigRoadColArr[bigRoadColumn.value][bigRoadItemIndex.value]==1 || bigRoadItemIndex.value>5){
              bigRoadColumn.value++ //換行
              bigRoadItemIndex.value = bigRoadItemIndex.value-1
              roadOverFlowerTimes.value++ 
              console.log("連贏溢出","行",bigRoadColumn.value,"格",bigRoadItemIndex.value,"溢出次數",roadOverFlowerTimes.value)
            }
            putBigRoad(i)
          })
        }
         function showBigRoad () {
          gameResult.value.forEach(i=>{
            recordBigRoad(i)  //紀錄陣營
            //換行一:不同陣營
            if(currentBigRoadResult.value!==lastBigRoadResult.value && currentBigRoadResult.value!==0 && lastBigRoadResult.value!==0){
              console.log("換陣營前","行",bigRoadColumn.value,"格",bigRoadItemIndex.value)
              if(roadOverFlowerTimes.value!=0){
                console.log("溢出後恢復","行",bigRoadColumn.value)
                bigRoadColumn.value = bigRoadColumn.value-roadOverFlowerTimes.value+1
                roadOverFlowerTimes.value = 0
              }else{
                bigRoadColumn.value++
              }
               bigRoadItemIndex.value = 0
               console.log("格",bigRoadItemIndex.value)
            }
            //換行二:溢出換行
            //問題:如何讓超過
            if(bigRoadColArr[bigRoadColumn.value][bigRoadItemIndex.value]!==0 || bigRoadItemIndex.value>5){
              //已經有過阻擋的格子，就不應該再加
              bigRoadColumn.value++ //換行
              bigRoadItemIndex.value = bigRoadItemIndex.value-1
              roadOverFlowerTimes.value++ 
              console.log("連贏溢出","行",bigRoadColumn.value,"格",bigRoadItemIndex.value,"溢出次數",roadOverFlowerTimes.value)
            }
            putBigRoad(i)
          })
        }
        // function showBigRoad2 () { //測試用
        //   gameResult2.value.forEach((i:any)=>{
        //     recordBigRoad(i)  //先記錄贏的陣營
        //     // if(bigRoadColumn.value>=secWidth.length){ //全部滿格時
        //     //   resetBigRoad()
        //     // }
        //     if(currentBigRoadResult.value!==lastBigRoadResult.value && currentBigRoadResult.value!==0 && lastBigRoadResult.value!==0){ //換行時機一:下一個是不同邊贏
        //       if(roadOverFlowerTimes.value>0){  //應付前幾次有連贏溢出情況
        //         bigRoadColumn.value= bigRoadColumn.value-(roadOverFlowerTimes.value-1)
        //         BigRoadColArr[bigRoadColumn.value].putIndex = 0
        //         // BigRoadColArr[bigRoadColumn.value].limit--
        //         preOverFlowerTimes.value = roadOverFlowerTimes.value
        //         roadOverFlowerTimes.value = 0
        //         console.log("連贏中止，回退","畫行數",bigRoadColumn.value,"從第",BigRoadColArr[bigRoadColumn.value].putIndex,"格開始畫","當前溢出規0","前次溢出",preOverFlowerTimes.value )
        //       }
        //       else{
        //         bigRoadColumn.value++
        //         BigRoadColArr[bigRoadColumn.value].putIndex = 0
        //         console.log("不同陣營換行","行",bigRoadColumn.value,"位置",BigRoadColArr[bigRoadColumn.value].putIndex)
        //       }
        //     }
        //     if(BigRoadColArr[bigRoadColumn.value].putIndex>BigRoadColArr[bigRoadColumn.value].limit && currentBigRoadResult.value==lastBigRoadResult.value){  //換行時機二:同樣連贏，就開始橫放到下一行最後一格
        //       console.log("連贏溢出換行前","行",bigRoadColumn.value,"格",BigRoadColArr[bigRoadColumn.value].putIndex,"該格極限",BigRoadColArr[bigRoadColumn.value].limit)
        //       if(roadOverFlowerTimes.value>=preOverFlowerTimes.value-1){
        //         let preLimit = BigRoadColArr[bigRoadColumn.value].limit
        //         bigRoadColumn.value++
        //         BigRoadColArr[bigRoadColumn.value].limit = preLimit
        //           BigRoadColArr[bigRoadColumn.value].putIndex = BigRoadColArr[bigRoadColumn.value].limit+1
        //         // BigRoadColArr[bigRoadColumn.value].putIndex = BigRoadColArr[bigRoadColumn.value].limit+1
        //         roadOverFlowerTimes.value++ 
        //         console.log("超越前次溢出","行",bigRoadColumn.value,"此行極限",BigRoadColArr[bigRoadColumn.value].limit,"格畫",BigRoadColArr[bigRoadColumn.value].putIndex,'溢出',roadOverFlowerTimes.value)
        //       }else{
        //         bigRoadColumn.value++
        //         BigRoadColArr[bigRoadColumn.value].putIndex = BigRoadColArr[bigRoadColumn.value].limit  //畫在極限那一格
        //         if(BigRoadColArr[bigRoadColumn.value].limit>0){
        //           BigRoadColArr[bigRoadColumn.value].limit--  //再減去極限
        //         }
        //         roadOverFlowerTimes.value++ //滿格換行一次就會++；中斷後col要回退roadOverFlowerTimes.value-1
        //         console.log("連贏溢出換行","行數:",bigRoadColumn.value,"畫再第",BigRoadColArr[bigRoadColumn.value].putIndex,"格","極限剩下",BigRoadColArr[bigRoadColumn.value].limit,"溢出",roadOverFlowerTimes.value)
        //       }
        //     }
        //     putBigRoad(i)
        //     lastBigRoadResult.value = currentBigRoadResult.value
        //   })
        // }
        // function showBigRoad () { //控制要放在哪
        //   gameResult.value.forEach((i:any)=>{
        //     recordBigRoad(i)  //先記錄贏的陣營
        //     // if(bigRoadColumn.value>=secWidth.length){ //全部滿格時
        //     //   resetBigRoad()
        //     // }
        //     if(currentBigRoadResult.value!==lastBigRoadResult.value && currentBigRoadResult.value!==0 && lastBigRoadResult.value!==0){ //換行時機一:下一個是不同邊贏
        //       if(roadOverFlowerTimes.value>0){  //應付前次有連贏溢出情況
        //         bigRoadColumn.value= bigRoadColumn.value-(roadOverFlowerTimes.value-1)
        //         BigRoadColArr[bigRoadColumn.value].putIndex = 0  //從頭開始畫
        //         // BigRoadColArr[bigRoadColumn.value].limit--
        //         preOverFlowerTimes.value = roadOverFlowerTimes.value  //紀錄上一次的溢出紀錄
        //         roadOverFlowerTimes.value = 0
        //         console.log("連贏中止，回退","畫行數",bigRoadColumn.value,"從第",BigRoadColArr[bigRoadColumn.value].putIndex,"格開始畫","當前溢出規0","前次溢出",preOverFlowerTimes.value )
        //       }
        //       else{
        //         bigRoadColumn.value++
        //         BigRoadColArr[bigRoadColumn.value].putIndex = 0
        //          console.log("不同陣營換行","行",bigRoadColumn.value,"位置",BigRoadColArr[bigRoadColumn.value].putIndex)
        //       }
        //     }
        //     if(BigRoadColArr[bigRoadColumn.value].putIndex>BigRoadColArr[bigRoadColumn.value].limit && currentBigRoadResult.value==lastBigRoadResult.value){  //換行時機二:同樣連贏，就開始橫放到下一行最後一格
        //       console.log("連贏溢出換行前","行",bigRoadColumn.value,"格",BigRoadColArr[bigRoadColumn.value].putIndex,"該格極限",BigRoadColArr[bigRoadColumn.value].limit)
        //       if(roadOverFlowerTimes.value>=preOverFlowerTimes.value-1){
        //         let preLimit = BigRoadColArr[bigRoadColumn.value].limit
        //         bigRoadColumn.value++
        //         BigRoadColArr[bigRoadColumn.value].limit = preLimit
                
        //           BigRoadColArr[bigRoadColumn.value].putIndex = BigRoadColArr[bigRoadColumn.value].limit+1
                
        //         roadOverFlowerTimes.value++ 
        //         console.log("超越前次溢出","行",bigRoadColumn.value,"此行極限",BigRoadColArr[bigRoadColumn.value].limit,"格畫",BigRoadColArr[bigRoadColumn.value].putIndex,'溢出',roadOverFlowerTimes.value)
        //       }else{
        //         bigRoadColumn.value++
        //         BigRoadColArr[bigRoadColumn.value].putIndex = BigRoadColArr[bigRoadColumn.value].limit    //先畫在極限那一格
        //         if(BigRoadColArr[bigRoadColumn.value].limit>0){
        //           BigRoadColArr[bigRoadColumn.value].limit--  //再減去極限
        //         }
        //         roadOverFlowerTimes.value++ //滿格換行一次就會++；中斷後col要回退roadOverFlowerTimes.value-1
        //         console.log("連贏溢出換行","行數:",bigRoadColumn.value,"畫再第",BigRoadColArr[bigRoadColumn.value].putIndex,"格","極限剩下",BigRoadColArr[bigRoadColumn.value].limit,"溢出",roadOverFlowerTimes.value)
        //       }
        //     }
        //     putBigRoad(i)
        //     lastBigRoadResult.value = currentBigRoadResult.value
        //   })
        // }
        // function resetBigRoad () {
        //   for(let i = 0 ; i <8 ; i++){
        //     let checkerboardRoadCol = document.querySelector(`.mainRoad-column${i}`) as HTMLElement
        //     for(let i = 0 ; i<6 ;i++){
        //       let checkerboardRoadColItem = checkerboardRoadCol.children[i].firstChild as HTMLElement
        //       checkerboardRoadColItem.setAttribute("class","")
        //     }
        //   }
        //   bigRoadColumn.value = 0
        //   bigRoadItemIndex.value = 0
        //   roadOverFlowerTimes.value = 0
        // }
        return {
          //data
          topHeight,centerRoadWidth ,secWidth,bottomHeight,secHeight,bottom1width,
          //methods
          put,
        }
    },
})
</script>

<style lang="scss">
.test{
  left:10%;
  bottom: 100%;
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