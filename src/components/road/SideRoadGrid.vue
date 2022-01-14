<template>
<!-- <button class="test position-absolute" @click="testshowBigRoad(1)">莊贏</button>
<button class="test3 position-absolute" @click="testshowBigRoad(2)">閒贏</button>
<button class="test9 position-absolute" @click="testshowBigRoad(3)">和</button>
<button class="test10 position-absolute" @click="testshowBigRoad(10)">和莊對</button>
<button class="test4 position-absolute" @click="testshowBigRoad(14)">莊和</button>
<button class="test7 position-absolute" @click="testshowBigRoad(13)">莊和2</button>
<button class="test8 position-absolute" @click="testshowBigRoad(15)">莊和3</button>
<button class="test5 position-absolute" @click="testshowBigRoad(19)">閒和</button>
<button class="test6 position-absolute" @click="testshowBigRoad(18)">閒和2</button>
<button class="test2 position-absolute" @click="resetBigRoad">重置大路</button> -->
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
          <div>1</div>
        </div>
      </div>
    </section>
      <!-- BigEyesRoad -->
      <BigEyesRoad/>
    <section class="bottomRoad d-flex sideWidth position-absolute">
      <!-- smallRoadGrid -->
      <SmallRoad/>
      <!-- cockroachRoad -->
      <Cockroach/>
    </section>
</template>

