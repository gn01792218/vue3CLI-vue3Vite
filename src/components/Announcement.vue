<template>
  <div class="announcement w-100 h-100 position-absolute">
    <div class="announcement-bg w-100 h-100 position-absolute"></div>
    <div class="announcement-container position-absolute p-4">
      <header class="announcement-header text-center mb-4">
        <h1>遊戲公告同意書</h1>
      </header>
      <section id="announcement1" class="announcement-body mb-4" v-show="currentAnnouncement==0">
        <h3 class="text-center">遊戲公告1</h3>
        <div
            class="text-left"
            v-for="(i, index) in announcementData1.content"
            :key="index"
          >
            <p class="announcementTitle">{{ i.title }}</p>
            <div :id="`announcementContent1-${index}`" class="announcementContent">{{ i.content }}</div>
        </div>
        <div class="d-flex align-items-center flex-column">
          <div class="form-group form-check d-flex align-items-center">
            <input type="checkbox" class="mr-2" id="announcementCheck1" v-model="announcementData1.checked"/>
            <label class="form-check-label" for="announcementCheck1">
              我同意遊戲公告1之條文內容
            </label>
          </div>
          <i class="bi bi-arrow-right-square" @click="setCurrentAnnouncement(1)"></i>
        </div>
      </section>
      <section id="announcement2" class="announcement-body mb-4" v-show="currentAnnouncement==1">
        <h3 class="text-center">遊戲公告2</h3>
        <div
            class="text-left"
            v-for="(i, index) in announcementData2.content"
            :key="index"
          >
            <p class="announcementTitle">{{ i.title }}</p>
            <div :id="`announcementContent2-${index}`" class="announcementContent"></div>
        </div>
        <div class="d-flex align-items-center flex-column">
          <div class="form-group form-check d-flex align-items-center">
            <input type="checkbox" class="mr-2" id="announcementCheck2" v-model="announcementData2.checked"/>
            <label class="form-check-label" for="announcementCheck2">
              我同意遊戲公告2之條文內容
            </label>
          </div>
          <div class="d-flex">
            <i class="bi bi-arrow-left-square" @click="setCurrentAnnouncement(0)"></i>
            <i class="bi bi-arrow-right-square" @click="setCurrentAnnouncement(2)"></i>
          </div>
        </div>
      </section>
      <section class="announcement-body mb-4" v-show="currentAnnouncement==2">
        <h3 class="text-center">{{announcementData3.content[0].title}}</h3>
        <div
            class="text-left"
            v-for="(i, index) in announcementData3.content"
            :key="index"
        >
            <p class="announcementContent">{{ i.content }}</p>
            <div class="announcement3Img mr-auto ml-auto">
              <img class="w-100" :src="i.img" alt="">
            </div>
        </div>
        <div class="d-flex align-items-center flex-column">
          <div class="form-group form-check d-flex align-items-center">
            <input type="checkbox" class="mr-2" id="announcementCheck3" v-model="announcementData3.checked"/>
            <label class="form-check-label" for="announcementCheck3">
              我同意百家樂遊戲牌例之條文內容
            </label>
          </div>
          <i class="bi bi-arrow-left-square" @click="setCurrentAnnouncement(1)"></i>
          <button type="button" class="btn btn-info" @click="closeAnnouncement">
          進入遊戲
        </button>
        </div>
      </section>
      <!-- <div class="announcement-body mb-4">
        <section>
          <h3 class="text-center">遊戲公告1</h3>
          <div
            class="text-left"
            v-for="(i, index) in announcementData1.content"
            :key="index"
          >
            <p class="announcementTitle">{{ i.title }}</p>
            <p class="announcementContent">{{ i.content }}</p>
          </div>
        </section>
        <section>
          <h3 class="text-center">遊戲公告2</h3>
          <div
            class="text-left"
            v-for="(i, index) in announcementData2.content"
            :key="index"
          >
            <p class="announcementTitle">{{ i.title }}</p>
            <p class="announcementContent">{{ i.content }}</p>
          </div>
        </section>
        <section>
          <h3 class="text-center">遊戲公告3</h3>
          <div
            class="text-left"
            v-for="(i, index) in announcementData3.content"
            :key="index"
          >
            <p class="announcementTitle">{{ i.title }}</p>
            <p class="announcementContent">{{ i.content }}</p>
          </div>
        </section>
      </div> -->
      <!-- <div class="announcement-fotter d-flex flex-column justify-content-center">
          <div class="form-group form-check d-flex align-items-center">
            <input type="checkbox" v-model="announcementData1.checked" />
            <p class="form-check-label" for="exampleCheck1">
              我同意遊戲公告1之條文內容
            </p>
          </div>
          <div class="form-group form-check d-flex align-items-center">
            <input type="checkbox" v-model="announcementData2.checked" />
            <p class="form-check-label" for="exampleCheck1">
              我同意遊戲公告2之條文內容
            </p>
          </div>
          <div class="form-group form-check d-flex align-items-center">
            <input type="checkbox" v-model="announcementData3.checked" />
            <p class="form-check-label" for="exampleCheck1">
              我同意遊戲公告3之條文內容
            </p>
          </div>
        <button type="button" class="btn btn-info" @click="closeAnnouncement">
          進入遊戲
        </button>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent , onMounted, ref, watch} from "vue";
