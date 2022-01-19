<template>
  <div class="header">
    <div class="header-top">
      <div class="header-logo d-none d-md-block">
        <a href="#"><img src="../images/logo.png" /></a>
      </div>
      <div
        class="header-btnList align-items-center justify-content-around mt-xl-5"
      >
        <div
          class="
            d-flex d-xl-none
            userWallet-mobil
            header-userName
            col
            font_yellows
          "
        >
          <span>分</span><span>{{ userWallet }}</span>
        </div>
        <div
          class="
            d-block d-xl-none
            userWallet-mobil
            header-userName
            col
            font_yellows
          "
          v-if="user"
        >
          <i>洗:{{ user.totalValidBets }}</i>
        </div>
        <div class="d-flex flex-row flex-xl-column">
          <a
            class="header-btn"
            :class="{ active: tableNum == 'A' }"
            @click="toGametable('A')"
            >A桌</a
          >
          <!-- <a class="header-btn disabled">B桌</a> -->
          <a
            class="header-btn"
            :class="{ active: tableNum == 'B' }"
            @click="toGametable('B')"
            >B桌</a
          >
          <!-- <a href="#" class="header-btn" @click="backToHome">回大廳</a> -->
          <a href="#" class="header-btn d-none d-xl-block" @click="closeWindow"
            >離開遊戲</a
          >
          <a href="#" class="header-btn d-block d-xl-none" @click="closeWindow"
            >離開</a
          >
        </div>
      </div>
    </div>
    <div class="header-bottom">
      <div class="header-bottom-desk">
        <div
          class="header-userName d-flex col font_yellows"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          <i class="bi bi-person-circle"></i><i v-if="user">{{ user.name }}</i>
        </div>
        <div class="header-userName col font_yellows">分{{ userWallet }}</div>
        <div class="header-userName col font_yellows">
          <i>{{ tableNum }}桌 靴:{{ shoe }}局:{{ roundNum }}</i>
        </div>
        <div class="header-userName col font_yellows" v-if="user">
          <i>洗碼值:{{ user.totalValidBets }}</i>
        </div>
      </div>
      <!-- 手機版本漢堡 -->
      <div class="header-bottom-mobil d-flex align-items-center">
        <div class="header-bottom-mobil-extend position-absolute">
          <div class="collapse" id="navbarToggleExternalContent">
            <div class="bg-dark p-4">
              <div
                class="header-userName d-flex col font_yellows"
                data-toggle="modal"
                data-target="#exampleModal"
              >
                <i class="bi bi-person-circle"></i
                ><i v-if="user">{{ user.name }}</i>
              </div>
              <div class="header-userName col font_yellows">
                <i>{{ tableNum }}桌 靴:{{ shoe }}局:{{ roundNum }}</i>
              </div>
            </div>
          </div>
        </div>
        <nav class="navbar navbar-dark">
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarToggleExternalContent"
            aria-controls="navbarToggleExternalContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue'
import { useRouter} from 'vue-router'
import { useRoute } from 'vue-router'
import {useStore} from 'vuex'
import ProgressBar from '@/components/ProgressBar.vue'
export default defineComponent({
    components:{
        ProgressBar,
    },
    setup(){
        //route
        const route = useRoute()
        const tableNum = computed(()=>{
            return route.params.tableId
        })
        //vuex
        const store = useStore()
        const userToken = computed(()=>{
            return store.state.auth.userToken
        })
        const user = computed(()=>{
            return store.state.auth.UserInfo.user
        })
        // const validBets = computed(()=>{
        //     return store.state.auth.UserInfo.user.totalValidBets
        // })
        const userWallet = computed(()=>{
            return store.state.auth.userWalletFomate
        })
        const shoe = computed(()=>{
            return store.state.game.numOfShoe
        })
        const roundNum = computed(()=>{
            return store.state.game.numOfRound
        })
        const announcement1Checked = computed(()=>{
            return store.state.lobby.announcement.announcement1.checked
        })
        const announcement2Checked = computed(()=>{
        return store.state.lobby.announcement.announcement2.checked
        })
        const announcement3Checked = computed(()=>{
        return store.state.lobby.announcement.announcement3.checked
        })
        //路由處理
        const router = useRouter()
        //換桌
        function toGametable (tableNum:string) {
            if(announcement1Checked.value && announcement2Checked.value && announcement3Checked.value){
                store.commit('table/setCurrentTable',tableNum)
                router.push({
                    path:`/BaccaratGame/${tableNum}`
                })
            }else{
                alert('請先同意所有遊戲公告事項之規範')
            }
        }
        //回Home
        function backToHome () {
            //要記得帶userToken唷
            router.push(`/Home/${userToken.value}`)
        }
        //關閉視窗
        function closeWindow () {
            var op = window.open('/leave','_self') as Window
            op.alert('您已離開遊戲，請關閉網頁')
            op.opener = null
            op.close()
        }
        return{
            //data
            user,
            userWallet,
            roundNum,
            shoe,
            tableNum,
            // validBets,
            //methods
            toGametable,
            backToHome,
            closeWindow,
        }
    }
})
</script>
