import { createStore } from 'vuex'

export default createStore({
  state: {
    LoginRecall:{

    },
    Information:{

    },
  },
  mutations: {
    setLoginRecall(state:any, payload:any) { //接收wbSocket的訊息
        state.LoginRecall=payload;
        console.log("auth資料更新",state.LoginRecall)
      },
    setInformation(state:any, payload:any) { //接收wbSocket的訊息
        state.Information=payload;
        console.log("auth資料更新",state.Information)
      },
  },
  actions: {
  },
})