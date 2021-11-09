export const state = {
  Draw:{},  //要再改成卡牌的
  BroadcastGameResult:{},
};
export const actions = {}

export const mutations = {
  Draw(state:any, payload:any) { //接收wbSocket的訊息
    state.Draw = payload
    // console.log("vuex-Draw資料更新",state.Draw)
  },
  BroadcastGameResult(state:any, payload:any){
    state.BroadcastGameResult = payload
    console.log("vuex-BroadcastGameResult資料更新",state.BroadcastGameResult)
  },
  resetGameResults(state:any){
    if(state.BroadcastGameResult.results){
      state.BroadcastGameResult.results = []
    }
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