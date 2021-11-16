<template>
    <div class="card-wrap">
    	<section class="card-container d-flex justify-content-center">
      	<div class=" card-box row justify-content-center">
        	<div :class="['caritem',{'card-item-w d-flex justify-content-center col-9':index === 0}]"  v-for="(card,index) in cards.banker" :key="index">
          		<div :class="[`playerPoker${index}`]"></div>
        	</div>
      	</div>
      	<div class="card-box row justify-content-center">
        	<div :class="['caritem',{'card-item-w d-flex justify-content-center col-9':index === 0}]"  v-for="(card,index) in cards.player" :key="index">
          		<div :class="[`bankPoker${index}`]"></div>
        	</div>
      	</div>
    	</section>
    </div>
</template>

<script lang="ts">
import {computed, defineComponent,onMounted,reactive, ref, watch} from 'vue'
import {useStore} from 'vuex'
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
    //vuex
     const store = useStore()
     const roundUuid = computed(()=>{
       return store.state.game.gameUuid
     })
     const lastDrawCard = computed(()=>{ //陣列:進場前補畫的牌
      return store.state.game.GameStatus.draws
     })
     const DrawCard = computed(()=>{  //每次都傳一張
       return store.state.dealer.Draw
     })
     //watch
     watch(roundUuid,()=>{ //uuid改變時，更換卡牌
      resetCards () //不管哪個狀態都先執行一次清除卡牌
     })
     watch(DrawCard,()=>{  //開牌
       let card = DrawCard.value
       showCards(card.side,card.card.suit,card.card.point,card.position)
     })
     watch(lastDrawCard,()=>{  //補畫進場前的卡牌
       lastDrawCard.value.forEach((i:any)=>{
         showCards (i.side,i.card.suit,i.card.point,i.position)
       })
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
     function showCards (cardSide:number,cardSuit:number,cardPoint:number,cardPosition:number) { 
      let suit = cardSuit
      let point = cardPoint
      let position = cardPosition
      let cardElement:NodeListOf<HTMLElement> | undefined
      switch(cardSide){
        case proto.dealer.Side.Banker:
        cardElement = getCardPosition(position,'.bankPoker')
          break
        case proto.dealer.Side.Player:
        cardElement = getCardPosition(position,'.playerPoker')
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
     const mqlMax1280 = window.matchMedia("(max-width :1280px)")
     mqlMax1280.addEventListener('change',()=>{
       cardPositionInit()
     })
     function cardPositionInit () { //響應式初始化卡牌出現的位置
      let cardItem = document.querySelectorAll('.caritem') as NodeListOf<HTMLElement>
      const viewportWidth = window.innerWidth
        if(viewportWidth<=1280 && viewportWidth>1024){
          scale.value = 0.14
        }else if(viewportWidth<=1024 && viewportWidth>540){
          scale.value = 0.25
        }
        else if(viewportWidth<=540){
          scale.value = 0.14
        }else{
          scale.value = 0.19
        }
        cardItem.forEach(i=>{
        i.style.width = `${uw*scale.value}px`
        i.style.height = `${uh*scale.value}px`
      })
     }
    return {
      //data
      cards,DrawCard,
      //methods
      showCards,
    }
  }
})
</script>