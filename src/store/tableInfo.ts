import { createStore } from 'vuex'

export default createStore({
  state: {
    tableInfo:{}
  },
  mutations: {
    setTableInfo(state:any, payload:any) { //接收wbSocket的訊息
        state.tableInfo=payload;
        console.log("tableInfo資料更新",state.tableInfo)
      },
  },
  actions: {
  },
})