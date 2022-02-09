export const state = {
    chatContentArr:[]
  };
  export const actions = {}
  
  export const mutations = {
    loadChatContentArr(state:any,payload:any){
        payload.forEach((i:any)=>{
            i.name = i.name.replace('桌','')
            state.chatContentArr.push({
                table:i.name,
                chatContent:[],
            })
        })
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