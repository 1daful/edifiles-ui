<template>
  <div v-if="data" class="q-ma-sm">
    <AwPanel :data="data" v-if="layout === 'Grid'"></AwPanel>
    <AwList :data="data" v-else></AwList>
  </div>
  <AwStepper :questions="questions" v-if="questions"> </AwStepper>
</template>

<script lang="ts" setup>
import { DataType, LayoutType, QuestionType } from "../utils/types";
import AwList from "./AwList.vue";
import AwPanel from "./AwPanel.vue";
import AwStepper from "./AwStepper.vue";
defineProps({
  data: {
    type: Object as () => DataType,
  },
  questions: {
    type: Array as () => QuestionType[],
  },
  layout: {
    type: String as () => LayoutType,
  },
});
</script>
