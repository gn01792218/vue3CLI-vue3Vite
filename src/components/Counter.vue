<template>
    <div class="counter position-relative">
        <div id="loading" class="position-absolute"></div>
        <!-- <h1 id="countNumber" class="position-absolute">{{count}}</h1> -->
        <h1 id="countNumber" class="position-absolute">{{displayNum}}</h1>
    </div>
</template>

<script lang="ts">
import {computed, defineComponent,ref,watch} from 'vue'
import {gsap,Power1,Power4} from 'gsap'
import {useStore} from 'vuex'
export default defineComponent({
    inheritAttrs: false, //防止出現Vue warn
    setup(props){
        //vuex
        const store = useStore()
        const roundUuid = computed(()=>{ //每個回合獨特的uuid
            return store.state.game.gameUuid
        })
        const roundStatus = computed(()=>{ //每回合的狀態
            return store
        })
        const lastCount = computed(()=>{
            return store.state.game.GameStatus.timeRemain
        })  //換桌時的剩餘秒數
        const gameStatus = computed(()=>{
            return store.state.game.GameStatus.status
        })
        const defaultCount = ref(15) //倒數預設預設30。
        const count = ref(15)  //倒數數字
        const timer = ref<any | null>(null) //計時器
        const displayNum=ref<number | string>()  //顯示的文字
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
        // watch(timer,()=>{  //測試計時器是否有被清除
        //     if(timer.value){
        //         console.log("計時中")
        //     }else{
        //         console.log('計時器被清除')
        //     }
        // })
        // //專門for換桌時候的count；切桌時rounduuid一定會更換
        watch(roundUuid,()=>{ //偵測到換桌時，倒數要根據剩餘的秒數來執行
                // console.log("新局開始",count.value)
                timer ?  clearInterval(timer.value) : null   //先清除上一桌的timer
                setCount()
        })
        watch(lastCount,()=>{ //換桌時候會偵測現在的秒數
            if(gameStatus.value==1){
                console.log(lastCount.value)
                timer ?  clearInterval(timer.value) : null   //先清除上一桌的timer
                count.value = lastCount.value
                setCount()
            }
        })
        return{
            //data
            count,displayNum,
            //methods
            setCount
        }
    },
})
</script>