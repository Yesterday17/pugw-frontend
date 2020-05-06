<template>
  <div class="text-center">
    <v-menu left offset-x :close-on-content-click="false" :nudge-width="200">
      <template v-slot:activator="{ on }" v-bind="user">
        <v-btn icon large v-on="on">
          <v-avatar size="32px" item>
            <v-img :src="user.icon || '/img/nologin.png'" alt="nologin" />
          </v-avatar>
        </v-btn>
      </template>
      <v-card>
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <v-img
                :src="this.user.icon || '/img/nologin.png'"
                alt="nologin"
              />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ this.user.name }}</v-list-item-title>
              <v-list-item-subtitle></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list v-if="form.loading" class="text-center with-padding">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular
        ></v-list>
        <v-list v-else-if="user.uuid === ''" dense>
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

            <v-btn text @click="auth(false)">注册</v-btn>
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
    user: {},
    form: {
      username: "",
      password: "",
      loading: false
    },
    key: {
      promise: {},
      key: ""
    }
  }),
  mounted() {
    this.user = this.$store.state.user; // They share the same object now
    this.fetchKey();
    this.updateUserInfo(false);
  },
  methods: {
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
      const result = encrypt.encrypt(this.form.password);
      if (!result) {
        this.$dialog.message.error("密码加密失败。", {
          position: "bottom-right",
          timeout: 3000
        });
        this.form.loading = false;
        return;
      }

      const form = new FormData();
      form.append("username", this.form.username);
      form.append("password", result);

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

      if (resp.status !== 200) {
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
