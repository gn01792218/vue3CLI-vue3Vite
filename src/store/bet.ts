export const state = {
  BetRecall:{
  },
};
export const actions = {}

export const mutations = {
  BetRecall(state:any, payload:any) { //接收wbSocket的訊息
    state.BetRecall=payload
    console.log("vuex-BetRecall資料更新",state.BetRecall)
  },
};
export const getters = {}

export default {
  state,
  actions,
  mutations,
  getters,
  namespaced: true,
};