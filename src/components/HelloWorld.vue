<template>
  <div class="hello">
    <h1>Vuex回應資料{{loginRes}}</h1>
    <button type="button" @click="sendLogin">發送proto</button>
    <!-- <button :class="['btn',BorderStyle]" type="button" @click="changeColor">點我換顏色</button> -->
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, onBeforeMount, onMounted, reactive, ref} from 'vue'
import {createSocket,sendWSPush,onmessageWs} from '../webSocket'
import protoRoot from '@/assets/js/proto'
import {useStore} from 'vuex'

export default defineComponent({
  setup(){
    //初始化
    onMounted(()=>{
      createSocket()
    })
    //取得vuex資料
    const store = useStore();
    const loginRes = computed(()=>{
        return store.state.wsStore.wsRes
    })
    //proto資料
    const protoHeader = protoRoot.lookupType('foundation.Header') //先查看Header的結構
    const protoLogin =protoRoot.lookupType('auth.LoginCall') //再查看LoginCall的結構
    const fake=protoLogin.create({ //創建一筆資料
        header:protoHeader.create({ //header要先建立起來
          uri:"LoginCall",
        }),
        account:"你何時會來~",
        password:"今天可以討論一下串接一些基本資料，如直播網址、tableInfo等等的嗎~"
    })
    const sendLogin=()=>{
      sendWSPush(fake,"auth.LoginCall")
    }

    //變換顏色
    const BorderStyle=ref<string | null>(null)
    const changeColor=()=>{
      BorderStyle.value="red"
    }
    return{
      //data
      BorderStyle,fake,loginRes,
      //methods
      sendLogin,changeColor,
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
