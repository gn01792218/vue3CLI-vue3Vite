<template>
    <div class="count-container">
        <div id="loading"></div>
        <h1 id="countNumber">{{count}}</h1>
    </div>
</template>

<script lang="ts">
import {computed, defineComponent,ref,watch} from 'vue'
import {gsap,Power1,Power4} from 'gsap'
export default defineComponent({
    inheritAttrs: false, //防止出現Vue warn
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
        const roundNum = computed(()=>{ 
            return props.round
        })
        const loadingCount = () => { //計時器loading特效
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
                .fromTo('#countNumber',{x:30,opacity:"0",display:"block"},
                {x:20,opacity:"1",ease:Power4.easeInOut})
            }else {
                gsap
                .fromTo('#countNumber',{x:20,opacity:"0",display:"block"},
                {x:0,opacity:"1",ease:Power4.easeInOut})
            }
        }
        const setCount =() => {  //倒數計時
        let timer = setInterval(()=>{
                if(count.value<=0){ //倒數完時
                    clearInterval(timer)
                    count.value=props.countNum //預備下次重新計算
                    gsap //最後要將數字隱藏
                    .fromTo('#countNumber',{x:30,opacity:"0",display:"none"},
                    {x:20,opacity:"1",ease:Power4.easeInOut,display:"none"})
                }else{  //在1以上時才會執行
                    count.value-=1
                    loadingCount()
                }
            },1000)
        }
        //監聽回和數進行倒數計時
        watch(roundNum,()=>{
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
.count-container{
    position: relative;
}
#countNumber{
    position: absolute;
    top:0;
    left:1%;
    font-size: 5rem;
    color:white;
    display: none;
}
#loading{
    display: none;
    border:4px solid;
    border-color:transparent transparent #724a0a #9b7726;
    // background-color: chartreuse;
    width:110px;
    height:110px;
    border-radius: 50%;
}

</style>