import { computed } from "vue";
import { useRoute } from "vue-router";
import { sendTableJoinCall } from "../../socketApi";
export default function useGameSound(store: any) {
  const route = useRoute();
  const tableNum = computed(() => {
    return route.params.tableId;
  });
  const tables = computed(() => {
    //桌號uuid
    return store.state.lobby.LobbyInfo.tables;
  });
  function tableJoin() {
    //上桌請求
    tables.value.find((i: any) => {
      if (i.name == tableNum.value) {
        sendTableJoinCall({
          uuid: i.uuid,
        });
        // console.log('發送TableJoin',tableNum.value)
        // console.log(
        //   `請求${tableNum.value}桌`,
        //   "桌號:" + i.name,
        //   "uuid:" + i.uuid,
        //   "Loby資訊:",
        //   tables.value
        // );
      }
    });
  }
  function tableReload(){
    tables.value.find((i: any) => {
      if (i.name !== tableNum.value) {
        sendTableJoinCall({
          uuid: i.uuid,
        });
      }
    });
    tableJoin()
  }
  return {
    //data
    tableNum,tables,
    //methods
    tableJoin,tableReload,
  };
}
