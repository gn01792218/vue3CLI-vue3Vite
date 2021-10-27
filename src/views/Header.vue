<template>
    <div class="header">
        <div class="header-logo"><a href="#"><img src="../images/logo.png"></a></div>
        <div class="header-btnList">
            <a class="header-btn" @click="toGametable('A')" >A桌</a>
            <a class="header-btn" @click="toGametable('B')" >B桌</a>
            <a href="#" class="header-btn" @click="backToHome">回大廳</a>
            <!-- <router-link to="/practice">測試頁面</router-link> -->
        </div>
        <div class="header-bottom align-items-end">
            <div class="col font_yellows"><i class="fa fa-envelope-o" aria-hidden="true"></i> Feed Back</div>
            <div class="col font_yellows"><i class="fa fa-users" aria-hidden="true"></i> 15.378</div>
            <div class="col font_yellows"><i class="fa fa-bell" aria-hidden="true"></i> R5.12.6</div>
        </div>
    </div>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue'
import { useRouter} from 'vue-router'
import {useStore} from 'vuex'
export default defineComponent({
    setup(){
        //vuex
        const store = useStore()
        const userToken = computed(()=>{
            return store.state.auth.userToken
        })
        //路由處理
        const router = useRouter()
        //換桌
        function toGametable (tableNum:string) {
            router.push({
                path:`/BaccaratGame/${tableNum}`
            })
        }
        //回Home
        function backToHome () {
            //要記得帶userToken唷
            router.push(`/Home/${userToken.value}`)
        }
        //關閉視窗
        function closeWindow () {
            window.opener = null;
            window.open("about:blank","_self")?.close();
        }
        return{
            //data
            
            //methods
            toGametable,backToHome
        }
    }
}) 
</script>

<style>
</style>