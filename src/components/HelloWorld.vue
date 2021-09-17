<template>
  <div class="hello">
    <h1>用戶座標</h1>
    <div>x:{{x}}；y:{{y}}
    </div>
    <button type="button" @click="sendLogin">發送proto</button>
    <button :class="['btn',BorderStyle]" type="button" @click="changeColor">點我換顏色</button>
  </div>
</template>

<script lang="ts">
import {defineComponent, onBeforeMount, onMounted, reactive, ref} from 'vue'
import {createSocket,sendWSPush,onmessageWs} from '../webSocket'
import protoRoot from '@/proto/proto'
import useMousePosition from '../hooks/useMousePosition'
export default defineComponent({
   props: {
    msg: String
  },
  setup(){
    const {x,y} = useMousePosition()
    const BorderStyle=ref<string | null>(null)
    const protoHeader = protoRoot.lookupType('foundation.Header')
    const protoLogin =protoRoot.lookupType('auth.LoginCall')
    const a=protoLogin.create({
        header:protoHeader.create({
          uri:"LoginCall",
        }),
        account:"請給我石頭",
        password:"#@$#@%$#@$%$!!!!!!"
    })
    // const fack =reactive({
    //     header:'LoginCall',
    //     account:"Vue3+TS+WE+PROTO崩潰到一個極致",
    //     password:"#@$#@%$#@$%$!!!!!!"
    //   })
    const sendLogin=()=>{
      sendWSPush(a)
    }
    const changeColor=()=>{
      BorderStyle.value="red"
    }
    return{
      sendLogin,x,y,changeColor,BorderStyle,a
    }
  },
  mounted(){
    createSocket()
  }

})

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
.liveCamara{
  width:600px;
  height:500px;
}

.btn{
  border:#42b983 3px solid
}
.red{
  border:red 3px solid
}

</style>
