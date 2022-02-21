export const state = {
  TableJoinRecall:{
    table:{
      betStatus:{},
      streamingUrl:"",
    }
  },
  currentTable:"",
  tableLDataist:[],
  tableInfoData:{  //給Home的桌牌使用
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