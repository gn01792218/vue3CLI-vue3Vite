import { createStore } from 'vuex'
import lobby from './lobby'
import auth from './auth'
import table from './table'
import bet from './bet'
import game from './game'
import dealer from './dealer'
import roadmap from './roadmap'

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    lobby,auth,table,bet,game,dealer,roadmap,
  }
})
