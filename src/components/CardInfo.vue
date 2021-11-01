<template>
    <div>
  		<!-- <button class="shocardBtn" @click="showCards">取得當前卡牌</button> -->
    	<section class="card-container d-flex justify-content-center">
      	<div class=" card-box row justify-content-center">
        	<div :class="['caritem',{'card-item-w d-flex justify-content-center col-9':index === 0}]"  v-for="(card,index) in cards.banker" :key="index">
          		<div :class="[`bankPoker${index}`]"></div>
        	</div>
      	</div>
      	<div class="card-box row justify-content-center">
        	<div :class="['caritem',{'card-item-w d-flex justify-content-center col-9':index === 0}]"  v-for="(card,index) in cards.player" :key="index">
          		<div :class="[`playerPoker${index}`]"></div>
        	</div>
      	</div>
    	</section>
    </div>
</template>

<script lang="ts">
import {computed, defineComponent,reactive, watch} from 'vue'
import {useStore} from 'vuex'
export default defineComponent({
  setup(){
    //vuex
     const store = useStore()
     const roundUuid = computed(()=>{
       return store.state.game.gameUuid
     })
     const roundState = computed(()=>{
      
     })
     const DrawCard = computed(()=>{
       return store.state.dealer.Draw
     })
     //watch
     watch(roundUuid,()=>{ //uuid改變時，更換卡牌
     
      resetCards () //不管哪個狀態都先執行一次清除卡牌
     })
     watch(DrawCard,()=>{
        showCards()
     })
     //撲克牌業務代碼
     const cards = reactive({  //內含莊閒的卡牌陣列
        banker:new Array(3),
        player:new Array(3),
     })
     function resetCards () {
      //到時應該是回合結束時開牌，新回合開始時reset
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
        // bankPoker?.classList.remove('poker')
        // playerPoker?.classList.remove('poker')
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
     function showCards () { //每次開牌，伺服器就會傳一次，server給的陣列固定長度3，還沒開牌的給空值即可
      const uw = 373
      const uh = 556
      let suit = DrawCard.value.card.suit
      let point = DrawCard.value.card.point
      let position = DrawCard.value.position
      let cardElement:NodeListOf<HTMLElement> | undefined
      switch(DrawCard.value.side){
        case 1:
          cardElement = getCardPosition(position,'.bankPoker')
          break
        case 2:
          cardElement = getCardPosition(position,'.playerPoker')
          break
      }
      if(cardElement){
        cardElement.forEach(i=>{
          i.classList.add('poker')
          i.style.backgroundPosition = `-${(point-1)*uw}px -${(suit-1)*uh}px`
        })
      }
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