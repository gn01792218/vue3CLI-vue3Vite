import { createStore } from 'vuex'
import wsStore from './wsStore'
import tableInfo from './tableInfo'
import userInfo from './userInfo'

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    wsStore,tableInfo,userInfo
  }
})
