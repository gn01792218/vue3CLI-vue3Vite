export const state = {
    wsRes: {},
  };
  export const actions = {};
  
  export const mutations = {
    setWsRes(state:any, payload:any) { //接收wbSocket的訊息
      state.wsRes=payload;
      console.log("wsStore資料更新",state.wsRes)
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