export const state = {
  Table:{},
  TableJoinRecall:{},
  BetStatus:{},
};
export const actions = {};

export const mutations = {
  setTable(state:any, payload:any) { //接收wbSocket的訊息
    state.Table=payload;
    console.log("vuex-tableInfo資料更新",state.Table)
  },
  setTableJoinRecall(state:any, payload:any) { //接收wbSocket的訊息
    state.TableJoinRecall=payload;
    console.log("vuex-tableInfo資料更新",state.TableJoinRecall)
  },
  setBetStatus(state:any, payload:any) { //接收wbSocket的訊息
    state.BetStatus=payload;
    console.log("vuex-tableInfo資料更新",state.BetStatus)
  },
};
export const getters = {};

export default {
  state,
  actions,
  mutations,
  getters,
  namespaced: true,
};