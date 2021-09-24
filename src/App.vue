<template>
  <div id="wap" class="app">
    <div class="container-wap">
      <div class="container-waps row">
        <Header/>
        <BaccaratGame/>
        <!-- <router-view/> -->
         <Footer/>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
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

<style lang="scss">

// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   color: #2c3e50;
// }
// .app{
//   display: flex;
// }
// #nav {
//   padding: 30px;
//   a {
//     font-weight: bold;
//     color: #2c3e50;
//     //&可以看作是串联选择器的连接符
//     //等同於a.router-link-exact-active{}
//     &.router-link-exact-active { 
//       color: #42b983;
//     }
//   }
// }
</style>
