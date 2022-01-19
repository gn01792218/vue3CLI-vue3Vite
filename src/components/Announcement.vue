<template>
  <div class="announcement w-100 h-100 position-absolute" v-if="show">
    <div class="announcement-bg w-100 h-100 position-absolute"></div>
    <div class="announcement-container position-absolute p-4">
      <header class="announcement-header text-center mb-4">
        <h1>遊戲公告同意書</h1>
      </header>
      <section class="announcement-body mb-4" v-if="currentAnnouncement==0">
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
            <input type="checkbox" class="mr-2" v-model="announcementData1.checked"/>
            <p class="form-check-label" for="exampleCheck1">
              我同意遊戲公告1之條文內容
            </p>
          </div>
          <i class="bi bi-arrow-right-square" @click="setCurrentAnnouncement(1)"></i>
        </div>
      </section>
      <section class="announcement-body mb-4" v-if="currentAnnouncement==1">
        <h3 class="text-center">遊戲公告2</h3>
        <div
            class="text-left"
            v-for="(i, index) in announcementData2.content"
            :key="index"
          >
            <p class="announcementTitle">{{ i.title }}</p>
            <div :id="`announcementContent2-${index}`" class="announcementContent">{{ i.content}}</div>
        </div>
        <div class="d-flex align-items-center flex-column">
          <div class="form-group form-check d-flex align-items-center">
            <input type="checkbox" class="mr-2" v-model="announcementData2.checked"/>
            <p class="form-check-label" for="exampleCheck1">
              我同意遊戲公告2之條文內容
            </p>
          </div>
          <i class="bi bi-arrow-left-square" @click="setCurrentAnnouncement(0)"></i>
          <i class="bi bi-arrow-right-square" @click="setCurrentAnnouncement(2)"></i>
        </div>
      </section>
      <section class="announcement-body mb-4" v-if="currentAnnouncement==2">
        <h3 class="text-center">{{announcementData3.content[0].title}}</h3>
        <div
            class="text-left"
            v-for="(i, index) in announcementData3.content"
            :key="index"
          >
            <p class="announcementContent">{{ i.content }}</p>
            <div>
              <img :src="i.img" alt="">
            </div>
        </div>
        <div class="d-flex align-items-center flex-column">
          <div class="form-group form-check d-flex align-items-center">
            <input type="checkbox" class="mr-2" v-model="announcementData3.checked"/>
            <p class="form-check-label" for="exampleCheck1">
              我同意百家樂遊戲牌例之條文內容
            </p>
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
      // let t = document.querySelector('.announcement') as HTMLElement
      // console.log(t)
      // appentContent(announcementData2.content,2)
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
    const currentAnnouncement = ref(0)
    const show = computed(() => {
      return store.state.lobby.showannouncement;
    });
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
    function appentContent(contentData:any,announcementNum:number){
      console.log(contentData)
      contentData.forEach((i:any,index:any)=>{
        switch(announcementNum){
        case 1:
          let contentElement1 = document.getElementById(`announcementContent1-${index}`) as HTMLElement
          contentElement1.innerHTML = i.content
          break
        case 2:
          let contentElement2 = document.querySelector(`#announcementContent2-${index}`) as HTMLElement
          console.log(contentElement2,`announcementContent2-${index}`)
          contentElement2.innerHTML = i.content
          break
        }
      })
      
    }
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
    };
  },
});
</script>
