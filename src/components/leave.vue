<template>
    <div class="leave position-absolute">
       <h1> {{text}}</h1>
    </div>
</template>

<script lang="ts">
import {computed, defineComponent,onMounted,ref,} from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
   setup(){
       onMounted(()=>{
           if(serverDisConnect.value){ //假如是被斷線來的，顯示斷線訊息
               text.value = textArr[1]
           }
       })
       const store = useStore()
       const serverDisConnect = computed(()=>{
           return store.state.game.serverDisConnect
       })
       store.commit('lobby/setShowannouncement',false)
       const textArr = ["您已離開此遊戲，請關閉網頁","由於超過10次未下注，您已被強制登出遊戲，請關閉網頁"]
       const text = ref(textArr[0])
        return {
            //data
            text,
        }
    }
})
</script>