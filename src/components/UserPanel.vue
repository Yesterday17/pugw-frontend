<template>
  <div class="text-center">
    <v-menu left offset-x :close-on-content-click="false" :nudge-width="200">
      <template v-slot:activator="{ on }" v-bind="account">
        <v-btn icon large v-on="on">
          <v-avatar size="32px" item>
            <v-img :src="account.icon || '/img/nologin.png'" alt="nologin" />
          </v-avatar>
        </v-btn>
      </template>
      <v-card>
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <v-img
                :src="this.account.icon || '/img/nologin.png'"
                alt="nologin"
              />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ this.account.name }}</v-list-item-title>
              <v-list-item-subtitle></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list
          v-if="form.loading && !this.dialog"
          class="text-center with-padding"
        >
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular
        ></v-list>
        <v-list v-else-if="info.uuid === ''" dense>
          <v-list-item>
            <v-text-field label="用户名" v-model="form.username"></v-text-field>
          </v-list-item>
          <v-list-item>
            <v-text-field
              label="密码"
              v-model="form.password"
              type="password"
            ></v-text-field>
          </v-list-item>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-dialog v-model="dialog" persistent width="600px">
              <template v-slot:activator="{ on }">
                <v-btn text v-on="on">注册</v-btn>
              </template>
              <v-card v-if="form.loading">
                <v-card-title>
                  <span class="headline">注册中...</span>
                </v-card-title>
                <div class="text-center with-padding">
                  <v-progress-circular
                    indeterminate
                    color="primary"
                  ></v-progress-circular>
                </div>
              </v-card>
              <v-card v-else>
                <v-card-title>
                  <span class="headline">用户注册</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          label="用户名*"
                          required
                          v-model="form.register.username"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="密码*"
                          type="password"
                          required
                          v-model="form.register.password"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          label="昵称"
                          hint="日常显示的用户名称"
                          v-model="form.register.name"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          label="头像"
                          hint="头像链接"
                          v-model="form.register.icon"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="邮箱"
                          required
                          v-model="form.register.email"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                  <small>*代表必填项</small>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="
                      clear();
                      dialog = false;
                    "
                    >取消</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="auth(false)"
                    >注册</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-btn color="primary" text @click="auth(true)">登录</v-btn>
          </v-card-actions>
        </v-list>
        <v-list v-else>
          <v-list-item>
            <v-btn text @click="logout()">注销</v-btn>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { JSEncrypt } from "jsencrypt";

const encrypt = new JSEncrypt({});

export default Vue.extend({
  data: () => ({
    dialog: false,
    form: {
      username: "",
      password: "",
      register: {
        username: "",
        password: "",
        name: "",
        icon: "",
        email: ""
      },
      loading: false
    },
    key: {
      promise: {},
      key: ""
    }
  }),
  computed: {
    info() {
      return this.$store.state.user.info;
    },
    account() {
      return this.$store.state.user.account;
    }
  },
  mounted() {
    this.fetchKey();
    this.updateUserInfo(false);
  },
  methods: {
    clear() {
      this.form.username = "";
      this.form.password = "";
    },

    fetchKey() {
      // Fetch RSA Public Key
      this.key.promise = fetch(
        process.env.VUE_APP_BACKEND + process.env.VUE_APP_GET_PUBLIC_KEY
      )
        .then(resp => resp.text())
        .then(key => (this.key.key = key));
    },

    async keyExist(): Promise<boolean> {
      if (!(this.key.promise instanceof Promise)) return false;
      else {
        try {
          await this.key.promise;
          return true;
        } catch {
          return false;
        }
      }
    },

    async updateUserInfo(showError = true) {
      let info;
      try {
        info = await fetch(
          process.env.VUE_APP_BACKEND + process.env.VUE_APP_USER,
          {
            method: process.env.VUE_APP_USER_INFO_METHOD,
            credentials: "include"
          }
        ).then(r => r.json());
      } catch (e) {
        if (showError) {
          this.$dialog.message.error(e.message, {
            position: "bottom-right",
            timeout: 3000
          });
        }
        this.form.loading = false;
        return;
      }

      // Update user data
      this.$store.commit("updateUserInfo", info);
    },

    async auth(login: boolean) {
      // TODO: Replace this.$dialog with own components

      this.form.loading = true;
      const exist = await this.keyExist();
      if (!exist) {
        this.$dialog.message.error("公钥获取失败，请尝试刷新页面。", {
          position: "bottom-right",
          timeout: 3000
        });
        this.form.loading = false;
        return;
      }

      // Encrypt password
      encrypt.setPublicKey(this.key.key);
      const result = encrypt.encrypt(
        login ? this.form.password : this.form.register.password
      );
      if (!result) {
        this.$dialog.message.error("密码加密失败。", {
          position: "bottom-right",
          timeout: 3000
        });
        this.form.loading = false;
        return;
      }

      const form = new FormData();
      if (login) {
        form.append("username", this.form.username);
        form.append("password", result);
      } else {
        form.append("username", this.form.register.username);
        form.append("password", result);
        form.append("name", this.form.register.name);
        form.append("icon", this.form.register.icon);
        form.append("email", this.form.register.email);
      }

      let resp;
      try {
        resp = await fetch(
          process.env.VUE_APP_BACKEND + process.env.VUE_APP_SESSION,
          {
            credentials: "include",
            method: login
              ? process.env.VUE_APP_LOGIN_METHOD
              : process.env.VUE_APP_REGISTER_METHOD,
            body: form
          }
        );
      } catch (e) {
        this.$dialog.message.error(e.message, {
          position: "bottom-right",
          timeout: 3000
        });
        this.form.loading = false;
        return;
      }

      if (resp.status !== 201 - Number(login)) {
        const err = await resp.json();
        this.$dialog.message.error(err.message, {
          position: "bottom-right",
          timeout: 3000
        });
        this.form.loading = false;
        return;
      }

      this.form.password = ""; // not save password

      await this.updateUserInfo();
      this.form.loading = false;
    },

    async logout() {
      await fetch(process.env.VUE_APP_BACKEND + process.env.VUE_APP_SESSION, {
        method: process.env.VUE_APP_LOGOUT_METHOD,
        credentials: "include"
      });

      this.$store.commit("logoutUser");
    }
  }
});
</script>

<style lang="scss" scoped>
.with-padding {
  padding-top: 3em;
  padding-bottom: 3em;
}
</style>
