<template>
    <!-- <ProgressBar/> -->
    <div class="header">
        <div class="header-top">
            <div class="header-logo"><a href="#"><img src="../images/logo.png"></a></div>
            <div class="header-btnList mt-xl-5">
                <a class="header-btn" @click="toGametable('A')" >A桌</a>
                <a class="header-btn disabled">B桌</a>
                <!-- <a class="header-btn" @click="toGametable('B')">B桌</a> -->
                <!-- <a href="#" class="header-btn" @click="backToHome">回大廳</a> -->
            </div>
        </div>
        <div class="header-bottom">
            <div class="header-userName d-flex col font_yellows" data-toggle="modal" data-target="#exampleModal"><i class="bi bi-person-circle" ></i><i v-if="user">{{user.name}}</i></div>
            <div class="d-none d-xl-block col font_yellows"><i class="fa fa-users" aria-hidden="true"></i> 15.378</div>
            <div class="d-none d-xl-block col font_yellows"><i class="fa fa-bell" aria-hidden="true"></i> R5.12.6</div>
        </div>
    </div>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue'
import { useRouter} from 'vue-router'
import {useStore} from 'vuex'
import ProgressBar from '@/components/ProgressBar.vue'
export default defineComponent({
    components:{
        ProgressBar,
    },
    setup(){
        //vuex
        const store = useStore()
        const userToken = computed(()=>{
            return store.state.auth.userToken
        })
        const user = computed(()=>{
            return store.state.auth.UserInfo.user
        })
        //路由處理
        const router = useRouter()
        //換桌
        function toGametable (tableNum:string) {
            store.commit('table/setCurrentTable',tableNum)
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
            user,
            //methods
            toGametable,backToHome
        }
    }
}) 
</script>

<style>
.disabled,.disabled:hover{
    background: gray !important;
}
</style>