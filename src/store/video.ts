export const state = {
    video:"",
    watchCardVideo:"",
  };
  export const actions = {}
  
  export const mutations = {
    setVideo(state:any,videoInstance:any){
      state.video = videoInstance
    },
    setWatchCardVideo(state:any,watchCardVideo:any){
      state.watchCardVideo = watchCardVideo
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