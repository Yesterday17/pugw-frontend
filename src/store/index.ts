import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      uuid: "",
      name: "未登录",
      icon: "",
    },
  },
  mutations: {},
  actions: {},
  modules: {},
});
