// const modulesFiles = require.context('./modules',true,/\.js$/)
// const modules = modulesFiles.keys().reduce((modules:any,modulePath:any)=>{
//   const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/,'$1')
//   const value = modulesFiles(modulePath)
//   modulePath[moduleName] = value.default
//   return modules
// },{})
export const state = {
  TableJoinRecall:{
    table:{
      betStatus:{},
      streamingUrl:"",
    }
  },
  currentTable:"",
  tableLDataist:[
    {
      tableName:'C',
      onLine:false,
      img:"",
      playerMin:0,
      playerMax:0,
      bankerMin:0,
      bankerMax:0,
      tieMin:0,
      tieMax:0,
      pairMin:0,
      pairMax:0,
    },
    {
      tableName:'D',
      onLine:false,
      img:"",
      playerMin:0,
      playerMax:0,
      bankerMin:0,
      bankerMax:0,
      tieMin:0,
      tieMax:0,
      pairMin:0,
      pairMax:0,
    },
    {
      tableName:'VIP2',
      onLine:false,
      img:"",
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
  tableInfoData:{  //給Home的桌牌使用
    C:{
      tableName:'C',
      onLine:false,
      img:"",
      playerMin:0,
      playerMax:0,
      bankerMin:0,
      bankerMax:0,
      tieMin:0,
      tieMax:0,
      pairMin:0,
      pairMax:0,
    },
    D:{
      tableName:'D',
      onLine:false,
      img:"",
      playerMin:0,
      playerMax:0,
      bankerMin:0,
      bankerMax:0,
      tieMin:0,
      tieMax:0,
      pairMin:0,
      pairMax:0,
    },
    VIP2:{
      tableName:'VIP2',
      onLine:false,
      img:"",
      playerMin:0,
      playerMax:0,
      bankerMin:0,
      bankerMax:0,
      tieMin:0,
      tieMax:0,
      pairMin:0,
      pairMax:0,
    },
    // A:{
    //   // tableName:'A',
    //   // onLine:true,
    //   // img:require('../images/A.png'),
    //   // playerMin:2000,
    //   // playerMax:100000,
    //   // bankerMin:2000,
    //   // bankerMax:100000,
    //   // tieMin:0,
    //   // tieMax:12500,
    //   // pairMin:0,
    //   // pairMax:9000,
    // },
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
  setTable(state:any,payload:any){
    payload.forEach((i:any)=>{
      let table = i.name.replace("桌",'')
      state.tableLDataist.push({
          tableName:table,
          onLine:true,
          img:require(`../images/${table}.png`),
          playerMin:i.betRule.player.min,
          playerMax:i.betRule.player.max,
          bankerMin:i.betRule.banker.min,
          bankerMax:i.betRule.banker.max,
          tieMin:i.betRule.tie.min,
          tieMax:i.betRule.tie.max,
          pairMin:i.betRule.bankerPair.min,
          pairMax:i.betRule.bankerPair.max,
        })
        state.tableInfoData[table] = {
          tableName:table,
          onLine:true,
          img:require(`../images/${table}.png`),
          playerMin:i.betRule.player.min,
          playerMax:i.betRule.player.max,
          bankerMin:i.betRule.banker.min,
          bankerMax:i.betRule.banker.max,
          tieMin:i.betRule.tie.min,
          tieMax:i.betRule.tie.max,
          pairMin:i.betRule.bankerPair.min,
          pairMax:i.betRule.bankerPair.max,
        }
    })
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