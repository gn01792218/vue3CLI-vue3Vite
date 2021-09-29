<template>
<div class="his-container">
 <div class="mainHistory">
      <div class="main-grid" v-for="i,index in total" :key="index"></div>
  </div>
  <div class="secon">
    <div class="sc-grid" v-for="i,index in second" :key="index"></div>
  </div>
</div>

</template>

<script>
import {defineComponent} from 'vue'
export default defineComponent({
    setup(){
        //表格
        const total=new Array(20)
        const second=new Array(190)
        return {
            //data
            total,second,

            //methods

        }
    }
})
</script>

<style lang="scss" scope>
.his-container{
    display: flex;
    background-color: white;
    border: 2px solid #644d31;
    height:220px;
}
.mainHistory{
    width:260px;
    height:100%;
    // height:220px;
    display: flex;
    flex-wrap:wrap;
    margin:0;
    .main-grid{
        border:2px solid black;
        width:25px;
        height:25px;
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
    // height:220px;
    display: flex;
    flex-wrap:wrap;
    margin:0;
    .sc-grid{
        border:2px solid black;
        width:12.5px;
        height:12.5px;
        margin: 0;
        margin-right: -2px;  //記得要margin-right-同樣ㄉ粗度
        margin-bottom: -2px;
        img{
            width:100%;
        }
    }
}
</style>