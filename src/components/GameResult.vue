<template>
    <div class="gameResult w-100 h-100 position-absolute">
        <section class="gameResult-title">
            <p>遊戲結果</p>
        </section>
        <section class="gameResult-content">
            <ul id="result">
            </ul>
            <p>獲得金額:-1000</p>
        </section>
        
    </div>
</template>

<script lang="ts">
import {computed, defineComponent, ref, watch} from 'vue'
import {useStore} from 'vuex'
export default defineComponent({
    setup(){
        const store = useStore()
        const gameResult = computed(()=>{ //回傳的是陣列
            return store.state.dealer.BroadcastGameResult.results
        })
        const gameUuid = computed(()=>{
            return store.state.game.gameUuid
        })
        watch(gameUuid,()=>{
            console.log("重置遊戲結果")
            resetGameResult()
        })
        watch(gameResult,()=>{
            //依據不同的情況，添加不同的顏色class
            console.log("改變")
            let result = document.querySelector('#result') as HTMLElement  //這是ul
            gameResult.value.forEach((i:any)=>{
                switch(i){
                    case 1:
                        let appendElement1 = document.createElement('LI') as HTMLElement
                        appendElement1.classList.add('font_green')
                        appendElement1.classList.add('result-text')
                        appendElement1.innerText="和局"
                        result.appendChild(appendElement1)
                        break
                    case 2:
                        let appendElement2 = document.createElement('LI') as HTMLElement
                        appendElement2.classList.add('font_yellow')
                        appendElement2.classList.add('result-text')
                        appendElement2.innerText="莊家贏"
                        result.appendChild(appendElement2)
                        break
                    case 3:
                        let appendElement3 = document.createElement('LI') as HTMLElement
                        appendElement3.classList.add('font_red')
                        appendElement3.classList.add('result-text')
                        appendElement3.innerText="閒家贏"
                        result.appendChild(appendElement3)
                        break
                    case 4:
                        let appendElement4 = document.createElement('LI') as HTMLElement
                        appendElement4.classList.add('font_yellow')
                        appendElement4.classList.add('result-text')
                        appendElement4.innerText="莊對"
                        result.appendChild(appendElement4)
                        break
                    case 5:
                        let appendElement5 = document.createElement('LI') as HTMLElement
                        appendElement5.classList.add('font_yellow')
                        appendElement5.classList.add('result-text')
                        appendElement5.innerText="閒對"
                        result.appendChild(appendElement5)
                        break
                }
            })
        })
        function resetGameResult () {
            let result = document.querySelector('#result') as HTMLElement  //這是ul
            result.innerHTML=""
        }
        return{
            
        }
    }
})
</script>

<style>

</style>