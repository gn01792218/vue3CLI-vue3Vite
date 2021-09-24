<template>
  <!--- tab --->
    <div class="tabs-area">
        <div class="tabs-bottom">
            <div @click="showTableInfo" :class="{onclick:!showCards}">Table Info</div>
            <div @click="showCard" :class="{onclick:showCards}">Cards</div>
        </div>
        <ul class="demo">
            <li v-show="!showCards">
                <section>
                    <div class="row">
                        <div class="col-6">
                            <li class="font-red">Banker 52%</li>    
                            <li class="font-yellow">Player 46%</li> 
                            <li class="font-green">Tie 2%</li> 
                            <li class="font-red">Banker Pair</li> 
                            <li class="font-yellow">Player Pair</li> 
                            <li class="font-red">Banker Natural</li> 
                            <li class="font-yellow">Player Natural</li>
                        </div>
                        <div class="col-6" align="right">
                            <li>376,798/1300</li> 
                            <li>332,648/508</li> 
                            <li>11,999/280</li> 
                            <li>9,406/224</li> 
                            <li>9,232/225</li> 
                            <li>1,145/1</li> 
                            <li>0/0</li>
                        </div>
                    </div>
                </section>
            </li>
            <li v-show="showCards">
                <section>
                    <p><img src="../images/card-img.png" class="rwd-img"></p>
                </section>
            </li>  
        </ul>
    </div>
</template>

<script>
import {defineComponent, ref} from 'vue'
export default defineComponent({
    setup(){
        const showCards = ref(true)
        const showCard = ()=>{
            showCards.value = true
        }
        const showTableInfo = ()=>{
            showCards.value = false
        }
        return{
            showCards,showCard,showTableInfo
        }
    }

})
</script>

<style lang="scss">
    .tabs-bottom{
        display: flex;
        div{
            cursor: pointer;
            padding:10px 35px;
        }
    }
    .onclick{
        background-color: black;
    }
</style>