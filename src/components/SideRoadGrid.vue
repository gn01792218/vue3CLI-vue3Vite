<template>
<!-- <button class="test position-absolute" @click="put(2)">莊贏</button>
<button class="position-absolute" @click="put(1)">閒贏</button> -->
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
        // const preOverFlowerTimes = ref(22)  應該不需要了
        const bigRoadColArr = reactive<any[]>([])
        for(let i = 0 ; i < secWidth.length ; i++){  //初始化大路陣列
          bigRoadColArr.push([0,0,0,0,0,0])
        }
        watch(gameEnd,()=>{
          //換薛時要重置遊戲
        })

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
            case proto.roadmap.Block.Banker:
              bigRoadColItem.classList.add('big-B')
              break
            case proto.roadmap.Block.Player:
              bigRoadColItem.classList.add('big-P')
              break
            case proto.roadmap.Block.BankerAndBankerPair:
              bigRoadColItem.classList.add('big-B-BPair')
              break
            case proto.roadmap.Block.BankerAndPlayerPair:
              bigRoadColItem.classList.add('big-B-PPair')
              break
            case proto.roadmap.Block.BankerAndBothPair:
              bigRoadColItem.classList.add('big-B-BothPair')
              break
            case proto.roadmap.Block.PlayerAndBankerPair:
              bigRoadColItem.classList.add('big-P-BPair')
              break
            case proto.roadmap.Block.PlayerAndPlayerPair:
              bigRoadColItem.classList.add('big-P-PPair')
              break
            case proto.roadmap.Block.PlayerAndBothPair:
              bigRoadColItem.classList.add('big-P-BothPair')
              break
            case proto.roadmap.Block.BankerAndTie:
              bigRoadColItem.classList.add('big-BT')
              break
            case proto.roadmap.Block.BankerAndBankerPairAndTie:
              bigRoadColItem.classList.add('big-BT-BPair')
              break
            case proto.roadmap.Block.BankerAndPlayerPairAndTie:
              bigRoadColItem.classList.add('big-BT-PPair')
              break
            case proto.roadmap.Block.BankerAndBothPairAndTie:
              bigRoadColItem.classList.add('big-BT-BothPair')
              break
            case proto.roadmap.Block.PlayerAndTie:
              bigRoadColItem.classList.add('big-PT')
              break
            case proto.roadmap.Block.PlayerAndBankerPairAndTie:
              bigRoadColItem.classList.add('big-PT-BPair')
              break
            case proto.roadmap.Block.PlayerAndPlayerPairAndTie:
              bigRoadColItem.classList.add('big-PT-PPair')
              break
            case proto.roadmap.Block.PlayerAndBothPairAndTie:
              bigRoadColItem.classList.add('big-PT-BothPair')
              break
            }
            bigRoadColArr[bigRoadColumn.value][bigRoadItemIndex.value] = 1  //代表那一格已經畫過了
            bigRoadItemIndex.value ++  //增加當前的index
            
            lastBigRoadResult.value = currentBigRoadResult.value //將這次陣營記錄到下一次的陣營中
            console.log("現在的格子",bigRoadItemIndex.value)
          }
        }
        //問題:
        //勢必要讓路圖可以左右移動，否則遇到溢出+上行數極限增加欄位時後；又換陣營時，將會看不到前面的顯示結果
        function showBigRoad2 () {
          gameResult2.value.forEach(i=>{
            recordBigRoad(i)  //紀錄陣營
            if(bigRoadColumn.value>=secWidth.length && bigRoadItemIndex.value>5){  //加格子情況一:col滿且item滿
              addBBigRoadColumn()
            }
            //換行一:不同陣營
            if(currentBigRoadResult.value!==lastBigRoadResult.value && currentBigRoadResult.value!==0 && lastBigRoadResult.value!==0){
              // console.log("換陣營前","行",bigRoadColumn.value,"格",bigRoadItemIndex.value)
              if(roadOverFlowerTimes.value!=0){  //第一次恢復的時候
                if(bigRoadItemIndex.value-1<1){ //因為上一次已經被+過了，要減回來
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
               bigRoadItemIndex.value = 0
               console.log("格",bigRoadItemIndex.value)
            }
            //換行二:溢出換行
            //當下一次溢出大於前一次溢出時，bigRoadItemIndex.value要再-1
            if(bigRoadColArr[bigRoadColumn.value][bigRoadItemIndex.value]==1 || bigRoadItemIndex.value>5){
              bigRoadColumn.value++ //換行
              if(bigRoadColumn.value>=secWidth.length){
                console.log("滿了+行")
                addBBigRoadColumn()
              }  //溢出極限格子的時候要增加行數
              if(bigRoadItemIndex.value>0){  //只剩下一格時，就不要減了，否則會超出去
                bigRoadItemIndex.value = bigRoadItemIndex.value-1
              }
              roadOverFlowerTimes.value++ 
              console.log("連贏溢出","行",bigRoadColumn.value,"格",bigRoadItemIndex.value,"溢出次數",roadOverFlowerTimes.value)
              for(let i = bigRoadItemIndex.value ; i < 6 ; i++ ){  //只有溢出時才要這麼做，讓下面的格子都不能再放東西
                bigRoadColArr[bigRoadColumn.value][i] = 1
                console.log(i)
              }
            }
            putBigRoad(i)
          })
        }
        function showBigRoad () {
          gameResult.value.forEach(i=>{
            recordBigRoad(i)  //1.紀錄陣營
            if(bigRoadColumn.value>=secWidth.length && bigRoadItemIndex.value>5){  //正常的滿格+行情況
              addBBigRoadColumn()
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
               bigRoadItemIndex.value = 0
               console.log("格",bigRoadItemIndex.value)
            }
            //換行二:溢出換行
            //當下一次溢出大於前一次溢出時，bigRoadItemIndex.value要再-1
            if(bigRoadColArr[bigRoadColumn.value][bigRoadItemIndex.value]!==0 || bigRoadItemIndex.value>5){
              bigRoadColumn.value++ //換行
              if(bigRoadColumn.value>=secWidth.length){addBBigRoadColumn()}  //溢出極限格子的時候要增加行數
              if(bigRoadItemIndex.value>0){ //在第0格以上才要-1
                bigRoadItemIndex.value = bigRoadItemIndex.value-1
              }
              roadOverFlowerTimes.value++ 
              // console.log("連贏溢出","行",bigRoadColumn.value,"格",bigRoadItemIndex.value,"溢出次數",roadOverFlowerTimes.value)
               for(let i = bigRoadItemIndex.value ; i < 6 ; i++ ){  //只有溢出時才要這麼做:把溢出當格以下的格子都變成1
                bigRoadColArr[bigRoadColumn.value][i] = 1
                console.log(i)
              }
              
            }
            putBigRoad(i)
          })
        }
        function addBBigRoadColumn () {  //滿格時一次增加一格的方法
          bigRoadColumn.value++
          bigRoadItemIndex.value = 0
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
          roadOverFlowerTimes.value++
        }
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