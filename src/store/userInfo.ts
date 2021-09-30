import { createStore } from 'vuex'

export default createStore({
  state: {
    userInfo:{
      
    }
  },
  mutations: {
    setUserInfo(state:any, payload:any) { //接收wbSocket的訊息
        state.userInfo=payload;
        console.log("tableInfo資料更新",state.userInfo)
      },
  },
  actions: {
  },
})