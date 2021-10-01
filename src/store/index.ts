import { createStore } from 'vuex'
import wsStore from './wsStore'
import table from './table'
import auth from './auth'

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    wsStore,table,auth
  }
})
