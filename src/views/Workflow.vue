<template>
  <v-container fill-height>
    <v-row justify="center" align="center">
      <v-col>
        <v-stepper v-model="nowStep" vertical>
          <template>
            <template>
              <v-stepper-step
                key="step-1"
                :complete="nowStep > 1"
                step="1"
                editable
              >
                基本信息
              </v-stepper-step>

              <v-stepper-content key="content-1" step="1">
                <v-card flat class="pa-2">
                  <v-text-field
                    label="名称"
                    placeholder="请给 Workflow 命名。"
                  ></v-text-field>

                  <v-text-field
                    label="简介"
                    placeholder="请描述该 Workflow。"
                  ></v-text-field>

                  <v-switch label="公开"></v-switch>
                </v-card>

                <v-btn class="ma-2 mt-0" color="primary" @click="nextStep(1)">
                  下一步
                </v-btn>
              </v-stepper-content>
            </template>
            <template>
              <v-stepper-step
                key="step-2"
                :complete="nowStep > 2"
                step="2"
                editable
              >
                选择 Pipe(line)
              </v-stepper-step>

              <v-stepper-content key="content-2" step="2">
                <v-card class="pa-2" flat>
                  <Promised :promise="userPromise">
                    <template v-slot:pending>
                      <p>加载中……</p>
                    </template>
                    <template v-slot="pipelines">
                      <v-container>
                        <v-col>
                          <v-list dense>
                            <v-list-item-group
                              v-model="model"
                              mandatory
                              color="indigo"
                            >
                              <v-list-item
                                v-for="(item, i) in pipelines"
                                :key="i"
                              >
                                <v-list-item-icon>
                                  <v-icon>mdi-module</v-icon>
                                </v-list-item-icon>

                                <v-list-item-content>
                                  <v-list-item-title
                                    v-text="item.name"
                                  ></v-list-item-title>
                                </v-list-item-content>
                              </v-list-item>
                            </v-list-item-group>
                          </v-list>
                        </v-col>
                      </v-container>
                    </template>

                    <template v-slot:rejected="error">
                      <p>Error {{ error }}</p>
                    </template>
                  </Promised>
                </v-card>

                <v-btn color="primary" @click="nextStep(2)">
                  下一步
                </v-btn>
              </v-stepper-content>
            </template>
            <template>
              <v-stepper-step
                key="step-3"
                :complete="nowStep > 3"
                step="3"
                editable
              >
                确认
              </v-stepper-step>

              <v-stepper-content key="content-3" step="3">
                <v-card
                  class="mb-12"
                  color="grey lighten-2"
                  height="200px"
                ></v-card>

                <v-btn color="primary" @click="nextStep(3)">
                  提交
                </v-btn>
              </v-stepper-content>
            </template>
            <!-- <template v-for="n in steps">
              <v-stepper-step
                :key="`${n}-step`"
                :complete="nowStep > n"
                :step="n"
                :editable="editable"
              >
                Step {{ n }}
              </v-stepper-step>

              <v-stepper-content :key="`${n}-content`" :step="n">
                <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

                <v-btn color="primary" @click="nextStep(n)">
                  下一步
                </v-btn>
              </v-stepper-content>
            </template> -->
          </template>
        </v-stepper>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  watch: {
    steps(val) {
      if (this.nowStep > val) {
        this.nowStep = val;
      }
    }
  },
  computed: {
    pipelines() {
      return this.$store.state.pipelines;
    }
  },
  data() {
    return new (class {
      model = "";
      nowStep = 1;
      steps = 4;
      editable = true;
      userPromise: Promise<{}> | undefined = undefined;
    })();
  },
  methods: {
    nextStep(n: number) {
      if (n === this.steps) {
        this.nowStep = 1;
      } else {
        this.nowStep = n + 1;
      }
    },
    async updatePipelines() {
      const resp = await fetch(
        process.env.VUE_APP_BACKEND + process.env.VUE_APP_USER_PIPELINE,
        {
          method: process.env.VUE_APP_USER_PIPELINE_GET_METHOD,
          credentials: "include"
        }
      );
      const data = await resp.json();

      if (resp.status !== 200) {
        throw data.message;
      }

      this.$store.commit("updatePipeline", data);
      return this.pipelines;
    }
  },
  created() {
    this.userPromise = this.updatePipelines();
  }
});
</script>
