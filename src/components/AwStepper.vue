<template>
  <div class="q-pa-md">
    <q-stepper v-model="step" ref="stepper" color="primary" animated>
      <q-step
        v-for="question in questions.content"
        :name="question.number"
        :title="question.title"
        :icon="question.icon"
        :caption="question.description"
        :done="step > question.number"
      >
        <div v-for="quest in question.content">
          <component
            :is="quest.component"
            v-if="quest.component"
            v-bind="$attrs"
            ref="quest.name"
          ></component>
          <q-item-label> {{ quest.question }} </q-item-label>
          <QSelect
            v-model="quest.answer"
            :options="quest.options"
            v-if="quest.options"
            ref="quest.name"
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
            :type="quest.inputType"
            v-model="quest.answer"
            outlined
            v-else-if="quest.inputType"
            ref="quest.name"
          ></QInput>
        </div>
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation>
          <q-btn
            @click="step === questions.content.length ? submit() : $refs.stepper.next()"
            color="primary"
            :label="step === questions.content.length ? 'Finish' : 'Continue'"
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
import { QuestionForm } from "../utils/types";
import { Repository } from "@edifiles/services";
const repository = new Repository();

export default {
  data() {
    return {
      step: 1,
      repository,
    };
  },
  props: {
    questions: {
      type: Object as () => QuestionForm,
      required: true,
    },
    dynamicComponent: {
      required: false,
      type: String,
    },
  },
  computed: {
    form() {
      let form = {};
      this.$refs.forEach((element) => {
        Object.assign(form, {
          [element]: element,
        });
      });
      return;
    },
  },
  methods: {
    submit() {
      this.repository.addItems(this.questions.name, this.questions.content);
    },
  },
};
</script>
