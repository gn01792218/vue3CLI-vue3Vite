<template>
    <div class="LoadingPage w-100 h-100 position-absolute" v-if="loading">
        <p>Loading...please wait</p>
        <div class="preLoad" v-show="preLoad">
        <span class="coin-preLoad"></span>
        <span class="poker"></span>
        <span class="roadImg-preLoad"></span>
        <audio class="preaudio" preload muted>
            <source src="../assets/audio/bankerWin.mp3" > 
        </audio>
        <audio class="preaudio" preload muted>
            <source src="../assets/audio/playerWin.mp3">
        </audio>
        <audio class="preaudio" preload muted>
            <source src="../assets/audio/tie.mp3">
        </audio>
        <audio class="preaudio" preload muted>
            <source src="../assets/audio/start.mp3">
        </audio>
        <audio class="preaudio" preload muted>
            <source src="../assets/audio/stop.mp3">
        </audio>
        <div class='progress'>
            <div class='progress-inset'></div>
        </div>
    </div>
    </div>
    
    
</template>

<script lang="ts">
import {defineComponent,ref,computed,watch, onMounted} from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
    setup(){
        onMounted(()=>{
            preaudio.value.muted = true
            preaudio.value.play()
        })
        const preaudio = computed(()=>{  //只要抓其中一個就可以了
            return document.querySelector('.preaudio') as HTMLAudioElement
        })
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

<style lang='scss'>
    .progress {
  position: relative;
  border: 5px solid #FFF;
  width: 400px;
  height: 20px;
  overflow: hidden;
  &.loaded { display: none;}
  .progress-inset {
    position: absolute;
    top: 0; left: 0;
    height: 100%;
    background: #FFF;
  }
}
  
</style>