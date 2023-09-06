<template>
    <div class="q-pa-md">
      <div class="q-gutter-y-md column" style="max-width: 300px">
        <q-input :label="input.name" rounded filled v-model="input.answer" v-for="input in form.content">
          <template v-slot:prepend>
            <q-icon :name="input.icon" />
            <q-avatar>
              <img :src="input.image">
            </q-avatar>
          </template>
        </q-input>
  
        <q-input rounded outlined v-model="input.answer" v-for="input in form.content">
          <template v-slot:append>
            <q-icon :name="input.icon" />
            <q-avatar>
              <img :src="input.image">
            </q-avatar>
          </template>
        </q-input>
  
        <q-input rounded standout bottom-slots v-model="text" label="Label" counter>
          <template v-slot:prepend>
            <q-icon name="place" />
          </template>
          <template v-slot:append>
            <q-icon name="close" @click="text = ''" class="cursor-pointer" />
          </template>
  
          <template v-slot:hint>
            Field hint
          </template>
        </q-input>

        <div v-for="dialogue in form.content">
          <component
            :is="dialogue.component"
            v-if="dialogue.component"
            v-bind="$attrs"
            ref="dialogue.name"
          ></component>
          <q-item-label> {{ dialogue.question }} </q-item-label>
          <QSelect
            v-model="dialogue.answer"
            :options="dialogue.options"
            v-if="dialogue.options"
            ref="dialogue.name"
          >
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section avatar>
                  <q-icon :name="scope.opt.icon" />
                </q-item-section>
                <q-item-section>
                  <q-item-label> {{ scope.opt.label }} </q-item-label>
                  <q-item-label caption> {{ scope.opt.description }} </q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </QSelect>
          <QInput
            :type="dialogue.inputType"
            v-model="dialogue.answer"
            outlined
            v-else-if="dialogue.inputType"
            :ref="dialogue.name"
          ></QInput>
        </div>
      </div>
    </div>
  </template>

  <script lang="ts">
  import { ref } from "vue";
  import { QuestionType } from "../utils/types";
  import { Repository } from "@edifiles/services";
  import { defineComponent } from "vue";
  const repository = new Repository();
  
  export default defineComponent({
    data() {
      return {
        step: 1,
        repository,
      };
    },
    /*setup () {
      return {
        step: ref(1)
      }
    },*/
    props: {
      form: {
        type: Object as () => QuestionType,
        required: true,
      },
      dynamicComponent: {
        required: false,
        type: String,
      },
    },
    computed: {
      filledForm() {
        let form = {};
        this.$refs.forEach((element: any) => {
          Object.assign(form, {
            [element]: element,
          });
        });
        return;
      },
    },
    methods: {
      submit() {
        this.form.submit.event(...this.form.submit.args);
        
      }
    },
  });
  </script>
  