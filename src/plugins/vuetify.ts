import Vue from "vue";
import Vuetify from "vuetify/lib";
import zhHans from "vuetify/src/locale/zh-Hans";
import "@mdi/font/css/materialdesignicons.css";
import "roboto-fontface/css/roboto/roboto-fontface.css";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: "#32d4ff",
        secondary: "#424242",
        accent: "#82B1FF",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107"
      }
    }
  },
  icons: {
    iconfont: "mdiSvg"
  },
  lang: {
    locales: { zhHans },
    current: "zh-Hans"
  }
});
