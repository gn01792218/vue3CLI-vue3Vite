export const state = {
    BetRoundStart:{},  //回合開始，含uuid
    BetRoundCountdown:{}, //此回合還剩多少秒
    gameUuid:"",
    GameStatus:{},
    BetRoundEnd:{},
    gameEndUuid:"",
    numOfRound:'',
    numOfShoe:'',
  };
  export const actions = {}
  
  export const mutations = {
    BetRoundStart(state:any, payload:any) { //接收wbSocket的訊息
      state.BetRoundStart = payload
      state.gameUuid = payload.gameUuid
      state.numOfRound = payload.numOfRound
      state.numOfShoe = payload.numOfShoe
      // console.log("vuex-BetRoundStart資料更新",state.BetRoundStart)
    },
    BetRoundCountdown(state:any, payload:any){
      state.BetRoundCountdown = payload
      // console.log("vuex-BetRoundCountdown資料更新",state.BetRoundCountdown)
    },
    GameStatus(state:any, payload:any){
      state.GameStatus = payload
      state.gameUuid = payload.gameUuid
      state.numOfRound = payload.numOfRound
      state.numOfShoe = payload.numOfShoe
    },
    BetRoundEnd(state:any, payload:any){
      state.BetRoundEnd = payload
      state.gameEndUuid = payload.gameUuid
      // console.log("vuex-BetRoundCountdown資料更新",state.BetRoundCountdown)
    },
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