export const state = {
    map:{},
   
};
export const actions = {}
  
export const mutations = {
    map(state:any,payload:any){
        state.map= payload
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