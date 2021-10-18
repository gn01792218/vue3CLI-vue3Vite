<template>
    <div class="gem-left">
        <div class="logo"><a href="#"><img src="../images/logo.png" class="rwd-img"></a></div>
        <div class="left-btn">
            <a class="btn w-85" @click="toGametable('A')" >A桌</a>
            <a class="btn w-85" @click="toGametable('B')" >B桌</a>
            <a href="#" class="btn w-85" @click="closeWindow">回大廳</a>
        </div>
        <div class="align-items-end">
            <div class="col font-yellows"><i class="fa fa-envelope-o" aria-hidden="true"></i> Feed Back</div>
            <div class="col font-yellows"><i class="fa fa-users" aria-hidden="true"></i> 15.378</div>
            <div class="col font-yellows"><i class="fa fa-bell" aria-hidden="true"></i> R5.12.6</div>
        </div>
    </div>
</template>

<script>
import {defineComponent, reactive} from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
    setup(){
        //路由處理
        const router = useRouter()
        //換桌
        function toGametable (tableNum) {
            router.push({
                path:`/BaccaratGame/${tableNum}`
            })
        }
        //回大廳，關閉視窗
        function closeWindow () {
            window.opener = null;
            window.open("about:blank","_self").close();
        }
        return{
            //data
            
            //methods
            toGametable,closeWindow
        }
    }
}) 
</script>

<style lang="scss" scope>
    .gem-left{
        height:95.5% !important;  //這個之後在手機板不能使用import
    }
</style>