<template>
    <div class="LoadingPage w-100 h-100 position-absolute" v-if="loading">
        <p>Loading...please wait</p>
        <div class="preLoad" v-show="preLoad">
        <span class="coin-preLoad"></span>
        <span class="poker"></span>
        <span class="roadImg-preLoad"></span>
        <audio  preload >
            <source src="../assets/audio/bankerWin.mp3" > 
        </audio>
        <audio  preload>
            <source src="../assets/audio/playerWin.mp3">
        </audio>
        <audio  preload>
            <source src="../assets/audio/tie.mp3">
        </audio>
    </div>
    </div>
    
</template>

<script lang="ts">
import {defineComponent,ref,computed,watch, onMounted} from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
    setup(){
        // let preMusic =  document.querySelector('#gameresultSound') as HTMLAudioElement
        // preMusic.play()
        const store = useStore()
        const loading = ref(true)
        const preLoad = ref(true)
        const vuexUserToken = computed(()=>{
            return store.state.auth.userToken
        })
        const loginState = computed(()=>{  //取得登入狀態
            return store.state.auth.LoginRecall.status
        })
        if(vuexUserToken.value!==""){  //已經有人登入的話，就不執行
             loading.value = false 
        }
        onMounted(()=>{  //此時資源已經載入完畢
            //且登入狀態是1就給登入
            watch(loginState,()=>{
            switch(loginState.value){
                case 1:
                    loading.value = false
                }
            })
        })
        return {
            //data
            preLoad,loading,
        }
    }
})
</script>

<style>
  
</style>