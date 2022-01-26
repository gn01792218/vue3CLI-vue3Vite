<template>
    <div class="leave position-absolute">
       <h1> 您已離開此遊戲，請關閉網頁</h1>
    </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
   setup(){
       const store = useStore()
       store.commit('lobby/setShowannouncement',false)
        return {
            
        }
    }
})
</script>