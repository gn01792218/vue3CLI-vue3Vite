<template>
    <div class="smallRoad d-flex w-50">
        <div class="smallRoad-column" :class="[`smallRoad-column${index}`,{'boundary-right':index===21}]" v-for="(b1,index) in bottom1width" :key="index">
          <div class="smallRoad-item" v-for="(bi,index) in bottomHeight" :key="index">
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
        const smallRoadColumn = ref(0)  //畫到第幾欄
        const smallRoadItemIndex = ref(0) //畫到第幾格
        const currentsmallRoadResult = ref(0) //現在是哪個陣營
        const lastsmallRoadResult = ref(0) //上次是哪個陣營
        const roadOverFlowerTimes = ref(0) //超出格子幾次
        const smallRoadInit = ref(false) //大路是否初始化過(上桌時)
        let smallRoadColArr = reactive<any[]>([]) //大路的Array
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
       
        return {
            //data
            bottomHeight,
            bottom1width,
        }
    }
})
</script>