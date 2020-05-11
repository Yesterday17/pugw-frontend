import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

interface UserInfo {
  uuid: string;
  username: string;
  level: number;

  setting: {
    account: {
      name: string;
      email: string;
      icon: string;
    };
  };
}

export default new Vuex.Store({
  state: {
    user: {
      info: {
        uuid: "",
        username: "未登录",
        level: 0,
      },
      account: {},
    },
    pipelines: [] as Array<any>,
  },
  mutations: {
    updateUserInfo(state, info: UserInfo) {
      state.user.info = info;
      state.user.account = info.setting.account;
    },
    logoutUser(state) {
      state.user.info = {
        uuid: "",
        username: "未登录",
        level: 0,
      };
    },
    updatePipeline(state, ppl: Array<any>) {
      state.pipelines.forEach(() => state.pipelines.pop());
      state.pipelines.push(...ppl);
    },
  },
  actions: {},
  modules: {},
});
