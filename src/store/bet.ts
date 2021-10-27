export const state = {
  BetRecall:{},
  BetResetRecall:{},
  totalBets:0,
};
export const actions = {}

export const mutations = {
  BetRecall(state:any, payload:any) { //接收wbSocket的訊息
    state.BetRecall = payload
    state.totalBets = payload.totalBets
    console.log("vuex-BetRecall資料更新",state.BetRecall)
  },
  BetResetRecall(state:any, payload:any){
    state.BetResetRecall=payload
    console.log("vuex-BetResetRecall資料更新",state.BetResetRecall)
  }
};
export const getters = {
  
}

export default {
  state,
  actions,
  mutations,
  getters,
  namespaced: true,
};