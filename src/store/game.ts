export const state = {
    BetRoundStart:{},  //回合開始，含uuid
    BetRoundCountdown:{}, //此回合還剩多少秒
    gameUuid:"",
    GameStatus:{},
    BetRoundEnd:{},
    gameEndUuid:"",
    numOfRound:'',
    numOfShoe:'',
    gameResultCount:{},// 統計資訊
    askBankByRoundStart:{}, //回合自動問路莊家
    askPlayerByRoundStart:{}, //回合自動問路閒家
    serverDisConnect:false,
  };
  export const actions = {}
  
  export const mutations = {
    BetRoundStart(state:any, payload:any) { //接收wbSocket的訊息
      state.BetRoundStart = payload
      state.gameUuid = payload.gameUuid
      state.numOfRound = payload.numOfRound
      state.numOfShoe = payload.numOfShoe
      state.gameResultCount = payload.gameResultCounter
      state.defaultCount = payload.timeRemain
      payload.askRoadRecalls.forEach((i:any)=>{
        switch(i.askRoadCall.block.symbol){
          case 1:
            state.askBankByRoundStart = i
            // console.log('回合問路,莊問:',state.askBankByRoundStart)
            break
          case 2:
            state.askPlayerByRoundStart = i
            // console.log('閒問',state.askPlayerByRoundStart)
            break
        }
      })
      // console.log("vuex-BetRoundStart資料更新",state.BetRoundStart)
    },
    BetRoundCountdown(state:any, payload:any){
      state.BetRoundCountdown = payload
      // console.log("vuex-BetRoundCountdown資料更新",state.BetRoundCountdown)
    },
    GameStatus(state:any, payload:any){
      state.gameUuid = payload.gameUuid
      state.GameStatus = payload
      state.numOfRound = payload.numOfRound
      state.numOfShoe = payload.numOfShoe
      state.gameResultCount = payload.gameResultCounter
      state.gameStatus = payload.status
      // state.bet.betstatus = payload.betstatus
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