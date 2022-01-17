export const state = {
  TableJoinRecall:{
    table:{
      betStatus:{},
      streamingUrl:"",
    }
  },
  currentTable:"",
  tableInfoData:[
    {
      tableNum:'A',
      onLine:true,
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
    {
      tableNum:'B',
      onLine:true,
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
    {
      tableNum:'vip',
      onLine:false,
      img:require('../images/vip.png'),
      playerMin:0,
      playerMax:0,
      bankerMin:0,
      bankerMax:0,
      tieMin:0,
      tieMax:0,
      pairMin:0,
      pairMax:0,
    }

  ],
  tableCoinData:{
    A:[
      {
        point:100,
        ammo:[], //子彈陣列
        num:1,
        },
        {
        point:500,
        ammo:[], //子彈陣列
        num:2,
        },
        {
        point:1000,
        ammo:[], //子彈陣列
        num:3,
        },
        {
        point:2000,
        ammo:[], //子彈陣列
        num:4,
        },
        {
        point:10000,
        ammo:[], //子彈陣列
        num:5,
        },
        {
        point:100000,
        ammo:[],
        num:6,
        }
    ],
    B:[
      {
        point:100,
        ammo:[], //子彈陣列
        num:1,
        },
        {
        point:500,
        ammo:[], //子彈陣列
        num:2,
        },
        {
        point:1000,
        ammo:[], //子彈陣列
        num:3,
        },
        {
        point:2000,
        ammo:[], //子彈陣列
        num:4,
        },
        {
        point:10000,
        ammo:[], //子彈陣列
        num:5,
        },
        {
        point:100000,
        ammo:[],
        num:6,
        }
    ],
  }
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