export const state = {
  TableJoinRecall:{
    table:{
      betStatus:{},
      streamingUrl:"",
    }
  },
  currentTable:"",
  tableInfoData:{
    'A':{
      img:require('../images/A桌.png'),
      playerMin:2000,
      playerMax:100000,
      bankerMin:2000,
      bankerMax:100000,
      tieMin:0,
      tieMax:12500,
      pairMin:0,
      pairMax:9000,
    },
    'B':{
      img:require('../images/B桌.png'),
      playerMin:5000,
      playerMax:300000,
      bankerMin:5000,
      bankerMax:300000,
      tieMin:500,
      tieMax:37500,
      pairMin:500,
      pairMax:27000,
    },
    'vip':{
      img:require('../images/vip.png'),
      playerMin:5000,
      playerMax:300000,
      bankerMin:5000,
      bankerMax:300000,
      tieMin:500,
      tieMax:37500,
      pairMin:500,
      pairMax:27000,
    }

  },
};
export const actions = {}

export const mutations = {
  TableJoinRecall(state:any, payload:any) { //接收wbSocket的訊息
    state.TableJoinRecall=payload
    // console.log("vuex-tableInfo資料更新",state.TableJoinRecall)
  },
  setCurrentTable(state:any,tableNum:string){
    state.currentTable = tableNum
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