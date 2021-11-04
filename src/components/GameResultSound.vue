<template>
    <audio id="gameresultSound">
        <source  src="../assets/audio/bankerWin.mp3" type="audio/mp3">
    </audio>
    <!-- <button class="position-absolute" @click="playGameResult">播放不同聲音</button> -->
</template>

<script lang="ts">
import {defineComponent,computed,watch, onMounted} from 'vue'
import {useStore} from 'vuex'
export default defineComponent({
   setup(){
       const store = useStore();
       const roundUuid = computed(()=>{ //遊戲回合的Uuid
            return store.state.game.gameUuid
        })
        watch(roundUuid,()=>{
            let gameresultSound = document.querySelector('#gameresultSound') as HTMLAudioElement
            gameresultSound?.play()
            //之後改這個
            // playGameResult(result)
        })
        function playGameResult (){  //之後這裡要帶參數進去
             //之後這裡要根據不同的情況，撥放不同的src
            let gameresultSound = document.querySelector('#gameresultSound') as HTMLAudioElement
            gameresultSound.src = require('../assets/audio/tie.mp3')
            gameresultSound?.play()
        }
        return {
            //methods
            playGameResult,
        }
    }
})
</script>