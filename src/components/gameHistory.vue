<template>
  <div class="bp-box">
      <section class="main">
        <div class="main-gride" v-for="(grid,index) in main " :key="index"><div class="btn-b">莊</div></div>
        <!-- <div class=" btn-c">和</div>
        <div class=" btn-b">莊</div> -->
      </section>
      <section class="second">
        <div class="sec-gride" v-for="(grid,index) in second " :key="index"><div class="btn-ps">閒</div></div>
        <!-- <div class="btn-bs">莊</div>
        <div class="btn-ps">閒</div>
        <div class="btn-cs">和</div> -->
        <section class="bottom">
          <div class="third">
            <div class="third-gride" v-for="(grid,index) in third " :key="index"></div>
          </div>
          <div class="fourth">
            <div class="fourth-gride" v-for="(grid,index) in fourth " :key="index"></div>
          </div>
          <div class="fifth">
            <div class="fifth-gride" v-for="(grid,index) in fifth " :key="index"></div>
          </div>
        <!-- <div class="btn-bss"></div>
        <div class="btn-pss"></div>
        <div class="btn-css"></div> -->
      </section>
      </section>
     
      
  </div>
</template>

<script>
import {defineComponent, onMounted, reactive} from 'vue'
import {useStore} from 'vuex'
export default defineComponent({
    setup(){
        //Vuex資料
        const store = useStore
        //初始化
        onMounted(()=>{
          historyUpdate()
        })
        //表格
        const main=new Array(48)
        const second=new Array(228)
        const third = new Array(51)
        const fourth = new Array(51)
        const fifth = new Array(12)
        //data
        const winer = reactive({
          banker:"莊",
          player:"閒",
          tie:"合"
        })
        const hisItem = reactive([//到時候history進來的時候就給該格div相對應的class即可
            {  //main
            bankerClass:"btn-b",
            playerClass:"btn-p",
            tieClass:"btn-c",
            },
            { //second
            bankerClass:"btn-bs",
            playerClass:"btn-ps",
            tieClass:"btn-cs",
            },
            { //third
            bankerClass:"btn-bss",
            playerClass:"btn-pss",
            tieClass:"btn-css",
            },
            { //fourth

            },
            { //fifth

            },
        ])
        //路圖更新
        const historyUpdate = ()=>{
          //根據serve傳來的資料更新路圖
        }
        return {
            //data
            main,second,third,fourth,fifth,winer,hisItem,

            //methods
            historyUpdate
        }
    }

})
</script>
<style lang="scss" scope>
.bp-box{
  display: flex;
  overflow: hidden;
  max-height:220px;
  border: 1px solid #654d31 !important;
}
.main{
  display: flex;
  flex-wrap: wrap;
  min-width:25.5%;
  margin-left: 0.7px;
}
.main-gride{
    width:40px;
    height:40px;
    border:2px solid gray;
    margin: 0;
    margin-right: -2px;  //記得要margin-right-同樣ㄉ粗度
    margin-bottom: -2px;
  }
.second{
  display: flex;
  flex-wrap: wrap;
  min-width:42.5%;
  height:10%;
  margin-left: 1.7px;
}
.sec-gride,.third-gride,.fourth-gride,.fifth-gride{
    width:25px;
    height:25px;
    border:2px solid black;
    margin: 0;
    margin-right: -2px;  //記得要margin-right-同樣ㄉ粗度
    margin-bottom: -2px;
}
.sec-gride{
  border:2px solid gray;
}
.bottom{
  display: flex;
}
.third,.fourth,.fifth{
  width:51%;
  display: flex;
  flex-wrap: wrap;
  height:60%;
}
.third{
      margin-left: -0.3px;
}
.fourth{
  margin-left: -11.5px;
}
.fifth{
  width:13.5%;
  margin-left: -7.5px;
}

//客製化修改
.btn-ps{
  vertical-align: top !important;;
}

</style>