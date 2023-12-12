<template>
  <div class="q-pa-md">
    <q-stepper v-model="step" ref="stepper" color="primary" animated>
      <q-step
        v-for="section in form.content"
        :name="section.index"
        :title="section.title"
        :icon="section.icon"
        :caption="section.description"
        :done="step > section.index"
      >
        <div v-for="dialogue in section.content">
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
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation>
          <q-btn
            @click="step === form.content.length ? submit() : $refs.stepper.next()"
            color="primary"
            :label="step === form.content.length ? 'Finish' : 'Continue'"
          />
          <q-btn
            v-if="step > 1"
            flat
            color="primary"
            @click="$refs.stepper.previous()"
            label="Back"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </div>
</template>
<script lang="ts">
import { ref } from "vue";
import { Repository } from "@edifiles/services";
import { FormType } from "../utils/types";
import { config } from "../../public/config";

import { defineComponent } from "vue";
const repository = new Repository(config.api.Supabase);

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
      type: Object as () => FormType,
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
      const { data, error } = this.form.actions.submit.event(...this.form.actions.submit.args);
      if (data) {
        this.form.actions.submit.onResult.forEach(func => {
          func()
        });
      }
    }
  },
});
</script>
