<template>
    <div class="cockroachRoad d-flex w-50">
        <div class="cockroachRoad-column" :class="[`cockroachRoad-column${index}`]" v-for="(b1,index) in bottom1width" :key="index">
          <div class="cockroachRoad-item" v-for="(bi,index) in bottomHeight" :key="index">
            <div></div>
          </div>
        </div>
      </div>
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
        const cockroachRoadColumn = ref(0)  //畫到第幾欄
        const cockroachRoadItemIndex = ref(0) //畫到第幾格
        const currentcockroachRoadResult = ref(0) //現在是哪個陣營
        const lastcockroachRoadResult = ref(0) //上次是哪個陣營
        const roadOverFlowerTimes = ref(0) //超出格子幾次
        const cockroachRoadInit = ref(false) //大路是否初始化過(上桌時)
        let cockroachRoadColArr = reactive<any[]>([]) //大路的Array
        const addCockroachRoadColumnCount = ref(0)
        for(let i = 0 ; i < bottom1width.length ; i++){  //初始化大路陣列
          cockroachRoadColArr.push([0,0,0,0,0,0])
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
        const cockroachRoadResult = computed(()=>{
          return store.state.roadmap.map.cockroachRoad
        })
        //監聽
        watch(gameEnd,()=>{
          //換薛時要重置遊戲
          console.log("偵測到換靴資訊重置路圖-蟑螂路")
          resetcockroachRoad()
        })
        watch(tableNum,()=>{
          console.log("換桌-重置蟑螂路")
          resetcockroachRoad()
        })
        watch(cockroachRoadResult,()=>{
          console.log("偵測到蟑螂路")
          if(cockroachRoadInit.value){
            showCockroachRoad()
          }else{
            showCockroachRoadInit()
          }
        })
        function recordRoad (gameResult:number){
          switch(gameResult){
              case 1:
                currentcockroachRoadResult.value = 1   
                break
              case 2:
                currentcockroachRoadResult.value = 2   
                break
            }
        }
        function putRoad(gameResult:number){
         let RoadCol = document.querySelector(`.cockroachRoad-column${cockroachRoadColumn.value}`) as HTMLElement
         console.log(RoadCol)
            let bigRoadColItem = RoadCol.children[cockroachRoadItemIndex .value].firstChild as HTMLElement
            switch(gameResult){
            case 1:
              bigRoadColItem.classList.add('cockroach-red')
              break
            case 2:
              bigRoadColItem.classList.add('cockroach-blue')
              break
            }
            cockroachRoadColArr[cockroachRoadColumn.value][cockroachRoadItemIndex .value] = 1  //代表那一格已經畫過了
            cockroachRoadItemIndex .value ++  //增加當前的index
            lastcockroachRoadResult.value = currentcockroachRoadResult.value //將這次陣營記錄到下一次的陣營中
            // console.log("現在是第",cockroachRoadColumn.value,"行；","下一格格子",bigRoadItemIndex.value)
        }
        function resetcockroachRoad(){}
        function showCockroachRoad(){}
        function showCockroachRoadInit(){}
        return {
            //data
            bottomHeight,
            bottom1width,
        }
    }
})
</script>