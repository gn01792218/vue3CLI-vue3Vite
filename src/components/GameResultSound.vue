<template>
    <audio id="gameresultSound">
        <source  src="../assets/audio/bankerWin.mp3" type="audio/mpeg">
    </audio>
    <!-- <button class="position-absolute" @click="playGameResult">播放不同聲音</button> -->
</template>

<script lang="ts">
import {defineComponent,computed,watch} from 'vue'
import {useStore} from 'vuex'
export default defineComponent({
   setup(){
       const store = useStore();
       const gameResult = computed(()=>{ //回傳的是陣列
            return store.state.dealer.BroadcastGameResult.results
        })
        //為何開始下注的時候會播放遊戲音樂?
        watch(gameResult,()=>{
            if(gameResult.value.length>0){
                playGameResult(gameResult.value)
            }
            //之後改這個
            // playGameResult(result)
        })
        function playSoundList () {
            
        }
        function playGameResult (gameResults:Array<number>){  //之後這裡要帶參數進去
            let gameresultSound = document.querySelector('#gameresultSound') as HTMLAudioElement
            gameResults.forEach(async(i)=>{
                switchSound(gameresultSound,i)
                await gameresultSound?.play()
            })  
        }
        function switchSound (audioElement:HTMLAudioElement,soundNumber:number) {
            switch(soundNumber){
                case 1:
                    audioElement.src = require('../assets/audio/tie.mp3')
                    break
                case 2:
                    console.log("播放莊家音效")
                    audioElement.src = require('../assets/audio/bankerWin.mp3')
                    break
                case 3:
                    audioElement.src = require('../assets/audio/playerWin.mp3')
                    break
                case 4:
                    console.log("播放莊對音效")
                    audioElement.src = require('../assets/audio/playerWin.mp3')  //暫時測試
                    // gameresultSound.src = require('../assets/audio/bankerPair.mp3')
                    break
                case 5:
                    audioElement.src = require('../assets/audio/bankerWin.mp3')  //暫時測試
                    // gameresultSound.src = require('../assets/audio/playerPair.mp3')
                    break
            }
        }
        return {
            //methods
            playGameResult,
        }
    }
})
</script>