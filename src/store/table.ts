export const state = {
  TableJoinRecall:{
    table:{
      betStatus:{},
      streamingUrl:"",
    }
  },
  currentTable:"",
  tableInfoData:{  //給Home的桌牌使用
    A:{
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
    B:{
      tableNum:'B',
      onLine:true,
      img:require('../images/B桌.png'),
      playerMin:5000,
      playerMax:250000,
      bankerMin:5000,
      bankerMax:250000,
      tieMin:500,
      tieMax:31200,
      pairMin:500,
      pairMax:22700,
    },
    VIP:{
      tableNum:'VIP',
      onLine:true,
      img:require('../images/vip.png'),
      playerMin:20000,
      playerMax:800000,
      bankerMin:20000,
      bankerMax:800000,
      tieMin:1000,
      tieMax:100000,
      pairMin:1000,
      pairMax:72000,
    }
  },
  tableCoinData:{  //顯示的籌碼組合
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
        point:5000,
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
    VIP:[
      {
        point:1000,
        ammo:[], //子彈陣列
        num:1,
        },
        {
        point:5000,
        ammo:[], //子彈陣列
        num:2,
        },
        {
        point:10000,
        ammo:[], //子彈陣列
        num:3,
        },
        {
        point:20000,
        ammo:[], //子彈陣列
        num:4,
        },
        {
        point:100000,
        ammo:[], //子彈陣列
        num:5,
        },
        {
        point:200000,
        ammo:[],
        num:6,
        }
    ],
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
  },
  setTableInfoData(state:any,payload:any){

  },
  setTableCoinData(state:any,payload:any){
    state
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