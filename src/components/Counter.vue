<template>
    <div class="counter position-relative">
        <div id="loading" class="position-absolute"></div>
        <h1 id="countNumber" class="position-absolute">{{count}}</h1>
    </div>
</template>

<script lang="ts">
import {computed, defineComponent,ref,watch} from 'vue'
import {gsap,Power1,Power4} from 'gsap'
import {useStore} from 'vuex'
export default defineComponent({
    inheritAttrs: false, //防止出現Vue warn
    //倒數計時需要server傳現在下注狀態，以及當前還剩下幾秒過來
    //然後倒數計時器只要使用當前秒數開始倒數即可
    props:{
        round:{  //外面傳進來的值，給數字代表計算幾次-->預計等於下注的round uuid
            type:Number,
        },
    },
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
            return store.state.game.BetRoundStart.timeRemain
        })  //換桌時的剩餘秒數
        const defaultCount = ref<number>(30) //倒數預設預設30。
        const count = ref<number>(30)  //倒數數字
        const timer = ref<any | null>(null) //計時器
       
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
                    // filter:'blur(2px)',
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
                    // filter:'blur(2px)',
                    display:'none'
                    }
                ]
            })
            }
            //個位數字的居中
            if(count.value<10){
                gsap
                .fromTo('#countNumber',{x:30,opacity:"0",display:"block"},
                {x:30,opacity:"1",ease:Power4.easeIn})
                if(count.value==1){
                    gsap
                    .fromTo('#countNumber',{x:35,opacity:"0",display:"block"},
                    {x:35,opacity:"1",ease:Power4.easeIn})
                }
            }else {
                gsap
                .fromTo('#countNumber',{x:15,opacity:"0",display:"block"},
                {x:15,opacity:"1",ease:Power4.easeIn})
            }
        }
        //倒數計時器邏輯
        function setCount () { //倒數計時
            timer.value = setInterval(()=>{
                if(count.value<=0){ //倒數完時
                    clearInterval(timer.value)
                    timer.value = null
                    count.value=defaultCount.value //預備下次重新計算
                    gsap //最後要將數字隱藏
                    .fromTo('#countNumber',{x:20,opacity:"0",display:"none"},
                    {x:20,opacity:"1",ease:Power4.easeInOut,display:"none"})
                    console.log("第"+props.round+"回合倒數結束")
                }else{  //在1以上時才會執行
                    count.value-=1
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
        //監聽回和數進行倒數計時
         const roundNum = computed(()=>{ //計算現在是第幾圈-->之後不需要了
            return props.round
        })
        watch(roundNum,()=>{  //之後要被下面的取代
            console.log("第"+props.round+"回合倒數開始")
            setCount()
        })
        // //專門for換桌時候的count；切桌時rounduuid一定會更換
        watch(roundUuid,()=>{ //偵測到換桌時，倒數要根據剩餘的秒數來執行
                timer ?  clearInterval(timer.value) : null   //先清除上一桌的timer
                count.value = lastCount.value
                setCount()
            // switch(roundUuid.value){
            //     case 1:  //下注時間內
            //         timer ?  clearInterval(timer.value) : null   //先清除上一桌的timer
            //         count.value = lastCount.value
            //         setCount()
            //         break
            // }
        })

        // //for遊戲回合更新時
        // watch(roundStatus,()=>{  //監視每個回合的uuid即可達到切換桌子也啟動計時器判斷；監聽切桌和更新回合時
        //     switch(roundStatus.value){
        //         case 1: //於下注狀態時才啟動計時器
        //             console.log("第"+props.round+"回合倒數開始")
        //             timer ?  clearInterval(timer.value) : null   //先清除上一桌的timer
        //             setCount()
        //             break;
        //     }
        // })
        return{
            //data
            count,
            //methods
            setCount
        }
    },
})
</script>

<style lang="scss">
.counter{
    // overflow: hidden;
    //要調整計時器的位置，請在這裡設置top bottom left right
    z-index: 1;
}
#countNumber{
    top:0;
    font-size: 5rem;
    color:white;
    display: none;
}
#loading{
    display: none;
    border:4px solid;
    border-color:transparent transparent #724a0a #9b7726;
    background-color: rgba(128, 128, 128, 0.507);
    width:110px;
    height:110px;
    border-radius: 50%;
}
</style>