<script lang="ts">
import {defineComponent,computed,ref, watch, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import proto from '../../assets/js/bundle'
import BigEyesRoad from '@/components/road/BigEyesRoad.vue'
import Cockroach from '@/components/road/Cockroach.vue'
import SmallRoad from '@/components/road/SmallRoad.vue'
export default defineComponent({
  components:{
    BigEyesRoad,
    Cockroach,
    SmallRoad,
  },
    setup(){
      // onMounted(()=>{
      //   showBigRoadInit()
      //   bigRoadInit.value = true
      // })
      window.addEventListener('reConnect',()=>{
        console.log('偵測崇廉')
        resetBigRoad()
        // console.log('大路陣列長度',bigRoadColArr.length)
        showBigRoadInitTest ()
        // if(bigRoadInit.value){
        //     // showBigRoad()
        //     showBigRoadAll()
        //   }else{  //沒有初始化過先畫
        //     showBigRoadInit()
        //   }
          // if(bigRoadInit.value){
          //   showBigRoadTest ()
          // }else{  //沒有初始化過先畫
          //   showBigRoadInitTest ()
          // }
      }) 
      //桌號
        const route = useRoute()
        const tableNum = computed(()=>{
          return route.params.tableId
        })
        //vuex
        const store = useStore()
        // const gameResult = computed(()=>{ //回傳的是陣列
        //     return store.state.dealer.BroadcastGameResult.results
        // })
        const beadPlateResult = computed(()=>{
          return store.state.roadmap.map.beadPlate
        })
        const bigRoadResult = computed(()=>{
          return store.state.roadmap.map.bigRoad
        })
        const gameEnd = computed(()=>{
            return store.state.dealer.end
        })
        const askRoadArr = computed(()=>{
          return store.state.roadmap.askRoad
        }) 
        const timer = ref()
        const asking = ref(false) //是否在問路中
        watch(askRoadArr.value,()=>{ //有人問路時，就啟動
          asking.value = true
        //1.先清除計時器
          if(timer.value){   
            clearTimeout(timer.value)
          }
          //2.重置路圖
          resetBigRoad()
          showBigRoadInit()
          //3.放置問路
          let roadNum = askRoadArr.value[askRoadArr.value.length-1]
          askRoad(roadNum)
          //4.添加動畫
          let column = document.querySelector(`.bigRoad-column${bigRoadColumn.value}`) as HTMLElement
          let road:HTMLElement
          if(bigRoadItemIndex.value>0){
           road = column.children[bigRoadItemIndex.value-1].firstChild as HTMLElement
          }else{
           road = column.children[bigRoadItemIndex.value].firstChild as HTMLElement
          }
          road.classList.add('askRoadanimation')
          //5.畫完之後等二秒就reset路圖，並重新畫
          timer.value =  setTimeout(()=>{
            resetBigRoad()
            showBigRoadInit()
            road.classList.remove('askRoadanimation')
            asking.value = false
          },2000)
        })
        const gameResult = ref([1])
        const gameResult2 = ref([2])
        //表格
        const secWidth = new Array(22)
        const secHeight = new Array(12)
        const topHeight = new Array(6)
        const BigEyesRoadWidth =new Array(44)
        // const bottomHeight = new Array(6)
        // const bottom1width = new Array(22)
        //基本資料
        const bigRoadColumn = ref(0)  //畫到第幾欄
        const bigRoadItemIndex = ref(0) //畫到第幾格
        const currentBigRoadResult = ref(0) //現在是哪個陣營
        const lastBigRoadResult = ref(0) //上次是哪個陣營
        const roadOverFlowerTimes = ref(0) //超出格子幾次
        const bigRoadTie = ref(false) //是否有和局狀態
        const bigRoadInit = ref(false) //大路是否初始化過(上桌時)
        let bigRoadColArr = reactive<any[]>([]) //大路的Array
        const addBigColumnCount = ref(0)
        for(let i = 0 ; i < secWidth.length ; i++){  //初始化大路陣列
          bigRoadColArr.push([0,0,0,0,0,0])
        }
        watch(gameEnd,()=>{
          //換薛時要重置遊戲
          console.log("偵測到換靴資訊重置路圖-大路")
          resetBigRoad()
        })
        watch(tableNum,()=>{
          // console.log("換桌側邊路圖重置")
          resetBigRoad()
        })
        // watch(beadPlateResult,()=>{
        //   console.log("偵測到朱朱陸")
        //   //最外層是暫時性的
        //     if(bigRoadInit.value){
        //     showBigRoadTest ()
        //     }else{  //沒有初始化過先畫
        //     showBigRoadInitTest ()
        //   }
        // })
        watch(bigRoadResult,()=>{
          resetBigRoad()
          showBigRoadInit()
          // if(bigRoadInit.value){
          //   // showBigRoad()
          //   showBigRoadAll()
          // }else{  //沒有初始化過先畫
          //   showBigRoadInit()
          // }
        })
        function removeAskRoadAnimation(){
          let column = document.querySelector(`.bigRoad-column${bigRoadColumn.value}`) as HTMLElement
          let road:HTMLElement
          if(bigRoadItemIndex.value>0){
           road = column.children[bigRoadItemIndex.value-1].firstChild as HTMLElement
          }else{
           road = column.children[bigRoadItemIndex.value].firstChild as HTMLElement
          }
          road.classList.remove('askRoadanimation')
        }
        function askRoad(roadNum:number){
          recordBigRoad(roadNum)  //1.紀錄陣營
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
              if(bigRoadColumn.value>=secWidth.length+(bigRoadColArr.length-secWidth.length)){     //溢出極限格子的時候要增加行數
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
            putBigRoad(roadNum,0)  //問路只有莊閒，不需要莊的數字
        }
        function transfromTie (currentSide:number,gameResult:number){
            if(currentSide==1){
              switch(gameResult){
                case proto.roadmap.Symbol.Tie:
                  return proto.roadmap.Symbol.BankerAndTie
                case proto.roadmap.Symbol.TieAndBankerPair:
                  return proto.roadmap.Symbol.BankerAndBankerPairAndTie
                case proto.roadmap.Symbol.TieAndPlayerPair:
                  return proto.roadmap.Symbol.BankerAndPlayerPairAndTie
                case proto.roadmap.Symbol.TieAndBothPair:
                  return proto.roadmap.Symbol.BankerAndBothPairAndTie
              }
            }else if(currentSide==2){
              switch(gameResult){
                case proto.roadmap.Symbol.Tie:
                  return proto.roadmap.Symbol.PlayerAndTie
                case proto.roadmap.Symbol.TieAndPlayerPair:
                  return proto.roadmap.Symbol.PlayerAndPlayerPairAndTie
                case proto.roadmap.Symbol.TieAndBankerPair:
                  return proto.roadmap.Symbol.PlayerAndBankerPairAndTie
                case proto.roadmap.Symbol.TieAndBothPair:
                  return proto.roadmap.Symbol.PlayerAndBothPairAndTie
              }
            }
            else if(currentSide==0){ //只針對第一顆是純和局時的狀態
            // console.log("一開始是和局的狀態")
                  switch(gameResult){  
                    case proto.roadmap.Symbol.Tie:
                      return proto.roadmap.Symbol.Tie

                    case proto.roadmap.Symbol.BankerAndTie:
                    case proto.roadmap.Symbol.Banker:
                      return proto.roadmap.Symbol.BankerAndTie

                    case proto.roadmap.Symbol.TieAndBankerPair:
                    case proto.roadmap.Symbol.BankerAndBankerPairAndTie:
                    case proto.roadmap.Symbol.BankerAndBankerPair:
                      return proto.roadmap.Symbol.BankerAndBankerPairAndTie

                    case proto.roadmap.Symbol.BankerAndPlayerPairAndTie:
                    case proto.roadmap.Symbol.BankerAndPlayerPair:
                      return proto.roadmap.Symbol.BankerAndPlayerPairAndTie

                    case proto.roadmap.Symbol.TieAndBothPair:
                    case proto.roadmap.Symbol.BankerAndBothPairAndTie:
                    case proto.roadmap.Symbol.BankerAndBothPair:
                      return proto.roadmap.Symbol.BankerAndBothPairAndTie

                    case proto.roadmap.Symbol.PlayerAndTie:
                    case proto.roadmap.Symbol.Player:
                      return proto.roadmap.Symbol.PlayerAndTie
                    
                    case proto.roadmap.Symbol.PlayerAndBankerPairAndTie:
                    case proto.roadmap.Symbol.PlayerAndBankerPair:
                      return proto.roadmap.Symbol.PlayerAndBankerPairAndTie

                    case proto.roadmap.Symbol.TieAndPlayerPair:
                    case proto.roadmap.Symbol.PlayerAndPlayerPairAndTie:
                    case proto.roadmap.Symbol.PlayerAndPlayerPair:
                      return proto.roadmap.Symbol.PlayerAndPlayerPairAndTie

                    case proto.roadmap.Symbol.TieAndBothPair:
                    case proto.roadmap.Symbol.PlayerAndBothPairAndTie:
                    case proto.roadmap.Symbol.PlayerAndBothPair:
                      return proto.roadmap.Symbol.PlayerAndBothPairAndTie
                  }
            }
        }
        function recordBigRoad (gameResult:number){
          switch(gameResult){
              case proto.roadmap.Symbol.Banker:
              case proto.roadmap.Symbol.BankerAndBankerPair:
              case proto.roadmap.Symbol.BankerAndPlayerPair:
              case proto.roadmap.Symbol.BankerAndBothPair:
              case proto.roadmap.Symbol.BankerAndTie:
              case proto.roadmap.Symbol.BankerAndBankerPairAndTie:
              case proto.roadmap.Symbol.BankerAndPlayerPairAndTie:
              case proto.roadmap.Symbol.BankerAndBothPairAndTie:
                currentBigRoadResult.value = 1   
                break
              case proto.roadmap.Symbol.Player:
              case proto.roadmap.Symbol.PlayerAndBankerPair:
              case proto.roadmap.Symbol.PlayerAndPlayerPair:
              case proto.roadmap.Symbol.PlayerAndBothPair:
              case proto.roadmap.Symbol.PlayerAndTie:
              case proto.roadmap.Symbol.PlayerAndBankerPairAndTie:
              case proto.roadmap.Symbol.PlayerAndPlayerPairAndTie:
              case proto.roadmap.Symbol.PlayerAndBothPairAndTie:
                currentBigRoadResult.value = 2   
                break
            }
        }
        function putBigRoad(gameResult:number,tieCount:number){
          // console.log('畫行',bigRoadColumn.value,'畫格',bigRoadItemIndex.value)
            let bigRoadCol = document.querySelector(`.bigRoad-column${bigRoadColumn.value}`) as HTMLElement
            let bigRoadColItem = bigRoadCol.children[bigRoadItemIndex.value].firstChild as HTMLElement
            switch(gameResult){
              case proto.roadmap.Symbol.Tie:
                bigRoadColItem.classList.add('big-T')
                break 
              case proto.roadmap.Symbol.Banker:
                bigRoadColItem.classList.add('big-B')
                break
              case proto.roadmap.Symbol.Player:
                bigRoadColItem.classList.add('big-P')
                break
              case proto.roadmap.Symbol.BankerAndBankerPair:
                bigRoadColItem.classList.add('big-B-BPair')
                break
              case proto.roadmap.Symbol.BankerAndPlayerPair:
                bigRoadColItem.classList.add('big-B-PPair')
                break
              case proto.roadmap.Symbol.BankerAndBothPair:
                bigRoadColItem.classList.add('big-B-BothPair')
                break
              case proto.roadmap.Symbol.PlayerAndBankerPair:
                bigRoadColItem.classList.add('big-P-BPair')
                break
              case proto.roadmap.Symbol.PlayerAndPlayerPair:
                bigRoadColItem.classList.add('big-P-PPair')
                break
              case proto.roadmap.Symbol.PlayerAndBothPair:
                bigRoadColItem.classList.add('big-P-BothPair')
                break
              case proto.roadmap.Symbol.BankerAndTie:
                if(bigRoadColItem.classList[0]){
                  bigRoadColItem.classList.replace(bigRoadColItem.classList[0],'big-BT')
                }else{
                  bigRoadColItem.classList.add('big-BT')
                }
                break
              case proto.roadmap.Symbol.BankerAndBankerPairAndTie:
                if(bigRoadColItem.classList[0]){
                  bigRoadColItem.classList.replace(bigRoadColItem.classList[0],'big-BT-BPair')
                }else{
                  bigRoadColItem.classList.add('big-BT-BPair')
                }
                break
              case proto.roadmap.Symbol.BankerAndPlayerPairAndTie:
                if(bigRoadColItem.classList[0]){
                  bigRoadColItem.classList.replace(bigRoadColItem.classList[0],'big-BT-PPair')
                }else{
                  bigRoadColItem.classList.add('big-BT-PPair')
                }
                break
              case proto.roadmap.Symbol.BankerAndBothPairAndTie:
                if(bigRoadColItem.classList[0]){
                  bigRoadColItem.classList.replace(bigRoadColItem.classList[0],'big-BT-BothPair')
                }else{
                  bigRoadColItem.classList.add('big-BT-BothPair')
                }
                break
              case proto.roadmap.Symbol.PlayerAndTie:
                if(bigRoadColItem.classList[0]){
                  bigRoadColItem.classList.replace(bigRoadColItem.classList[0],'big-PT')
                }else{
                  bigRoadColItem.classList.add('big-PT')
                }
                break
              case proto.roadmap.Symbol.PlayerAndBankerPairAndTie:
                if(bigRoadColItem.classList[0]){
                  bigRoadColItem.classList.replace(bigRoadColItem.classList[0],'big-PT-BPair')
                }else{
                  bigRoadColItem.classList.add('big-PT-BPair')
                }
                break
              case proto.roadmap.Symbol.PlayerAndPlayerPairAndTie:
                if(bigRoadColItem.classList[0]){
                  bigRoadColItem.classList.replace(bigRoadColItem.classList[0],'big-PT-PPair')
                }else{
                  bigRoadColItem.classList.add('big-PT-PPair')
                }
                break
              case proto.roadmap.Symbol.PlayerAndBothPairAndTie:
                if(bigRoadColItem.classList[0]){
                  bigRoadColItem.classList.replace(bigRoadColItem.classList[0],'big-PT-BothPair')
                }else{
                  bigRoadColItem.classList.add('big-PT-BothPair')
                }
                break
            }
            if(tieCount>0){  //貼上和局的數字
              let tienumber = document.createElement('div')
              tienumber.classList.add(`tie${tieCount}`)
              bigRoadColItem.appendChild(tienumber)
            }
            bigRoadColArr[bigRoadColumn.value][bigRoadItemIndex.value] = 1  //代表那一格已經畫過了
            bigRoadItemIndex.value ++  //增加當前的index
            lastBigRoadResult.value = currentBigRoadResult.value //將這次陣營記錄到下一次的陣營中
            // console.log("現在是第",bigRoadColumn.value,"行；","下一格格子",bigRoadItemIndex.value)
        }
        function testshowBigRoad (winner:number) {
          console.log('畫新的之前的行格',bigRoadColumn.value,bigRoadItemIndex.value)
          if(winner==3 || winner==10 || winner==11 || winner==12){
              winner = transfromTie(currentBigRoadResult.value,winner) as number
            }
            console.log('轉換後',winner)
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
              if(bigRoadColumn.value>=secWidth.length+(bigRoadColArr.length-secWidth.length)){     //溢出極限格子的時候要增加行數
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
            //上一顆如果是和的  且現在第0行第1格的話
            if(lastBigRoadResult.value==0 && bigRoadItemIndex.value==1 && bigRoadColumn.value==0){ //應付一開始是和局3的狀態
              bigRoadItemIndex.value--
              console.log('前一局是和局')
               switch(winner){
                case 1:
                  winner = proto.roadmap.Symbol.BankerAndTie
                  break
                case 2:
                  winner = proto.roadmap.Symbol.PlayerAndTie
                  break
                //還要新增所有其他狀況-->和局
              }
            } 
            putBigRoad(winner,0)
          // })
        }
        function showBigRoadInitTest () {
          // console.log("畫大路初始化",bigRoadResult.value.columns)
          beadPlateResult.value.blocks.forEach((i:any)=>{ 
            if(i.symbol==3 || i.symbol==10 || i.symbol==11 || i.symbol==12){
              i.symbol = transfromTie(currentBigRoadResult.value,i.symbol)
            }
            // console.log('轉換後',i)
            recordBigRoad(i.symbol)  //1.紀錄陣營-->可能要移到轉化陣營之後再紀錄!!!!
            if(i.symbol == 13 || i.symbol == 14 || i.symbol ==15 || i.symbol == 16 || i.symbol ==17 ||
                i.symbol == 18 || i.symbol == 19 || i.symbol == 20 ){
                  bigRoadTie.value = true
                  console.log("是否和局",bigRoadTie.value)
            }
            // console.log("陣營",currentBigRoadResult.value)
            //換行一:不同陣營
            if(currentBigRoadResult.value!==lastBigRoadResult.value && currentBigRoadResult.value!==0 && lastBigRoadResult.value!==0){
              // console.log("換陣營前","行",bigRoadColumn.value,"格",bigRoadItemIndex.value)
              if(roadOverFlowerTimes.value!=0){ //第一次恢復的時候
                if(bigRoadItemIndex.value-1<1){  //因為上一次已經被+過了，要減回來
                  bigRoadColumn.value++
                  // console.log("在第0格滿出，直接+行數","行",bigRoadColumn.value)
                  roadOverFlowerTimes.value = 0
                }else{
                  bigRoadColumn.value = bigRoadColumn.value-roadOverFlowerTimes.value+1
                  roadOverFlowerTimes.value = 0
                }
                // console.log("溢出後恢復","行",bigRoadColumn.value)
              }else{
                bigRoadColumn.value++
              }
              if(bigRoadColumn.value>=secWidth.length+(bigRoadColArr.length-secWidth.length)){ //溢出極限格子的時候要增加行數
                // console.log("滿了+行")
                addBigRoadColumn()
              }  
               bigRoadItemIndex.value = 0
              //  console.log("格",bigRoadItemIndex.value)
            }
            //換行二:溢出換行
            //當下一次溢出大於前一次溢出時，bigRoadItemIndex.value要再-1
            //溢出時如果遇到和局，其實不需要+行?!
            if(bigRoadColArr[bigRoadColumn.value][bigRoadItemIndex.value]!==0 || bigRoadItemIndex.value>5){
              // console.log("連贏溢出",bigRoadColArr[bigRoadColumn.value][bigRoadItemIndex.value],bigRoadColumn.value,bigRoadItemIndex.value)
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
              // console.log("連贏溢出","行",bigRoadColumn.value,"格",bigRoadItemIndex.value,"溢出次數",roadOverFlowerTimes.value)
                  for(let i = bigRoadItemIndex.value ; i < 6 ; i++ ){  //只有溢出時才要這麼做:把溢出當格以下的格子都變成1
                    bigRoadColArr[bigRoadColumn.value][i] = 1
                  }
            }
             if(bigRoadTie.value && bigRoadItemIndex.value>=0){  //假如是和局狀態
              // console.log('偵測到和局')
              if(bigRoadColArr[bigRoadColumn.value][bigRoadItemIndex.value]!==0 || bigRoadItemIndex.value>5){ //連贏的時候必須要--col和index
                // bigRoadColumn.value-- //不要往下加一行
                roadOverFlowerTimes.value-- //不要算溢出
                bigRoadTie.value = false
                // console.log("和局溢出狀態","畫行",bigRoadColumn.value,"畫格",bigRoadItemIndex.value,"溢出次數",roadOverFlowerTimes.value)
              }else{
                if(bigRoadItemIndex.value>0){
                  bigRoadItemIndex.value--
                }
                // console.log("和局狀態","畫行",bigRoadColumn.value,'畫格',bigRoadItemIndex.value)
                bigRoadTie.value = false
              }
            }
            if(lastBigRoadResult.value==0 && bigRoadItemIndex.value==1 && bigRoadColumn.value==0){ //應付一開始是和局3的狀態
              bigRoadItemIndex.value--
              switch(i.symbol){
                case 1:
                  i.symbol = proto.roadmap.Symbol.BankerAndTie
                  break
                case 2:
                  i.symbol = proto.roadmap.Symbol.PlayerAndTie
                  break
              }
            } 
            putBigRoad(i.symbol,i.tieCount)
          })
          bigRoadInit.value = true
        }
        function showBigRoadTest () {
          console.log(beadPlateResult.value.blocks[beadPlateResult.value.blocks.length-1])
          let item = beadPlateResult.value.blocks[beadPlateResult.value.blocks.length-1]
          // let item = bigRoadResult.value.columns[bigRoadResult.value.columns.length-1].blocks[bigRoadResult.value.columns[bigRoadResult.value.columns.length-1].blocks.length-1]  //只取最後一條col的最後一個值出來畫
            if(item==3 || item==10 || item==11 || item==12){
              item = transfromTie(currentBigRoadResult.value,item)
              console.log("轉換畫",item)
            }
            recordBigRoad(item.symbol)  //1.紀錄陣營
            if(item == 13 || item == 14 || item ==15 || item == 16 || item ==17 ||
                item == 18 || item == 19 || item == 20){
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
            if(lastBigRoadResult.value==0 && bigRoadItemIndex.value==1 && bigRoadColumn.value==0){ //應付開局為和局3的狀態
              bigRoadItemIndex.value--
               switch(item){
                case 1:
                  item = proto.roadmap.Symbol.BankerAndTie
                  break
                case 2:
                  item = proto.roadmap.Symbol.PlayerAndTie
                  break
              }
            } 
            putBigRoad(item.symbol,0)
        }
        function showBigRoadInit() {
          // console.log("畫大路初始化",bigRoadResult.value.columns)
          bigRoadResult.value.columns.forEach((i:any)=>{ 
            // console.log(i.blocks) //初始化時所有都畫
            i.blocks.forEach((item:any)=>{
              recordBigRoad(item.symbol)  //1.紀錄陣營
            // if(item == 13 || item == 14 || item ==15 || item == 16 || item ==17 ||
            //     item == 18 || item == 19 || item == 20){
            //       bigRoadTie.value = true
            //       // console.log("是否和局",bigRoadTie.value)
            // }
            //換行一:不同陣營
            if(currentBigRoadResult.value!==lastBigRoadResult.value && currentBigRoadResult.value!==0 && lastBigRoadResult.value!==0){
              // console.log("換陣營前","行",bigRoadColumn.value,"格",bigRoadItemIndex.value)
              if(roadOverFlowerTimes.value!=0){ //第一次恢復的時候
                if(bigRoadItemIndex.value-1<1){  //因為上一次已經被+過了，要減回來
                  bigRoadColumn.value++
                  // console.log("在第0格滿出，直接+行數","行",bigRoadColumn.value)
                  roadOverFlowerTimes.value = 0
                }else{
                  bigRoadColumn.value = bigRoadColumn.value-roadOverFlowerTimes.value+1
                  roadOverFlowerTimes.value = 0
                }
                // console.log("溢出後恢復","行",bigRoadColumn.value)
              }else{
                bigRoadColumn.value++
              }
              if(bigRoadColumn.value>=secWidth.length+(bigRoadColArr.length-secWidth.length)){ //溢出極限格子的時候要增加行數
                // console.log("滿了+行")
                addBigRoadColumn()
              }  
               bigRoadItemIndex.value = 0
              //  console.log("格",bigRoadItemIndex.value)
            }
            //換行二:溢出換行
            //當下一次溢出大於前一次溢出時，bigRoadItemIndex.value要再-1
            //溢出時如果遇到和局，其實不需要+行?!
            if(bigRoadColArr[bigRoadColumn.value][bigRoadItemIndex.value]!==0 || bigRoadItemIndex.value>5){
              // console.log("連贏溢出")
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
              // console.log("連贏溢出","行",bigRoadColumn.value,"格",bigRoadItemIndex.value,"溢出次數",roadOverFlowerTimes.value)
                  for(let i = bigRoadItemIndex.value ; i < 6 ; i++ ){  //只有溢出時才要這麼做:把溢出當格以下的格子都變成1
                    bigRoadColArr[bigRoadColumn.value][i] = 1
                  }
            }
            //  if(bigRoadTie.value && bigRoadItemIndex.value>=0){  //假如是和局狀態
            //   // console.log('偵測到和局')
            //   if(bigRoadColArr[bigRoadColumn.value][bigRoadItemIndex.value]!==0 || bigRoadItemIndex.value>5){ //連贏的時候必須要--col和index
            //     // bigRoadColumn.value-- //不要往下加一行
            //     roadOverFlowerTimes.value-- //不要算溢出
            //     bigRoadTie.value = false
            //     // console.log("和局溢出狀態","畫行",bigRoadColumn.value,"畫格",bigRoadItemIndex.value,"溢出次數",roadOverFlowerTimes.value)
            //   }else{
            //     if(bigRoadItemIndex.value>0){
            //       bigRoadItemIndex.value--
            //     }
            //     // console.log("和局狀態","畫行",bigRoadColumn.value,'畫格',bigRoadItemIndex.value)
            //     bigRoadTie.value = false
            //   }
            // }
            putBigRoad(item.symbol,item.tieCount)
            })
          })
          bigRoadInit.value = true
          //  console.log('大路增加的欄數',addBigColumnCount.value)
        }
        function showBigRoad () {
          let item = bigRoadResult.value.columns[bigRoadResult.value.columns.length-1].blocks[bigRoadResult.value.columns[bigRoadResult.value.columns.length-1].blocks.length-1]  //只取最後一條col的最後一個值出來畫
            console.log("畫最後一個item",item)
            recordBigRoad(item)  //1.紀錄陣營
            // if(item == 13 || item == 14 || item ==15 || item == 16 || item ==17 ||
            //     item == 18 || item == 19 || item == 20){
            //       bigRoadTie.value = true
            //       console.log("是否和局",bigRoadTie.value)
            // }
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
            //  if(bigRoadTie.value && bigRoadItemIndex.value>=0){  //假如是和局狀態
            //   console.log('偵測到和局')
            //   if(bigRoadColArr[bigRoadColumn.value][bigRoadItemIndex.value]!==0 || bigRoadItemIndex.value>5){ //連贏的時候必須要--col和index
            //     // bigRoadColumn.value-- //不要往下加一行
            //     roadOverFlowerTimes.value-- //不要算溢出
            //     bigRoadTie.value = false
            //     console.log("和局溢出狀態","畫行",bigRoadColumn.value,"畫格",bigRoadItemIndex.value,"溢出次數",roadOverFlowerTimes.value)
            //   }else{
            //     if(bigRoadItemIndex.value>0){
            //       bigRoadItemIndex.value--
            //     }
            //     console.log("和局狀態","畫行",bigRoadColumn.value,'畫格',bigRoadItemIndex.value)
            //     bigRoadTie.value = false
            //   }
            // }
            putBigRoad(item.symbol,0)
        }
        function showBigRoadAll () { //每次都重畫的版本
          // resetBigRoad()
          console.log('大路增加的欄數',addBigColumnCount.value)
          bigRoadColumn.value = 0+addBigColumnCount.value
          bigRoadItemIndex.value = 0
          currentBigRoadResult.value = 0
          lastBigRoadResult.value = 0
          roadOverFlowerTimes.value = 0
          // console.log(bigRoadColumn.value,bigRoadItemIndex.value,currentBigRoadResult.value,lastBigRoadResult.value,roadOverFlowerTimes.value,bigRoadColArr)
          //大路陣列也要規0
         for(let i = 0 ; i < secWidth.length ; i++){  //初始化大路陣列
            bigRoadColArr[i] = [0,0,0,0,0,0]
          }
          bigRoadResult.value.columns.forEach((i:any)=>{
            // console.log(i)
            i.blocks.forEach((item:any)=>{
               recordBigRoad(item)  //1.紀錄陣營
              // if(item == 13 || item == 14 || item ==15 || item == 16 || item ==17 ||
              //   item == 18 || item == 19 || item == 20){
              //     bigRoadTie.value = true
              //     console.log("是否和局",bigRoadTie.value)
              // }
            //換行一:不同陣營
            if(currentBigRoadResult.value!==lastBigRoadResult.value && currentBigRoadResult.value!==0 && lastBigRoadResult.value!==0){
              // console.log("換陣營前","行",bigRoadColumn.value,"格",bigRoadItemIndex.value)
              if(roadOverFlowerTimes.value!=0){ //第一次恢復的時候
                if(bigRoadItemIndex.value-1<1){  //因為上一次已經被+過了，要減回來
                  bigRoadColumn.value++
                  // console.log("在第0格滿出，直接+行數","行",bigRoadColumn.value)
                  roadOverFlowerTimes.value = 0
                }else{
                  bigRoadColumn.value = bigRoadColumn.value-roadOverFlowerTimes.value+1
                  roadOverFlowerTimes.value = 0
                }
                // console.log("溢出後恢復","行",bigRoadColumn.value)
              }else{
                bigRoadColumn.value++
              }
              if(bigRoadColumn.value>=secWidth.length+(bigRoadColArr.length-secWidth.length)){ //溢出極限格子的時候要增加行數
                // console.log("滿了+行")
                addBigRoadColumn()
              }  
               bigRoadItemIndex.value = 0
              //  console.log("格",bigRoadItemIndex.value)
            }
            //換行二:溢出換行
            //當下一次溢出大於前一次溢出時，bigRoadItemIndex.value要再-1
            //溢出時如果遇到和局，其實不需要+行?!
            if(bigRoadColArr[bigRoadColumn.value][bigRoadItemIndex.value]!==0 || bigRoadItemIndex.value>5){
              // console.log("連贏溢出")
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
              // console.log("連贏溢出","行",bigRoadColumn.value,"格",bigRoadItemIndex.value,"溢出次數",roadOverFlowerTimes.value)
                  for(let i = bigRoadItemIndex.value ; i < 6 ; i++ ){  //只有溢出時才要這麼做:把溢出當格以下的格子都變成1
                    bigRoadColArr[bigRoadColumn.value][i] = 1
                  }
            }
            //  if(bigRoadTie.value && bigRoadItemIndex.value>=0){  //假如是和局狀態
            //   console.log('偵測到和局')
            //   if(bigRoadColArr[bigRoadColumn.value][bigRoadItemIndex.value]!==0 || bigRoadItemIndex.value>5){ //連贏的時候必須要--col和index
            //     // bigRoadColumn.value-- //不要往下加一行
            //     roadOverFlowerTimes.value-- //不要算溢出
            //     bigRoadTie.value = false
            //     console.log("和局溢出狀態","畫行",bigRoadColumn.value,"畫格",bigRoadItemIndex.value,"溢出次數",roadOverFlowerTimes.value)
            //   }else{
            //     if(bigRoadItemIndex.value>0){
            //       bigRoadItemIndex.value--
            //     }
            //     console.log("和局狀態","畫行",bigRoadColumn.value,'畫格',bigRoadItemIndex.value)
            //     bigRoadTie.value = false
            //   }
            // }
            // console.log(bigRoadColumn.value,bigRoadItemIndex.value,bigRoadColArr)
            putBigRoad(item,0)
            })
           })
            console.log('最後大路增加的欄數',addBigColumnCount.value)
        }
        function addBigRoadColumn () {  //滿格時一次增加一格的方法
          let bigRoad = document.querySelector('.bigRoad') as HTMLElement  
          let firstChild = bigRoad.firstElementChild as HTMLElement //抓取第一個元素
          bigRoad.removeChild(firstChild) //刪除第一行
          let newCol = document.createElement('div')
          newCol.classList.add('bigRoad-column')
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
          // console.log("加了一行","行",bigRoadColumn.value)
          addBigColumnCount.value++
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
          addBigColumnCount.value = 0
          //大路陣列也要規0
          let newbigRoadArr = []
          
          for(let i = 0 ; i < secWidth.length ; i++){  //初始化大路陣列
            newbigRoadArr [i] = [0,0,0,0,0,0]
          }
          bigRoadColArr = newbigRoadArr
          bigRoadTie.value = false
          bigRoadInit.value = false
        }
        return {
          //data
          topHeight,BigEyesRoadWidth ,secWidth,secHeight,
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
.test6{
  bottom:0;
  left:15%;
}
.test7{
  bottom:0;
  left:20%;
}
.test8{
  bottom:0;
  left:25%;
}
.test9{
  bottom:30%;
  left:25%;
}
.test10{
  bottom:45%;
  left:25%;
}
</style>