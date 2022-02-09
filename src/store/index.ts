import { createStore } from "vuex";
import lobby from "./lobby";
import chat from "./chat";
import auth from "./auth";
import table from "./table";
import bet from "./bet";
import game from "./game";
import dealer from "./dealer";
import roadmap from "./roadmap";
import video from "./video";
import announcement from "./announcement";
import kick from "./kick";
export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    lobby,
    auth,
    table,
    bet,
    game,
    dealer,
    roadmap,
    video,
    announcement,
    kick,
    chat,
  },
});
