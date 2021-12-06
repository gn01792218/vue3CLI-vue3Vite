export const state = {
    video:"",
  };
  export const actions = {}
  
  export const mutations = {
    setVideo(state:any,videoInstance:any){
      state.video = videoInstance
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