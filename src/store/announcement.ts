export const state = {
    BroadcastAnnouncement:{},
  };
  export const actions = {}
  
  export const mutations = {
    BroadcastAnnouncement(state:any, payload:any) { //接收wbSocket的訊息
      state.BroadcastAnnouncement = payload
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