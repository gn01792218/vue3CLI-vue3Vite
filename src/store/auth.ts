
export const state = {
  LoginRecall: {},
  UserInfo:{},
};
export const actions = {}

export const mutations = {
  LoginRecall(state:any, payload:any) { //接收wbSocket的訊息
    state.LoginRecall=payload
    console.log("vuex-auth資料更新",state.LoginRecall)
  },
  UserInfo(state:any, payload:any) { //接收wbSocket的訊息
    state.UserInfo=payload
    console.log("vuex-auth資料更新",state.UserInfo)
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