<template>
    <!-- put this in Element tag to trigger modal -->
    <!-- data-toggle="modal" data-target="#exampleModal" -->
<!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <h2 class="modal-body">玩家下注資訊</h2>
                    <ul class="userBetInfo">
                        <li>場次:</li>
                        <li>遊戲單:</li>
                        <li>時間:<Date/></li>
                        <li>遊戲輸贏:</li>
                        <li>下注:</li>
                        
                    </ul>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
                </div>
            </div>
        </div>
    </div>
  
</template>

<script>
import {defineComponent} from 'vue'
import {useStore} from 'vuex'
import Date from '@/components/Date'
export default defineComponent({
    components:{
        Date
    },
    setup(){
        return{
            //data
            //methods
        }
    }
})
</script>

<style>
.modal-body{
    color:black;
    text-align: center;
}
.userBetInfo{
    list-style: none;
    text-align: left;
}

</style>