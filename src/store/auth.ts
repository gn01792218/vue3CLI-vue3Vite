
export const state = {
  LoginRecall: {},
  Information:{}
};
export const actions = {};

export const mutations = {
  setLoginRecall(state:any, payload:any) { //接收wbSocket的訊息
    state.LoginRecall=payload;
    console.log("auth資料更新",state.LoginRecall)
  },
  setInformation(state:any, payload:any) { //接收wbSocket的訊息
    state.Information=payload;
    console.log("auth資料更新",state.Information)
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