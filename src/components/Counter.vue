<template>
    <div id="loading"></div>
    <h1 id="countNumber">{{count}}</h1>
</template>

<script lang="ts">
import {computed, defineComponent,ref,watch} from 'vue'
import {gsap,Power1} from 'gsap'
export default defineComponent({
    //倒數計時需要server傳現在下注狀態，以及當前還剩下幾秒過來
    //然後倒數計時器只要使用當前秒數開始倒數即可
    props:{
        round:{  //外面傳進來的值，給數字代表計算幾次-->預計等於下注的round uuid
            type:Number,
        },
        countNum:{
            type:Number,
            default:15
        }
    },
    setup(props){
        //計時器
        const count = ref<number>(props.countNum as number)
        const round = computed(()=>{ //監聽外面傳進來的
            return props.round
        })
        const loadingCount = () => {
            //外框動畫
            gsap
            .to('#loading',{
                keyframes:[
                    {rotation:0,display:'block'},
                    {duration:0.5,
                    ease:Power1.easeInOut,
                    rotation:360,
                    display:'none'
                    }
                ]
            })
            //個位數字的居中
            if(count.value<10){
                gsap
                .fromTo('#countNumber',{x:20},{x:20})
            }
        }
        const setCount =() => {
        let timer = setInterval(()=>{
                if(count.value<=0){ //倒數完時
                    clearInterval(timer)
                    count.value=props.countNum //預備下次重新計算
                }else{
                    count.value-=1
                    loadingCount()
                }
            },1000)
        }
        watch(round,()=>{
            setCount()
        })
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
#countNumber{
    position: absolute;
    top:0;
    left:11.5%;
    font-size: 5rem;
    color:white;
}
#loading{
    display: none;
    position: relative;
    border:4px solid;
    border-color:transparent transparent #724a0a #9b7726;
    // background-color: chartreuse;
    width:110px;
    height:110px;
    border-radius: 50%;
}

</style>