import { useStore } from "vuex";
export default defineComponent({
  setup() {
    onMounted(()=>{
      //為公告2增加紅色字體
      let t = document.querySelector('.container-waps')?.children as HTMLCollection
      let ann2 = t[0].children[1].children[2].children
      announcementData2.content.forEach((i:any,index:number)=>{
          ann2[index+1].children[1].innerHTML = i.content
      })
    })
    //  const localStorage = window.localStorage
    const store = useStore();
    const announcementData1 = store.state.lobby.announcement.announcement1;
    const announcementData2 = store.state.lobby.announcement.announcement2;
    const announcementData3 = store.state.lobby.announcement.announcement3;
    const announcement1Checked = computed(()=>{
      return store.state.lobby.announcement.announcement1.checked
    })
    const announcement2Checked = computed(()=>{
      return store.state.lobby.announcement.announcement2.checked
    })
    const announcement3Checked = computed(()=>{
      return store.state.lobby.announcement.announcement3.checked
    })
    const show = computed(() => {
      return store.state.lobby.showannouncement;
    });
    const currentAnnouncement = ref(0)
    watch(announcement1Checked,()=>{
      if(announcement1Checked.value){
        setCurrentAnnouncement(1)
      }
    })
    watch(announcement2Checked,()=>{
      if(announcement2Checked.value){
        setCurrentAnnouncement(2)
      }
    })
    // function announcementChecked(announcementNum:number){
    //   switch(announcementNum){
    //     case 1:
    //       store.commit('lobby/setAnnouncement1Checked',!announcement1Checked.value)
    //       console.log('公告1確認',announcement1Checked.value)
    //       break
    //     case 2:
    //       store.commit('lobby/setAnnouncement2Checked',!announcement2Checked.value)
    //       console.log('公告2確認',announcement2Checked.value)
    //       break
    //     case 3:
    //       store.commit('lobby/setAnnouncement3Checked',!announcement3Checked.value)
    //       console.log('公告3確認',announcement3Checked.value)
    //       break
    //   }
    // }
    function setCurrentAnnouncement(num:number){
      currentAnnouncement.value = num 
    }
    function closeAnnouncement() {
      if (
        announcementData1.checked &&
        announcementData2.checked &&
        announcementData3.checked
      ) {
        store.commit("lobby/setShowannouncement", false);
      } else {
        alert("若要進行遊戲，請先勾選同意書");
      }
    }
    return {
      //data
      announcementData1,
      announcementData2,
      announcementData3,
      show,
      currentAnnouncement,
      //methods
      closeAnnouncement,
      setCurrentAnnouncement,
      // announcementChecked,
    };
  },
});
</script>
