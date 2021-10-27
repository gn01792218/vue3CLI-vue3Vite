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

<script>
import {computed, defineComponent,reactive,ref, watch} from 'vue'
import {useStore} from 'vuex'
export default defineComponent({
  setup(){
    //vuex
     const store = useStore()
     const roundUuid = computed(()=>{
        store.state.game.BetRoundStart.gameUuid
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
       console.log("畫卡")
        pushCards()
        showCards()
     })
     //撲克牌業務代碼
     const cards = reactive({  //內含莊閒的卡牌陣列
        banker:new Array(3),
        player:new Array(3),
     })
     const cardCound = ref(0) //計算開第幾張牌了
     function pushCards () {
       console.log("畫")
      //回合結束時開牌，
      //1.假如可以開牌，從Vuex中取得卡牌資訊
      if(cardCound.value<3){
        //1.switchDraw封包，判斷是莊閒哪一家
        
        cards.banker[cardCound.value] = '0-11'
        cards.player[cardCound.value] = '3-9'
      }
     }
     function resetCards () {
      //到時應該是回合結束時開牌，新回合開始時reset
      cardCound.value=0
      for(let i=0 ;i<3;i++){
        cards.banker[i]=null
        cards.player[i]=null
        let bankPoker = document.querySelector(`.bankPoker${i}`)
        let playerPoker = document.querySelector(`.playerPoker${i}`)
        bankPoker.classList.remove('poker')
        playerPoker.classList.remove('poker')
      }
     }
     function showCards () { //每次開牌，伺服器就會傳一次，server給的陣列固定長度3，還沒開牌的給空值即可
      // pushCards() //這個要放在外面!!!!!!!!!!
      cardCound.value++
      const uw = 373
      const uh = 556
      //2.顯示卡牌
      //  //其實這裡只需要每次跑陣列就可以
      if(cardCound.value<=3){
        for(let i =0; i<3; i++){
          //前兩張從index 1 2
          let bankPoker = document.querySelector(`.bankPoker${i+1}`)
          let playerPoker = document.querySelector(`.playerPoker${i+1}`)
          if(i===2){ //最後一張要放在第一格
            bankPoker = document.querySelector('.bankPoker0') 
            playerPoker = document.querySelector('.playerPoker0')
          }
          if(cards.banker[i] && cards.player[i]){
            const bcArr = cards.banker[i].split("-")   //不需要切
            const pcArr = cards.player[i].split("-")   //不需要切
            bankPoker.classList.add('poker')
            playerPoker.classList.add('poker')
            bankPoker.style.backgroundPosition = `-${(bcArr[1]-1)*uw}px -${bcArr[0]*uh}px`
            playerPoker.style.backgroundPosition = `-${(pcArr[1]-1)*uw}px -${pcArr[0]*uh}px`
          }
        }
      }else{
        resetCards()
      }
     }
    return {
      //data
      cards,cardCound,DrawCard,
      //methods
      showCards,
    }
  }
})
</script>

<style lang="scss">
  .card-container{
    pointer-events: none; //使能被穿透
    margin-top:-30px;
  }    
  .card-box{ //測試用，完成可以消除
    // border:yellow 1px solid;
  }
  .poker{ //顯示卡牌
    width:373px;
    height:556px;
    background-image:url('../images/poker.png');
  }
  .caritem{
    // pointer-events: none; //使能被穿透
    width:373px;
    height:566px;
    zoom:0.22; //這個方式的話 必須要每種此吋下去塞選
    //預設margin，響應式的時候可以依照情況拿掉
    margin-right:40px;
    margin-left:40px;
    margin-top: -70px;
    // border:1px solid blue;
  }
  .card-item-w{
    transform: rotate(90deg);
  }
</style>