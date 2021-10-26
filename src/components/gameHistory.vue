<template>
  <div class="gameHistory d-flex position-relative">
     <BigRoadGrid/>
     <SideRoadGrid/>
      <!--for mobil verson show poker -->
      <!-- v-if gameState is show Poker -->
      <!-- 手機版本的卡牌zoom2.24就可以了 -->
      <div class="lightBox position-absolute d-md-none" v-if="show">
        <CardInfo  class="mobilePoker"/>
      </div>
      <button class="test position-absolute" @click="showCard">秀卡牌</button>
    </div>
</template>

<script>
import {computed, defineComponent, onMounted, reactive, ref, watch} from 'vue'
import {useStore} from 'vuex'
import BigRoadGrid from './BigRoadGrid.vue'
import SideRoadGrid from './SideRoadGrid.vue'
import CardInfo from './CardInfo.vue'
export default defineComponent({
  components:{
    BigRoadGrid,
    SideRoadGrid,
    CardInfo,
  },
    setup(){
        //Vuex資料
        const store = useStore()
        const show = ref(false)
        const Draw = computed(()=>{
          return store.state.dealer.Draw
        })
        //初始化
        onMounted(() => {
          historyUpdate()
        })
        //data
        const winer = reactive([  //存放贏家的樣式和文字
          {
            name:"莊",
            btnClass:["btn-b","btn-bs","btn-bss","btn-bsss","btn-bssss"],
          },
          {
            name:"閒",
             btnClass:["btn-p","btn-ps","btn-pss","btn-psss","btn-pssss"],
          },
          {
            name:"合",
             btnClass:["btn-c","btn-cs","btn-css","btn-csss","btn-cssss"],
          },
        ])
        //路圖更新
        function historyUpdate () {
          //根據serve傳來的資料更新路圖
        }
        watch(Draw,()=>{  //之後監聽game狀態來判定是否顯示卡牌
          // if(!show.value){
          //   showCard()
          // }
          
        })
        function showCard(){
          console.log("切換")
          show.value = !show.value
          console.log(show.value)
        }
        return {
          //data
          winer,show,

          //methods
          historyUpdate,showCard
        }
    }
})
</script>
<style lang="scss">
.gameHistory{
  border: 1px solid #654d31 !important;
}
.lightBox{
  // display: none;
  width:100%;
  height:100%;
  background-color: #654d3160;
  left:50%;
  transform: translateX(-50%);
}
//客製化修改
.btn-ps{
  vertical-align: top !important;;
}
.test{
  bottom: 0;
}
</style>