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
      img:require(`../images/C.png`),
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
      img:require(`../images/D.png`),
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
      img:require(`../images/VIP2.png`),
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
      img:require(`../images/C.png`),
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
      img:require(`../images/D.png`),
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
      img:require(`../images/VIP2.png`),
      playerMin:0,
      playerMax:0,
      bankerMin:0,
      bankerMax:0,
      tieMin:0,
      tieMax:0,
      pairMin:0,
      pairMax:0,
    },
  },
  tableCoinData:{  //顯示的籌碼組合
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
          bankerPairMin:i.betRule.bankerPair.min,
          bankerPairMax:i.betRule.bankerPair.max,
          playerPairMin:i.betRule.playerPair.min,
          playerPairMax:i.betRule.playerPair.max,
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
          bankerPairMin:i.betRule.bankerPair.min,
          bankerPairMax:i.betRule.bankerPair.max,
          playerPairMin:i.betRule.playerPair.min,
          playerPairMax:i.betRule.playerPair.max,
        }
      state.tableCoinData[table] =[
        {
          point:i.betList[0],
          ammo:[], //子彈陣列
          num:1,
          },
          {
          point:i.betList[1],
          ammo:[], //子彈陣列
          num:2,
          },
          {
          point:i.betList[2],
          ammo:[], //子彈陣列
          num:3,
          },
          {
          point:i.betList[3],
          ammo:[], //子彈陣列
          num:4,
          },
          {
          point:i.betList[4],
          ammo:[], //子彈陣列
          num:5,
          },
          {
          point:i.betList[5],
          ammo:[],
          num:6,
          }
      ]
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