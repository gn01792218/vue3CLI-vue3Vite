<template>
  <div class="gameHistory d-flex position-relative">
     <BeadPlate/>
     <SideRoadGrid/>
      <!--for mobil verson show poker -->
      <!-- v-if gameState is show Poker -->
      <!-- 手機版本的卡牌zoom2.24就可以了 -->
      <div class="lightBox position-absolute" v-show="showCardInfo">
        <CardInfo class="mobilePoker"/>
      </div>
    </div>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, ref, watch} from 'vue'
import {useStore} from 'vuex'
import BeadPlate from './BeadPlate.vue'
import SideRoadGrid from './SideRoadGrid.vue'
import CardInfo from './CardInfo.vue'
export default defineComponent({
  components:{
    BeadPlate,
    SideRoadGrid,
    CardInfo,
  },
    setup(){
        //Vuex資料
        const store = useStore()
        const showCardInfo = ref(false)
        const Draw = computed(()=>{
          return store.state.dealer.Draw
        })
        const roundUuid = computed<string>(()=>{
          return store.state.game.gameUuid
        })
        //初始化
        onMounted(() => {
          if(screen.width>1024){
            let lightElement = document.querySelector('.lightBox') as HTMLElement
            lightElement.style.display = 'none'
          }
        })
        // //data
        // const winer = reactive([  //存放贏家的樣式和文字
        //   {
        //     name:"莊",
        //     btnClass:["btn-b","btn-bs","btn-bss","btn-bsss","btn-bssss"],
        //   },
        //   {
        //     name:"閒",
        //      btnClass:["btn-p","btn-ps","btn-pss","btn-psss","btn-pssss"],
        //   },
        //   {
        //     name:"合",
        //      btnClass:["btn-c","btn-cs","btn-css","btn-csss","btn-cssss"],
        //   },
        // ])
        // //路圖更新
        // function historyUpdate () {
        //   //根據serve傳來的資料更新路圖
        // }
        const mqlMax1024 = window.matchMedia("(max-width :1024px)")
        const mqlMax1280 = window.matchMedia("(max-width :1280px)")
        mqlMax1280.addEventListener('change',()=>{
          console.log("1280",mqlMax1280)
         
        })
        const mqltest = window.matchMedia("(max-height:1280px)")
        mqltest.addEventListener('change',()=>{
          console.log("偵測到螢幕高度")
        })
        mqlMax1024.addEventListener('change',()=>{
          console.log("1024",mqlMax1024)
          if(mqlMax1024.matches){
            console.log("要監聽1024以下歷史圖的開牌")
            watch(Draw,()=>{  //之後監聽game狀態來判定是否顯示卡牌
              if(mqlMax1024.matches){
                showCardInfo.value = true
                console.log("監聽畫牌")
              }
            })
            watch(roundUuid,()=>{
              if(mqlMax1024.matches){
                showCardInfo.value = false
              }
            })
          }else{
            showCardInfo.value = false
          }
        })
        return {
          //data
          showCardInfo,
          //methods
          
        }
    }
})
</script>
<style lang="scss">
.gameHistory{
  border: 1px solid #654d31 !important;
}
.lightBox{
  width:100%;
  height:100%;
  background-color: #654d3160;
  left:50%;
  transform: translateX(-50%);
  z-index:2;
}
//客製化修改
.btn-ps{
  vertical-align: top !important;;
}
.test{
  bottom: 0;
}
</style>