<template>
  <div class="hello">
    <h6>Vuex回應資料{{loginRes}}</h6>
    <h6>使用者資訊{{userInfo}}</h6>
    <button type="button" @click="login">發送proto</button>
    <!-- <button :class="['btn',BorderStyle]" type="button" @click="changeColor">點我換顏色</button> -->
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, onBeforeMount, onMounted, reactive, ref, watch} from 'vue'
import {createSocket} from '../webSocket'
import {useStore} from 'vuex'
import {sendLogin} from '../socketApi'

export default defineComponent({
  setup(){
    //初始化
    onMounted(() => {
      createSocket()
    })
    //取得vuex資料
    const store = useStore();
    const loginRes = computed(() => {
        return store.state.auth.LoginRecall
    })
    const userInfo = computed(()=>{
      return store.state.auth.UserInfo
    })
    const logData = reactive({
       uri: "LoginCall",
       account: "user",
       password: "password"
    })
    const login = () => {
      sendLogin(logData)
    }
    //變換顏色
    const BorderStyle = ref<string | null>(null)
    const changeColor = () => {
      BorderStyle.value="red"
    }

    return{
      //data
      BorderStyle,logData,loginRes,userInfo,
      //methods
      login,changeColor
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
