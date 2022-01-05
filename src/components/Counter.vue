<template>
    <div class="counter position-relative">
        <div id="loading" class="position-absolute"></div>
        <h1 id="countNumber" class="position-absolute">{{displayNum}}</h1>
    </div>
</template>

<script lang="ts">
import {computed, defineComponent,onMounted,ref,watch} from 'vue'
import {gsap,Power1,Power4} from 'gsap'
import {useStore} from 'vuex'
import {useRoute } from 'vue-router'
export default defineComponent({
    inheritAttrs: false, //防止出現Vue warn
    setup(props){
        onMounted(()=>{
            watch(defaultCount,()=>{
                count.value = defaultCount.value
            })
        })
        const route = useRoute()
        const tableNum = computed(()=>{
            return route.params.tableId
        })
        //vuex
        const store = useStore()
        const roundUuid = computed(()=>{       //每個回合獨特的uuid
            return store.state.game.gameUuid
        })
        const defaultCount = computed(()=>{
            return store.state.game.BetRoundStart.timeRemain
        })
        // const roundStatus = computed(()=>{ //每回合的狀態
        //     return store
        // })
        const lastCount = computed(()=>{ //換桌時的剩餘秒數
            return store.state.game.GameStatus.timeRemain
        })  
        const gameStatus = computed(()=>{ //換桌時的遊戲狀態
            return store.state.game.GameStatus.status
        })
        // const defaultCount = ref(process.env.VUE_APP_GAME_COUNT) //倒數預設預設30。
        // const count = ref(process.env.VUE_APP_GAME_COUNT)  //倒數數字
        const count = ref(0)
        const timer = ref<any | null>(null) //計時器
        const displayNum=ref<number | string>()  //顯示的文字
        watch(tableNum,()=>{
            // console.log('桌號',tableNum.value)
            stopCount()
        })
        //專門for換桌時候的count；切桌時rounduuid一定會更換
        watch(roundUuid,()=>{ //偵測到換桌和新局時，倒數要根據剩餘的秒數來執行
            let temp = document.querySelector('.counter') as HTMLElement
            temp.style.display = 'block'
            // console.log("新局開始",count.value,'回合uuid',roundUuid.value)
            if(roundUuid.value){
                // console.log('有UUid的才要倒數')
                // console.log('預設的秒數',defaultCount.value)
                timer ?  clearInterval(timer.value) : null   //先清除上一桌的timer
                setCount()
            } 
        })
        watch(lastCount,()=>{ //換桌時收到Gamestatus後，開始以server傳來的秒數倒數
            let temp = document.querySelector('.counter') as HTMLElement
                temp.style.display = 'block'
            if(gameStatus.value==1){
                console.log('倒數剩下幾秒',lastCount.value)
                timer ?  clearInterval(timer.value) : null   //先清除上一桌的timer
                count.value = lastCount.value
                setCount()
            }
        })
        //計時器動畫
        function loadingCount () { //計時器loading特效
            //外框動畫
            if(count.value<10){
            gsap
            .to('#loading',{
                keyframes:[
                    {rotation:0,display:'block'},
                    {duration:1,
                    ease:Power1.easeInOut,
                    rotation:360,
                    borderColor:'transparent transparent red brown',
                    display:'none'
                    }
                ]
            })
            }else{
            gsap
            .to('#loading',{
                keyframes:[
                    {rotation:0,display:'block', borderColor:'transparent transparent #724a0a #9b7726'},
                    {duration:1,
                    ease:Power1.easeInOut,
                    rotation:360,
                    display:'none'
                    }
                ]
            })
            }
            // 數字動畫
            gsap
                .fromTo('#countNumber',{display:"block"},
                {ease:Power4.easeIn})
        }
        //倒數計時器邏輯
        function setCount () { //倒數計時
            timer.value = setInterval(()=>{
                if(count.value<=1){ //假如要呈現00，就改成<=0即可
                    clearInterval(timer.value)
                    timer.value = null
                    count.value=defaultCount.value //預備下次重新計算
                    gsap //最後要將數字隱藏
                    .fromTo('#countNumber',{display:"none"},
                    {ease:Power4.easeInOut,display:"none"})
                    // console.log("計時器結束",count.value)
                }else{  //在1以上時才會執行
                    count.value-=1
                    if(count.value<10){  //小於10的前面補0
                        displayNum.value = `0${count.value}`
                    }else{
                        displayNum.value = count.value
                    }
                    loadingCount()
                }
            },1000)
        }
        function stopCount(){  //終止計時器
            //關閉顯示
            // let temp = document.querySelector('.counter') as HTMLElement
            //     temp.style.display = 'none'
            let border = document.querySelector('#loading') as HTMLElement
            let number = document.querySelector('#countNumber') as HTMLElement
            border.style.display = 'none'
            number.style.display = 'none'
            timer ?  clearInterval(timer.value) : null   //先清除上一桌的timer
        }
        // watch(timer,()=>{  //測試計時器是否有被清除
        //     if(timer.value){
        //         console.log("計時中")
        //     }else{
        //         console.log('計時器被清除')
        //     }
        // })
        
        return{
            //data
            count,
            displayNum,
            //methods
            setCount,
        }
    },
})
</script>