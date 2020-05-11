<template>
  <v-tabs v-model="tab">
    <v-tabs-slider></v-tabs-slider>

    <v-tab v-for="tab in tabs" :key="tab.category" :href="'#' + tab.category">
      {{ tab.name }}
    </v-tab>

    <v-tab-item v-for="tab in tabs" :key="tab.category" :value="tab.category">
      <v-card flat tile>
        <v-card-text>{{ tab.desc }}</v-card-text>
        <v-card-actions v-for="item in tab.items" :key="item.key">
          <!-- <v-col cols="12" sm="6" md="3"> -->
          <v-text-field
            :label="item.name"
            :placeholder="item.placeholder"
            v-model="settings[tab.category][item.key]"
          ></v-text-field>
          <!-- </v-col> -->
        </v-card-actions>
        <v-card-actions>
          <v-btn small depressed color="primary" @click="submit(tab.category)"
            >保存设置</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-tab-item>
  </v-tabs>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  computed: {
    settings() {
      return this.$store.state.user;
    }
  },
  data: () => {
    return {
      tab: null,
      tabs: [
        {
          category: "account",
          name: "用户设置",
          desc: "你可以配置你的用户信息。",
          items: [
            {
              key: "name",
              type: "text",
              name: "昵称",
              placeholder: "在这里填写昵称。"
            },
            {
              key: "email",
              type: "text",
              name: "邮箱",
              placeholder: "在这里填写邮箱信息。"
            },
            {
              key: "icon",
              type: "text",
              name: "头像",
              placeholder: "在这里填写头像链接。"
            }
          ]
        },
        {
          category: "system",
          name: "系统设置",
          desc: "你可以配置系统设置。"
        },
        {
          category: "others",
          name: "其他设置",
          desc: "你可以配置其他设置。"
        }
      ]
    };
  },
  methods: {
    async submit(category: string) {
      const toSubmit = this.settings[category];

      const form = new FormData();
      form.append("category", category);
      form.append("data", JSON.stringify(toSubmit));

      const resp = await fetch(
        process.env.VUE_APP_BACKEND + process.env.VUE_APP_USER_SETTING,
        {
          method: process.env.VUE_APP_USER_SETTING_EDIT_METHOD,
          credentials: "include",
          body: form
        }
      );

      if (resp.status !== 200) {
        const data = await resp.json();
        this.$dialog.message.error(data.message, {
          position: "bottom-right",
          timeout: 3000
        });
        return;
      }

      this.$dialog.message.info("修改成功", {
        position: "bottom-right",
        timeout: 3000
      });
    }
  }
});
</script>

<style lang="scss">
.v-text-field__details {
  display: none;
}
</style>
