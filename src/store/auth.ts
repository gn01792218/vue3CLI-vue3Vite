
export const state = {
  LoginRecall: {},
  UserInfo:{},
};
export const actions = {};

export const mutations = {
  setLoginRecall(state:any, payload:any) { //接收wbSocket的訊息
    state.LoginRecall=payload;
    console.log("vuex-auth資料更新",state.LoginRecall)
  },
  setUserInfo(state:any, payload:any) { //接收wbSocket的訊息
    state.UserInfo=payload;
    console.log("vuex-auth資料更新",state.UserInfo)
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