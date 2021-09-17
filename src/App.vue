<template>
  <div class="app">
  <Header class="header"/>
  <router-view/>
  </div>
   
</template>
<script>
import { defineComponent } from 'vue'
import Header from './views/Header.vue'
export default defineComponent({
  components:{
    Header,
  },
  setup() {
    
  },
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.app{
  display: flex;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    //&可以看作是串联选择器的连接符
    //等同於a.router-link-exact-active{}
    &.router-link-exact-active { 
      color: #42b983;
    }
  }
}
</style>
