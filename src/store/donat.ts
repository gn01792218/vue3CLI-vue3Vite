
export const state = {
    DonateRecall:{}
  };
  export const actions = {}
  
  export const mutations = {
    DonateRecall(state:any,payload:any){
      state.DonateRecall = payload
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