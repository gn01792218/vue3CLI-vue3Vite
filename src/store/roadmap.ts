export const state = {
    BeadPlate:{},
   
};
export const actions = {}
  
export const mutations = {
    BeadPlate(state:any,payload:any){
        state.BeadPlate = payload
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