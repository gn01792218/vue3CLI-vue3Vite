<template>
    <div class="card-wrap">
    	<section class="card-container d-flex justify-content-center">
      	<div class="player card-box row justify-content-center">
          <span v-show="showCardResult" class="playerNum">{{playerPoint}}</span>
        	<div :class="['caritem',{'card-item-w d-flex justify-content-center col-9':index === 0}]"  v-for="(card,index) in cards.banker" :key="index">
          		<div :class="[`playerPoker${index}`]"></div>
        	</div>
      	</div>
        
      	<div class="banker card-box row justify-content-center">
        	<div :class="['caritem',{'card-item-w d-flex justify-content-center col-9':index === 0}]"  v-for="(card,index) in cards.player" :key="index">
          		<div :class="[`bankPoker${index}`]"></div>
        	</div>
          <span v-show="showCardResult" class="bankerNum">{{bankerPoint}}</span>
      	</div>
    	</section>
    </div>
</template>
<script lang="ts">
import {computed, defineComponent,onMounted,reactive, ref, watch} from 'vue'
import {useStore} from 'vuex'
import {useRoute } from 'vue-router'
import proto from '../assets/js/bundle'
export default defineComponent({
  setup(){
    //初始化卡牌位置
    onMounted(()=>{
      cardPositionInit()
    })
    //卡牌響應式操作資料
    let scale = ref(0.2)
    const uw = 373
    const uh = 556
    const cards = reactive({
        banker:new Array(3),
        player:new Array(3),
     })
    //監測換桌
    const route = useRoute()
    const tableNum = computed(()=>{
      return route.params.tableId
    })
    watch(tableNum,()=>{
        resetCards ()  //換桌的時候卡牌要先重置
        resetCardPoint()
    })
    //vuex
    const store = useStore()
    const roundUuid = computed(()=>{
       return store.state.game.gameUuid
     })
    const lastDrawCard = computed(()=>{ //陣列:進場前補畫的牌
      return store.state.game.GameStatus.draws
     })
    const gameStatus = computed(()=>{
      return store.state.game.GameStatus.status
    })
    const DrawCard = computed(()=>{  //每次都傳一張
       return store.state.dealer.Draw
     })
    const gameResult = computed(()=>{ //回傳的是陣列
      return store.state.dealer.BroadcastGameResult.results
    })
    const gameEnd = computed(()=>{  //換靴
          return store.state.dealer.end
    })
    const bankCardArray = ref([0,0,0])
    const playerCardArray = ref([0,0,0])
    const playerPoint = ref(0)
    const bankerPoint = ref(0)
    const showCardResult =ref(false)
    //響應式卡牌監聽 應付電腦解析度切換、行動裝置直橫切換
    const mqlMax1280 = window.matchMedia("(max-width :1280px)")
     mqlMax1280.addEventListener('change',()=>{
       cardPositionInit()
     })
     //watch
     watch(gameEnd,()=>{ //換薛時也要重置
      // console.log("換靴重置Card")
      resetCards () //不管哪個狀態都先執行一次清除卡牌
      resetCardPoint()
      showCardResult.value = false
      console.log('換薛時候，卡牌的計點數字不顯示')
    })
     watch(roundUuid,()=>{ //uuid改變時，更換卡牌
      resetCards () //不管哪個狀態都先執行一次清除卡牌
      resetCardPoint()
      showCardResult.value = false  //不顯示卡牌
      // console.log('不顯示卡牌點數',showCardResult.value)
     })
     watch(gameResult,()=>{
       console.log(gameResult.value.length)
        setWinCardBoxLight()
       if(gameResult.value.length>0){
         showCardTotalPoint()
       }
     })
     watch(DrawCard,()=>{  //開牌
      //  console.log("開牌")
      //if判斷是暫時性的
       let card = DrawCard.value
       showCards(card.side,card.card.suit,card.card.point,card.position)
     })
     watch(lastDrawCard,()=>{  //補畫進場前的卡牌
       if(gameStatus.value!==3){  //防止server在等待時間也傳卡牌來
        lastDrawCard.value.forEach((i:any)=>{
         showCards (i.side,i.card.suit,i.card.point,i.position)
       })
      }
     })
     //撲克牌業務代碼
     function resetCards () {
      for(let i=0 ;i<3;i++){
        cards.banker[i]=null
        cards.player[i]=null
        let bankPoker = document.querySelectorAll(`.bankPoker${i}`)
        let playerPoker = document.querySelectorAll(`.playerPoker${i}`)
        bankPoker.forEach(i=>{
          i.classList.remove('poker')
        })
        playerPoker.forEach(i=>{
          i.classList.remove('poker')
        })
      }
      let winCardBox = document.querySelectorAll('.winPoker')
      winCardBox.forEach(i=>{
        i.classList.remove('winPoker')
      })
     }
     function getCardPosition(position:number,cardSideClassName:string):NodeListOf<HTMLElement> | undefined{
       switch(position){  
        case 1:
        case 2:
          return document.querySelectorAll(`${cardSideClassName}${position}`)
        case 3:
          return document.querySelectorAll(`${cardSideClassName}0`)
       }
     }
     function setWinCardBoxLight(){
       gameResult.value.forEach((i:any)=>{
         switch(i){
           case 1:
            let bankerCardBox = document.querySelectorAll('.banker')
            bankerCardBox.forEach(i=>{
              i.classList.add('winPoker')
            })
            break
          case 2:
            let playererCardBox = document.querySelectorAll('.player')
            playererCardBox.forEach(i=>{
              i.classList.add('winPoker')
            })
            break
         }
       })
     }
     function resetCardPoint(){
       playerPoint.value = 0
       bankerPoint.value = 0
       playerCardArray.value = [0,0,0]
       bankCardArray.value = [0,0,0]
     }
     async function showCardTotalPoint () {
      // console.log('加總前的arr狀態:','閒',playerCardArray.value,'莊',bankCardArray.value)

      playerCardArray.value.forEach(i=>{
        if(i>=10){
          i = 0
        }
          playerPoint.value+=i
          playerPoint.value = playerPoint.value%10
          // console.log('閒家牌','加點:',i,'本次值',playerPoint.value)
      })
      bankCardArray.value.forEach(i=>{
        if(i>=10){
          i = 0
        }
        bankerPoint.value+=i
        bankerPoint.value = bankerPoint.value%10
          // console.log('閒家牌','加點:',i,'本次值',bankerPoint.value)
      })
      // playerCardArray.value =playerCardArray.value.map(i=>{
      //   if(i>=10){
      //     i = 0
      //   }
      //     return i
      // })
      
      // bankCardArray.value =bankCardArray.value.map(i=>{
      //   if(i>=10){
      //     i = 0
      //   }
      //   return i
      // })
      // playerPoint.value = (playerCardArray.value[0]+playerCardArray.value[1]+playerCardArray.value[2])%10
      // bankerPoint.value = (bankCardArray.value[0]+bankCardArray.value[1]+bankCardArray.value[2])%10
      showCardResult.value = true
      // console.log("計算最終卡牌點數",'閒',playerCardArray.value,playerPoint.value,'莊',bankCardArray.value,bankerPoint.value,'要不要顯示卡牌',showCardResult.value)
     }
     function showCards (cardSide:number,cardSuit:number,cardPoint:number,cardPosition:number) { 
      let suit = cardSuit
      let point = cardPoint
      let position = cardPosition
      let cardElement:NodeListOf<HTMLElement> | undefined
      switch(cardSide){
        case proto.dealer.Side.Banker:
        cardElement = getCardPosition(position,'.bankPoker')
        bankCardArray.value[position-1] = point
          break
        case proto.dealer.Side.Player:
        cardElement = getCardPosition(position,'.playerPoker')
        playerCardArray.value[position-1] = point
          break
      }
      if(cardElement){
        cardElement.forEach(i=>{
          i.classList.add('poker')
          i.style.width = `${uw*scale.value}px`
          i.style.height = `${uh*scale.value}px`
          i.style.backgroundPosition = `-${(point-1)*uw*scale.value}px -${(suit-1)*uh*scale.value}px`
          i.style.backgroundSize = `${4849*(uw*scale.value)/uw}px ${2224*(uh*scale.value)/uh}px`
        })
      }
     }
     function cardPositionInit () { //響應式初始化卡牌出現的位置
      let cardItem = document.querySelectorAll('.caritem') as NodeListOf<HTMLElement>
      const viewportWidth = window.innerWidth
        if(viewportWidth<=1280 && viewportWidth>1024){
          scale.value = 0.14
        }else if(viewportWidth<=1024 && viewportWidth>540){
          scale.value = 0.25
        }
        else if(viewportWidth<=540 && viewportWidth>280){
          scale.value = 0.14
        }else if(viewportWidth<=280){
          // console.log("偵測到最小尺寸280")
          scale.value = 0.12
        }
        else{
          scale.value = 0.19
        }
        cardItem.forEach(i=>{
        i.style.width = `${uw*scale.value}px`
        i.style.height = `${uh*scale.value}px`
      })
     }
    return {
      //data
      cards,DrawCard,playerPoint,bankerPoint,showCardResult,
      //methods
      showCards,
    }
  }
})
</script>