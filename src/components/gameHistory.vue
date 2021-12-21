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
import BeadPlate from './road/BeadPlate.vue'
import SideRoadGrid from './road/SideRoadGrid.vue'
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