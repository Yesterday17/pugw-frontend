import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

interface UserInfo {
  uuid: string;
  name: string;
  icon: string;
}

export default new Vuex.Store({
  state: {
    user: {
      uuid: "",
      name: "未登录",
      icon: "",
    },
  },
  mutations: {
    updateUserInfo(state, info: UserInfo) {
      state.user.uuid = info.uuid;
      state.user.name = info.name;
      state.user.icon = info.icon;
    },
    logoutUser(state) {
      state.user.uuid = "";
      state.user.name = "未登录";
      state.user.icon = "";
    },
  },
  actions: {},
  modules: {},
});
