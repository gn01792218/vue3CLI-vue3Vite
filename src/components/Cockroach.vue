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
        return {
            //data
            bottomHeight,
            bottom1width,
        }
    }
})
</script>