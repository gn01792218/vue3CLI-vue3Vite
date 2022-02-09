import {chatContent} from '../types/global'
export const state = {
    chatContentArr:[] as chatContent[],
  };
  export const actions = {}
  
  export const mutations = {
    loadChatContentArr(state:any,payload:any){
        payload.forEach((i:any)=>{
            i.name = i.name.replace('桌','')
            state.chatContentArr.push({
                table:i.name,
                chatMsgArr:[],
                // rewardMsgArr:[],
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