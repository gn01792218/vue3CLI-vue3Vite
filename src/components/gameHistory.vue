<template>
  <div class="gameHistory d-flex position-relative">
     <BeadPlate/>
     <SideRoadGrid/>
      <!--for mobil verson show poker -->
      <LightBox>
        <CardInfo class="mobilePoker"/>
      </LightBox>
    </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import BeadPlate from './BeadPlate.vue'
import SideRoadGrid from './SideRoadGrid.vue'
import CardInfo from './CardInfo.vue'
import LightBox from '@/components/LightBox.vue'
export default defineComponent({
  components:{
    BeadPlate,
    SideRoadGrid,
    CardInfo,
    LightBox,
  },
    setup(){
        return {
          //data
          //methods
          
        }
    }
})
</script>
<style lang="scss">
.gameHistory{
  border: 1px solid #654d31 !important;
}
.lightBox{
  width:100%;
  height:100%;
  background-color: #654d31b7;
  left:50%;
  transform: translateX(-50%);
  z-index:2;
}
//客製化修改
.btn-ps{
  vertical-align: top !important;;
}
.test{
  bottom: 0;
}
</style>