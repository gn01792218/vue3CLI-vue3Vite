<template>
  <div class="hello">
    <h1>用戶座標</h1>
    <button type="button" @click="sendLogin">發送proto</button>
    <!-- <button :class="['btn',BorderStyle]" type="button" @click="changeColor">點我換顏色</button> -->
  </div>
</template>

<script lang="ts">
import {defineComponent, onBeforeMount, onMounted, reactive, ref} from 'vue'
import {createSocket,sendWSPush,onmessageWs} from '../webSocket'
import protoRoot from '@/proto/proto'

export default defineComponent({
  setup(){
    onMounted(()=>{
      createSocket()
    })
    const BorderStyle=ref<string | null>(null)
    const protoHeader = protoRoot.lookupType('foundation.Header') //先查看Header的結構
    const protoLogin =protoRoot.lookupType('auth.LoginCall') //再查看LoginCall的結構
    const fake=protoLogin.create({ //創建一筆資料
        header:protoHeader.create({ //header要先建立起來
          uri:"LoginCall",
        }),
        account:"請傳",
        password:"等你來上班~"
    })
    const sendLogin=()=>{
      sendWSPush(fake)
    }
    const changeColor=()=>{
      BorderStyle.value="red"
    }
    return{
      sendLogin,changeColor,BorderStyle,fake
    }
  },
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
