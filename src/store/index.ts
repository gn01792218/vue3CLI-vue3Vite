import { createStore } from 'vuex'
import wsStore from './wsStore'
import tableInfo from './tableInfo'
import userInfo from './userInfo'
import auth from './auth'

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    wsStore,tableInfo,userInfo,auth
  }
})
