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
        const gameUuid = computed(()=>{ //遊戲回合的Uuid
            return store.state.game.gameUuid
        })
        const gameEndUuid = computed(()=>{
            return store.state.game.gameEndUuid
        })
        const audio = computed<HTMLAudioElement>(()=>{
            return document.querySelector('#gameresultSound') as HTMLAudioElement
        })
        watch(gameUuid,()=>{
            if(audio){
                audio.value.src = require('../assets/audio/start.mp3')
                audio.value.play()
            }
        })
        watch(gameEndUuid,()=>{
            if(audio){
                audio.value.src = require('../assets/audio/stop.mp3')
                audio.value.play()
            }
        })
        watch(gameResult,()=>{
            if(gameResult.value.length>0){
                playGameResult(gameResult.value)
            }
            //之後改這個
            // playGameResult(result)
        })

        function playGameResult (gameResults:Array<number>){  //之後這裡要帶參數進去
            let gameresultSound = document.querySelector('#gameresultSound') as HTMLAudioElement
            gameResults.forEach(async(i)=>{
                switchSound(audio.value,i)
                await audio?.value.play()
            })  
        }
        function switchSound (audioElement:HTMLAudioElement,soundNumber:number) {
            switch(soundNumber){
                case 4:
                    audioElement.src = require('../assets/audio/tie.mp3')
                    break
                case 2:
                    audioElement.src = require('../assets/audio/bankerWin.mp3')
                    break
                case 1:
                    audioElement.src = require('../assets/audio/playerWin.mp3')
                    break
                case 3:
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