<template>
    <div class="gem-left">
        <a href="#" class="logo"><div class="row"><img src="../images/logo.png" class="rwd-img"></div></a>
        <a class="btn w-100" @click="toGametable('A')" >A桌</a>
        <a class="btn w-100" @click="toGametable('B')" >B桌</a>
        <a href="#" class="btn w-100">回大廳</a>
        <div class="align-items-end">
            <div class="col font-yellows"><i class="fa fa-envelope-o" aria-hidden="true"></i> Feed Back</div>
            <div class="col font-yellows"><i class="fa fa-users" aria-hidden="true"></i> 15.378</div>
            <div class="col font-yellows"><i class="fa fa-bell" aria-hidden="true"></i> R5.12.6</div>
        </div>
    </div>
</template>

<script>
import {defineComponent} from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
    setup(){
        const router = useRouter()
        const toGametable = (tableNum)=>{
            router.push({
                path:`/BaccaratGame/${tableNum}`
            })
        }
        return{
            toGametable,
        }
    }
}) 


</script>

<style lang="scss" scope>

</style>