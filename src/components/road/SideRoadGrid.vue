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
          <div></div>
        </div>
      </div>
    </section>
    <!-- BigEyesRoad -->
    <BigEyesRoad/>
    <section class="bottomRoad d-flex sideWidth position-absolute">
    <!-- smallRoadGrid -->
    <SmallRoad/>
      <!-- <div class="smallRoad d-flex w-50">
        <div class="smallRoad-column" :class="[`smallRoad-column${index}`,{'boundary-right':index===21}]" v-for="(b1,index) in bottom1width" :key="index">
          <div class="smallRoad-item" v-for="(bi,index) in bottomHeight" :key="index">
            <div></div>
          </div>
        </div>
      </div> -->
      <!-- cockroachRoad -->
      <Cockroach/>
      <!-- <div class="cockroachRoad d-flex w-50">
        <div class="cockroachRoad-column" :class="[`cockroachRoad-column${index}`]" v-for="(b1,index) in bottom1width" :key="index">
          <div class="cockroachRoad-item" v-for="(bi,index) in bottomHeight" :key="index">
            <div></div>
          </div>
        </div>
      </div> -->
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
        console.log('大路陣列長度',bigRoadColArr.length)
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
          console.log("換桌側邊路圖重置")
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
        function transfromTie (currentSide:number,gameResult:number){
            if(currentSide==1){
              switch(gameResult){
                case proto.roadmap.Block.Tie:
                  return proto.roadmap.Block.BankerAndTie
                case proto.roadmap.Block.TieAndBankerPair:
                  return proto.roadmap.Block.BankerAndBankerPairAndTie
                case proto.roadmap.Block.TieAndPlayerPair:
                  return proto.roadmap.Block.BankerAndPlayerPairAndTie
                case proto.roadmap.Block.TieAndBothPair:
                  return proto.roadmap.Block.BankerAndBothPairAndTie
              }
            }else if(currentSide==2){
              switch(gameResult){
                case proto.roadmap.Block.Tie:
                  return proto.roadmap.Block.PlayerAndTie
                case proto.roadmap.Block.TieAndPlayerPair:
                  return proto.roadmap.Block.PlayerAndPlayerPairAndTie
                case proto.roadmap.Block.TieAndBankerPair:
                  return proto.roadmap.Block.PlayerAndBankerPairAndTie
                case proto.roadmap.Block.TieAndBothPair:
                  return proto.roadmap.Block.PlayerAndBothPairAndTie
              }
            }
            else if(currentSide==0){ //只針對第一顆是純和局時的狀態
            // console.log("一開始是和局的狀態")
                  switch(gameResult){  
                    case proto.roadmap.Block.Tie:
                      return proto.roadmap.Block.Tie

                    case proto.roadmap.Block.BankerAndTie:
                    case proto.roadmap.Block.Banker:
                      return proto.roadmap.Block.BankerAndTie

                    case proto.roadmap.Block.TieAndBankerPair:
                    case proto.roadmap.Block.BankerAndBankerPairAndTie:
                    case proto.roadmap.Block.BankerAndBankerPair:
                      return proto.roadmap.Block.BankerAndBankerPairAndTie

                    case proto.roadmap.Block.BankerAndPlayerPairAndTie:
                    case proto.roadmap.Block.BankerAndPlayerPair:
                      return proto.roadmap.Block.BankerAndPlayerPairAndTie

                    case proto.roadmap.Block.TieAndBothPair:
                    case proto.roadmap.Block.BankerAndBothPairAndTie:
                    case proto.roadmap.Block.BankerAndBothPair:
                      return proto.roadmap.Block.BankerAndBothPairAndTie

                    case proto.roadmap.Block.PlayerAndTie:
                    case proto.roadmap.Block.Player:
                      return proto.roadmap.Block.PlayerAndTie
                    
                    case proto.roadmap.Block.PlayerAndBankerPairAndTie:
                    case proto.roadmap.Block.PlayerAndBankerPair:
                      return proto.roadmap.Block.PlayerAndBankerPairAndTie

                    case proto.roadmap.Block.TieAndPlayerPair:
                    case proto.roadmap.Block.PlayerAndPlayerPairAndTie:
                    case proto.roadmap.Block.PlayerAndPlayerPair:
                      return proto.roadmap.Block.PlayerAndPlayerPairAndTie

                    case proto.roadmap.Block.TieAndBothPair:
                    case proto.roadmap.Block.PlayerAndBothPairAndTie:
                    case proto.roadmap.Block.PlayerAndBothPair:
                      return proto.roadmap.Block.PlayerAndBothPairAndTie
                  }
            }
        }
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
          // console.log('畫行',bigRoadColumn.value,'畫格',bigRoadItemIndex.value)
            let bigRoadCol = document.querySelector(`.bigRoad-column${bigRoadColumn.value}`) as HTMLElement
            let bigRoadColItem = bigRoadCol.children[bigRoadItemIndex.value].firstChild as HTMLElement
            switch(gameResult){
            case proto.roadmap.Block.Tie:
              bigRoadColItem.classList.add('big-T')
              break 
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
              if(bigRoadColItem.classList[0]){
                bigRoadColItem.classList.replace(bigRoadColItem.classList[0],'big-BT')
              }else{
                bigRoadColItem.classList.add('big-BT')
              }
              break
            case proto.roadmap.Block.BankerAndBankerPairAndTie:
              if(bigRoadColItem.classList[0]){
                 bigRoadColItem.classList.replace(bigRoadColItem.classList[0],'big-BT-BPair')
              }else{
                bigRoadColItem.classList.add('big-BT-BPair')
              }
              break
            case proto.roadmap.Block.BankerAndPlayerPairAndTie:
              if(bigRoadColItem.classList[0]){
                bigRoadColItem.classList.replace(bigRoadColItem.classList[0],'big-BT-PPair')
              }else{
                bigRoadColItem.classList.add('big-BT-PPair')
              }
              break
            case proto.roadmap.Block.BankerAndBothPairAndTie:
              if(bigRoadColItem.classList[0]){
                 bigRoadColItem.classList.replace(bigRoadColItem.classList[0],'big-BT-BothPair')
              }else{
                bigRoadColItem.classList.add('big-BT-BothPair')
              }
              break
            case proto.roadmap.Block.PlayerAndTie:
              if(bigRoadColItem.classList[0]){
                bigRoadColItem.classList.replace(bigRoadColItem.classList[0],'big-PT')
              }else{
                bigRoadColItem.classList.add('big-PT')
              }
              break
            case proto.roadmap.Block.PlayerAndBankerPairAndTie:
              if(bigRoadColItem.classList[0]){
                bigRoadColItem.classList.replace(bigRoadColItem.classList[0],'big-PT-BPair')
              }else{
                bigRoadColItem.classList.add('big-PT-BPair')
              }
              break
            case proto.roadmap.Block.PlayerAndPlayerPairAndTie:
              if(bigRoadColItem.classList[0]){
                bigRoadColItem.classList.replace(bigRoadColItem.classList[0],'big-PT-PPair')
              }else{
                bigRoadColItem.classList.add('big-PT-PPair')
              }
              break
            case proto.roadmap.Block.PlayerAndBothPairAndTie:
              if(bigRoadColItem.classList[0]){
                bigRoadColItem.classList.replace(bigRoadColItem.classList[0],'big-PT-BothPair')
              }else{
                bigRoadColItem.classList.add('big-PT-BothPair')
              }
              break
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
                  winner = proto.roadmap.Block.BankerAndTie
                  break
                case 2:
                  winner = proto.roadmap.Block.PlayerAndTie
                  break
                //還要新增所有其他狀況-->和局
              }
            } 
            putBigRoad(winner)
          // })
        }
        function showBigRoadInitTest () {
          // console.log("畫大路初始化",bigRoadResult.value.columns)
          beadPlateResult.value.blocks.forEach((i:any)=>{ 
            if(i==3 || i==10 || i==11 || i==12){
              i = transfromTie(currentBigRoadResult.value,i)
            }
            // console.log('轉換後',i)
            recordBigRoad(i)  //1.紀錄陣營-->可能要移到轉化陣營之後再紀錄!!!!
            if(i == 13 || i == 14 || i ==15 || i == 16 || i ==17 ||
                i == 18 || i == 19 || i == 20 ){
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
              switch(i){
                case 1:
                  i = proto.roadmap.Block.BankerAndTie
                  break
                case 2:
                  i = proto.roadmap.Block.PlayerAndTie
                  break
              }
            } 
            putBigRoad(i)
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
            recordBigRoad(item)  //1.紀錄陣營
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
                  item = proto.roadmap.Block.BankerAndTie
                  break
                case 2:
                  item = proto.roadmap.Block.PlayerAndTie
                  break
              }
            } 
            putBigRoad(item)
        }
        function showBigRoadInit() {
          // console.log("畫大路初始化",bigRoadResult.value.columns)
          bigRoadResult.value.columns.forEach((i:any)=>{ 
            // console.log(i.blocks) //初始化時所有都畫
            i.blocks.forEach((item:any)=>{
              recordBigRoad(item)  //1.紀錄陣營
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
            putBigRoad(item)
            })
          })
          bigRoadInit.value = true
           console.log('大路增加的欄數',addBigColumnCount.value)
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
            putBigRoad(item)
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
            putBigRoad(item)
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