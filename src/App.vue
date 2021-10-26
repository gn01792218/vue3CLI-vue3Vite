<template>
  <div id="wap" class="app">
    <div class="container-fluid">
      <div class="container-waps row">
        <Header/>
        <router-view/>
         <Footer/>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, onUnmounted} from 'vue'
import Header from './views/Header.vue'
import Footer from './views/Footer.vue'
import BaccaratGame from './views/BaccaratGame.vue'

export default defineComponent({
  components:{
    Header,Footer,BaccaratGame
  },
  setup() {
  },
})
</script>

<style>

</style>
