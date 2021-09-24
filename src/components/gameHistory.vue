<template>
<div class="container">
 <div class="wrap">
      <div class="item" v-for="i,index in total" :key="index"><img src="../assets/logo.png" alt=""></div>
  </div>
  <div class="secon">
    <div class="scitem" v-for="i,index in second" :key="index"><img src="../assets/logo.png" alt=""></div>
  </div>
</div>
</template>

<script>
import {defineComponent, onMounted, reactive} from 'vue'
export default defineComponent({
    setup(){
        const total=new Array(25)
        const second=new Array(190)
        return {
            total,second
        }
        

    }

})
</script>

<style lang="scss" scope>
.container{
    display: flex;
}
.wrap{
    width:260px;
    height:40px;
    display: flex;
    flex-wrap:wrap;
    margin:0;
    .item{
        border:2px solid black;
        width:50px;
        height:50px;
        margin: 0;
        margin-right: -2px;  //記得要margin-right-同樣ㄉ粗度
        margin-bottom: -2px;
        img{
            width:100%;
        }
    }
}
.secon{
    width:500px;
    height:40px;
    display: flex;
    flex-wrap:wrap;
    margin:0;
    .scitem{
        border:2px solid black;
        width:24px;
        height:24px;
        margin: 0;
        margin-right: -2px;  //記得要margin-right-同樣ㄉ粗度
        margin-bottom: -2px;
        img{
            width:100%;
        }
    }
}
</style>