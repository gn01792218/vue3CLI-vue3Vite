import { createStore } from 'vuex'

export default createStore({
  state: {
    Table:{},
    TableJoinRecall:{},
    BetStatus:{},
  },
  mutations: {
    setTable(state:any, payload:any) { //接收wbSocket的訊息
        state.Table=payload;
        console.log("tableInfo資料更新",state.Table)
      },
    setTableJoinRecall(state:any, payload:any) { //接收wbSocket的訊息
      state.TableJoinRecall=payload;
      console.log("tableInfo資料更新",state.TableJoinRecall)
    },
    setBetStatus(state:any, payload:any) { //接收wbSocket的訊息
      state.BetStatus=payload;
      console.log("tableInfo資料更新",state.BetStatus)
    },
  },
  actions: {
  },
})