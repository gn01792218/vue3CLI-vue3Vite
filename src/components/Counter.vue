<template>
<h1 class="countNumber">{{count}}</h1>
</template>

<script lang="ts">
import {defineComponent, reactive, ref, watchEffect} from 'vue'
export default defineComponent({
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
            count,setCount
        }
    },

    mounted(){
    },
    watch:{  //目前是監聽外面的傳入的play變化
        play:function (){
            if(this.tim){console.log("目前有計時器唷!"); return} //假如目前有計時器的話，要return掉
            this.setCount(this.countNum);
        }
    }

})
</script>

<style lang="scss">
.countNumber{
    font-size: 2rem;
}
</style>