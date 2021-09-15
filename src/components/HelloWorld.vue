<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div>{{count}}</div>
    <input type="text" v-model="count">
   <button type="button" @click="countplus">count++</button>
    <button type="button" @click="sendUser">發送proto</button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import {createSocket,sendWSPush,onmessageWs} from '../webSocket'
@Options({
  props: {
    msg: String
  },
  data(){
    return{
      count:0,
      user:{
      userId : 1,
      name : "HI",
      mobile : "我又換了一個版本"
      }
    }
  },
  mounted(){
    createSocket()
    
  },
  methods:{
    countplus(){
      console.log("點按鈕")
      this.count++;
    },
     sendUser(){
      sendWSPush(this.user)
    }
  }
})
export default class HelloWorld extends Vue {
  msg!: string
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
