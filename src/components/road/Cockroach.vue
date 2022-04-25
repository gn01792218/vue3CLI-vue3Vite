<template>
  <div class="cockroachRoad d-flex w-50">
    <div
      class="cockroachRoad-column"
      :class="[`cockroachRoad-column${index}`]"
      v-for="(b1, index) in bottom1width"
      :key="index"
    >
      <div
        class="cockroachRoad-item"
        v-for="(bi, index) in bottomHeight"
        :key="index"
      >
        <div></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch, reactive } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default defineComponent({
  setup() {
    //reloadRoadMap是由footer的閃電按鈕發出的重整路圖機制。
    window.addEventListener("reloadRoadMap", () => {
      console.log("偵測重連-畫蟑螂路");
      resetcockroachRoad();
      showCockroachRoad();
    });
    //基本資料
    const bottomHeight = new Array(6);
    const bottom1width = new Array(22);
    const cockroachRoadColumn = ref(0); //畫到第幾欄
    const cockroachRoadItemIndex = ref(0); //畫到第幾格
    const currentcockroachRoadResult = ref(0); //現在是哪個陣營
    const lastcockroachRoadResult = ref(0); //上次是哪個陣營
    const roadOverFlowerTimes = ref(0); //超出格子幾次
    const lastcockroachRoadDataLength = ref(0);
    const lastcockroachDataColumnLength = ref(0);
    let cockroachRoadColArr = reactive<any[]>([]); //大路的Array
    const askRoadtimer = ref(); //問路的計時器
    const asking = ref(false); //是否在問路中
    const addCockroachRoadColumnCount = ref(0);
    for (let i = 0; i < bottom1width.length; i++) {
      //初始化大路陣列
      cockroachRoadColArr.push([0, 0, 0, 0, 0, 0]);
    }
    //路由
    const route = useRoute();
    const tableNum = computed(() => {
      return route.params.tableId;
    });
    //vuex
    const store = useStore();
    const gameEnd = computed(() => {
      return store.state.dealer.end;
    });
    const cockroachRoadResult = computed(() => {
      return store.state.roadmap.map.cockroachRoad;
    });
    const askRoadRecall = computed(() => {
      return store.state.roadmap.askRoadReCall;
    });
    //監聽
    watch(askRoadRecall, () => {
      asking.value = true;
      //1.先清除計時器
      if (askRoadtimer.value) {
        clearTimeout(askRoadtimer.value);
      }
      //2.重置路圖
      resetcockroachRoad();
      showCockroachRoad();
      //3.放置問路
      let roadNum = askRoadRecall.value.cockroachRoadNext.symbol;
      askRoad(roadNum);
      //4.添加動畫
      let column = document.querySelector(
        `.cockroachRoad-column${cockroachRoadColumn.value}`
      ) as HTMLElement;
      let road: HTMLElement;
      if (cockroachRoadItemIndex.value > 0) {
        road = column.children[cockroachRoadItemIndex.value - 1]
          .firstChild as HTMLElement;
      } else {
        road = column.children[cockroachRoadItemIndex.value]
          .firstChild as HTMLElement;
      }
      road.classList.add("askRoadanimation");
      //5.畫完之後等二秒就reset路圖，並重新畫
      askRoadtimer.value = setTimeout(() => {
        resetcockroachRoad();
        showCockroachRoad();
        road.classList.remove("askRoadanimation");
        asking.value = false;
      }, 2000);
    });
    watch(gameEnd, () => {
      //換薛時要重置遊戲
      // console.log("偵測到換靴資訊重置路圖-蟑螂路")
      resetcockroachRoad();
    });
    watch(tableNum, () => {
      // console.log("換桌-重置蟑螂路")
      resetcockroachRoad();
    });
    watch(cockroachRoadResult, () => {
      if (cockroachRoadResult.value.columns[0].blocks.length > 0) {
        resetcockroachRoad();
        showCockroachRoad();
      }
    });
    function askRoad(roadNum: number) {
      //每次都畫最後一顆
      //  console.log('畫蟑螂路')
      // console.log('最後一顆蟑螂',item)
      recordRoad(roadNum);
      if (
        currentcockroachRoadResult.value !== lastcockroachRoadResult.value &&
        currentcockroachRoadResult.value !== 0 &&
        lastcockroachRoadResult.value !== 0
      ) {
        // console.log("換陣營前","行",cockroachRoadColumn.value,"格",cockroachRoadItemIndex.value)
        if (roadOverFlowerTimes.value != 0) {
          //第一次恢復的時候
          if (cockroachRoadItemIndex.value - 1 < 1) {
            //因為上一次已經被+過了，要減回來
            cockroachRoadColumn.value++;
            // console.log("在第0格滿出，直接+行數","行",cockroachRoadColumn.value)
            roadOverFlowerTimes.value = 0;
          } else {
            cockroachRoadColumn.value =
              cockroachRoadColumn.value - roadOverFlowerTimes.value + 1;
            roadOverFlowerTimes.value = 0;
          }
          // console.log("溢出後恢復","行",cockroachRoadColumn.value)
        } else {
          cockroachRoadColumn.value++;
        }
        if (
          cockroachRoadColumn.value >=
          bottom1width.length +
            (cockroachRoadColArr.length - bottom1width.length)
        ) {
          //溢出極限格子的時候要增加行數
          // console.log("滿了+行")
          addCokroachRoadCoulmn();
        }
        cockroachRoadItemIndex.value = 0;
        // console.log("格",cockroachRoadItemIndex.value)
      }
      //換行二:溢出換行
      //當下一次溢出大於前一次溢出時，bigRoadItemIndex.value要再-1
      //溢出時如果遇到和局，其實不需要+行?!
      if (
        cockroachRoadColArr[cockroachRoadColumn.value][
          cockroachRoadItemIndex.value
        ] !== 0 ||
        cockroachRoadItemIndex.value > 5
      ) {
        // console.log("連贏溢出")
        cockroachRoadColumn.value++; //換行
        //和局時不會進下面的addBigRoad
        if (
          cockroachRoadColumn.value >=
          bottom1width.length +
            (cockroachRoadColArr.length - bottom1width.length)
        ) {
          //不可以固定監測22，因為+了格子之後總行數也變多，必須+一個"增加的行數"
          addCokroachRoadCoulmn();
        } //溢出極限格子的時候要增加行數
        if (cockroachRoadItemIndex.value > 0) {
          //在第0格以上才要-1
          cockroachRoadItemIndex.value = cockroachRoadItemIndex.value - 1;
        }
        roadOverFlowerTimes.value++;
        // console.log("連贏溢出","行",cockroachRoadColumn.value,"格",cockroachRoadItemIndex.value,"溢出次數",roadOverFlowerTimes.value)
        for (let i = cockroachRoadItemIndex.value; i < 6; i++) {
          //只有溢出時才要這麼做:把溢出當格以下的格子都變成1
          cockroachRoadColArr[cockroachRoadColumn.value][i] = 1;
        }
      }
      putRoad(roadNum);
    }
    function recordRoad(gameResult: number) {
      switch (gameResult) {
        case 1:
          currentcockroachRoadResult.value = 1;
          break;
        case 2:
          currentcockroachRoadResult.value = 2;
          break;
      }
    }
    function putRoad(gameResult: number) {
      let RoadCol = document.querySelector(
        `.cockroachRoad-column${cockroachRoadColumn.value}`
      ) as HTMLElement;
      //  console.log(RoadCol)
      let bigRoadColItem = RoadCol.children[cockroachRoadItemIndex.value]
        .firstChild as HTMLElement;
      switch (gameResult) {
        case 1:
          bigRoadColItem.classList.add("cockroach-red");
          break;
        case 2:
          bigRoadColItem.classList.add("cockroach-blue");
          break;
      }
      cockroachRoadColArr[cockroachRoadColumn.value][
        cockroachRoadItemIndex.value
      ] = 1; //代表那一格已經畫過了
      cockroachRoadItemIndex.value++; //增加當前的index
      lastcockroachRoadResult.value = currentcockroachRoadResult.value; //將這次陣營記錄到下一次的陣營中
      lastcockroachRoadDataLength.value =
        cockroachRoadResult.value.columns[
          cockroachRoadResult.value.columns.length - 1
        ].blocks.length;
      lastcockroachDataColumnLength.value =
        cockroachRoadResult.value.columns.length;
      // console.log("現在是第",cockroachRoadColumn.value,"行；","下一格格子",cockroachRoadItemIndex.value)
    }
    function resetcockroachRoad() {
      //1.直接刪除所有column
      let RoadColContainer = document.querySelector(
        ".cockroachRoad"
      ) as HTMLElement;
      let lastChild = RoadColContainer.lastElementChild;
      while (lastChild) {
        RoadColContainer.removeChild(lastChild); //移除行數
        lastChild = RoadColContainer.lastElementChild; //抓下一個child
      }
      //2.建立新的四十四條col
      for (let i = 0; i < bottom1width.length; i++) {
        let col = document.createElement("div");
        col.classList.add("cockroachRoad-column");
        col.classList.add("d-flex");
        col.classList.add(`cockroachRoad-column${i}`);
        for (let i = 0; i < bottomHeight.length; i++) {
          let colItem = document.createElement("div");
          let itemDiv = document.createElement("div");
          colItem.classList.add("cockroachRoad-item");
          colItem.classList.add("d-flex");
          colItem.classList.add(`cockroachRoad-item${i}`);
          colItem.appendChild(itemDiv);
          col.appendChild(colItem);
        }
        RoadColContainer.appendChild(col);
      }
      //3.計數器規0
      cockroachRoadColumn.value = 0;
      cockroachRoadItemIndex.value = 0;
      currentcockroachRoadResult.value = 0;
      lastcockroachRoadResult.value = 0;
      roadOverFlowerTimes.value = 0;
      addCockroachRoadColumnCount.value = 0;
      //大路陣列也要規0
      let newArr = [];
      for (let i = 0; i < bottom1width.length; i++) {
        //初始化大路陣列
        newArr[i] = [0, 0, 0, 0, 0, 0];
      }
      cockroachRoadColArr = newArr;
    }
    function addCokroachRoadCoulmn() {
      let Road = document.querySelector(".cockroachRoad") as HTMLElement;
      let firstChild = Road.firstElementChild as HTMLElement; //抓取第一個元素
      Road.removeChild(firstChild); //刪除第一行
      let newCol = document.createElement("div");
      newCol.classList.add("cockroachRoad-column");
      newCol.classList.add(`cockroachRoad-column${cockroachRoadColumn.value}`);
      for (let i = 0; i < bottomHeight.length; i++) {
        let newColItem = document.createElement("div");
        let itemDiv = document.createElement("div");
        newColItem.classList.add("cockroachRoad-item");
        newColItem.classList.add("d-flex");
        newColItem.classList.add(`cockroachRoad-item${i}`);
        newColItem.appendChild(itemDiv);
        newCol.appendChild(newColItem);
      }
      //貼上去
      Road.appendChild(newCol);
      //記得也要增加bigRoadArr
      cockroachRoadColArr.push([0, 0, 0, 0, 0, 0]);
      // console.log("加了一行","行",cockroachRoadColumn.value)
      addCockroachRoadColumnCount.value++;
      // roadOverFlowerTimes.value++
    }
    function showCockroachRoad() {
      console.log("全劃蟑螂路");
      cockroachRoadResult.value.columns.forEach((item: any) => {
        item.blocks.forEach((i: any) => {
          // console.log('蟑螂路列表',i)
          recordRoad(i.symbol);
          // console.log(cockroachRoadColumn.value,cockroachRoadItemIndex.value)
          if (
            currentcockroachRoadResult.value !==
              lastcockroachRoadResult.value &&
            currentcockroachRoadResult.value !== 0 &&
            lastcockroachRoadResult.value !== 0
          ) {
            // console.log("換陣營前","行",cockroachRoadColumn.value,"格",cockroachRoadItemIndex.value)
            if (roadOverFlowerTimes.value != 0) {
              //第一次恢復的時候
              if (cockroachRoadItemIndex.value - 1 < 1) {
                //因為上一次已經被+過了，要減回來
                cockroachRoadColumn.value++;
                // console.log("在第0格滿出，直接+行數","行",cockroachRoadColumn.value)
                roadOverFlowerTimes.value = 0;
              } else {
                cockroachRoadColumn.value =
                  cockroachRoadColumn.value - roadOverFlowerTimes.value + 1;
                roadOverFlowerTimes.value = 0;
              }
              // console.log("溢出後恢復","行",cockroachRoadColumn.value)
            } else {
              cockroachRoadColumn.value++;
            }
            if (
              cockroachRoadColumn.value >=
              bottom1width.length +
                (cockroachRoadColArr.length - bottom1width.length)
            ) {
              //溢出極限格子的時候要增加行數
              // console.log("滿了+行")
              addCokroachRoadCoulmn();
            }
            cockroachRoadItemIndex.value = 0;
            // console.log("格",cockroachRoadItemIndex.value)
          }
          //換行二:溢出換行
          //當下一次溢出大於前一次溢出時，bigRoadItemIndex.value要再-1
          //溢出時如果遇到和局，其實不需要+行?!
          if (
            cockroachRoadColArr[cockroachRoadColumn.value][
              cockroachRoadItemIndex.value
            ] !== 0 ||
            cockroachRoadItemIndex.value > 5
          ) {
            // console.log("連贏溢出")
            cockroachRoadColumn.value++; //換行
            //和局時不會進下面的addBigRoad
            if (
              cockroachRoadColumn.value >=
              bottom1width.length +
                (cockroachRoadColArr.length - bottom1width.length)
            ) {
              //不可以固定監測22，因為+了格子之後總行數也變多，必須+一個"增加的行數"
              addCokroachRoadCoulmn();
            } //溢出極限格子的時候要增加行數
            if (cockroachRoadItemIndex.value > 0) {
              //在第0格以上才要-1
              cockroachRoadItemIndex.value = cockroachRoadItemIndex.value - 1;
            }
            roadOverFlowerTimes.value++;
            // console.log("連贏溢出","行",cockroachRoadColumn.value,"格",cockroachRoadItemIndex.value,"溢出次數",roadOverFlowerTimes.value)
            for (let i = cockroachRoadItemIndex.value; i < 6; i++) {
              //只有溢出時才要這麼做:把溢出當格以下的格子都變成1
              cockroachRoadColArr[cockroachRoadColumn.value][i] = 1;
            }
          }
          putRoad(i.symbol);
        });
      });
    }
    return {
      //data
      bottomHeight,
      bottom1width,
    };
  },
});
</script>
