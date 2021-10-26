export const state = {
  Draw:{},  //要再改成卡牌的
  GameResult:{},
};
export const actions = {}

export const mutations = {
  Draw(state:any, payload:any) { //接收wbSocket的訊息
    state.Draw = payload
    // console.log("vuex-Draw資料更新",state.Draw)
  },
  GameResult(state:any, payload:any){
    state.GameResult = payload
    console.log("vuex-GameResult資料更新",state.GameResult)
  },
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