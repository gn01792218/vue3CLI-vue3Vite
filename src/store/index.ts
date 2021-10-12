import { createStore } from 'vuex'
import lobby from './lobby'
import auth from './auth'
import table from './table'
import bet from './bet'


export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    lobby,auth,table,bet,
  }
})
