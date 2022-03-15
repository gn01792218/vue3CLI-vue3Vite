export const state = {
  BetRecall:{},
  BetResetRecall:{},
  BetConfirmRecall:{},
  BroadcastBetstatus:{},
  totalBets:0,
  BetError:{},
  betstatus:{},
  isConfirmed:false, //下注按鈕是否有下注
  flyCard:false //是否要飛牌
};
export const actions = {}

export const mutations = {
  BetRecall(state:any, payload:any) { //接收wbSocket的訊息
    state.BetRecall = payload
    state.betstatus = payload.betStatus
    state.isConfirmed = payload.isConfirmed
    state.totalBets = payload.totalBets.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1,')
    // console.log("vuex-BetRecall資料更新",state.BetRecall)
  },
  BetResetRecall(state:any, payload:any){
    state.BetResetRecall=payload
    // console.log("vuex-BetResetRecall資料更新",state.BetResetRecall)
  },
  BetConfirmRecall(state:any,payload:any){
    state.BetConfirmRecall = payload
    // console.log("vuex-BetConfirmRecall",state.BetConfirmRecall)
  },
  BroadcastBetstatus(state:any,payload:any){
    state.BroadcastBetstatus = payload
    // console.log("vuex-BroadcastBetstatus",state.BroadcastBetstatus)
  },
  setBetResultRest(state:any){
    state.BetResetRecall.result = 0
  },
  BetError(state:any, payload:any){
    state.BetError=payload
    // console.log("vuex-BetError資料更新",state.BetError)
  },
  resetBetResult(state:any){
    state.BetRecall.result = 0
  },
  resetTotalBets(state:any){
    state.totalBets = 0
  },
  setIsConfirmed(state:any,usage:boolean){
    state.isConfirmed = usage
  },
  setFlyCard(state:any,flyCard:boolean){
    state.flyCard = flyCard
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