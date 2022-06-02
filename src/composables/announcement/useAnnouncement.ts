import { computed } from "vue";
import { Store } from "vuex";
export default function useAnnouncement(store:any) {
  const announcement1Checked = computed(() => {
    return store.state.announcement.announcement.announcement1.checked;
  });
  const announcement2Checked = computed(() => {
    return store.state.announcement.announcement.announcement2.checked;
  });
  const announcement3Checked = computed(() => {
    return store.state.announcement.announcement.announcement3.checked;
  });
  function isAnnouncementChecked():boolean {
    //判斷是否通過全部的公告
    return announcement1Checked.value && announcement2Checked.value && announcement3Checked.value
  }
  return {
    isAnnouncementChecked,
  };
}
