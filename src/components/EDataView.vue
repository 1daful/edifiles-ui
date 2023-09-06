<template>
  <div v-if="data" class="q-ma-sm">
    <AwPanel :data="data" v-if="!data.noCard"></AwPanel>
    <AwList :data="data" v-else></AwList>
  </div>
  <EStepper :form="form" v-if="form"> </EStepper>
</template>

<script lang="ts" setup>
import { DataType, LayoutType, FormType } from "../utils/types";
import AwList from "./EList.vue";
import AwPanel from "./EPanel.vue";
import EStepper from "./EStepper.vue";
defineProps({
  data: {
    type: Object as () => DataType,
  },
  form: {
    type: Object as () => FormType,
  }
});
</script>
