<template>
<h1 class="countNumber">{{count}}</h1>
</template>

<script lang="ts">
import {defineComponent, reactive, ref, watchEffect} from 'vue'
export default defineComponent({
    //倒數計時需要server傳現在下注狀態，以及當前秒數過來
    //然後倒數計時器只要使用當前秒數開始倒數即可
    props:{
        play:{  //外面傳進來的值，只會給true
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
        const setCount =(countNum:number)=>{
        let tim = setInterval(()=>{
                count.value-=1
                if(count.value<0){
                    clearInterval(tim)
                    count.value=countNum //預備下次重新計算
                }
            },1000)
        }
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
.countNumber{
    font-size: 2rem;
}
</style>