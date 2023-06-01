<template>
  <AwIconToolbar :actions="actions" v-if="actions"></AwIconToolbar>
  <AwList :data="data"> </AwList>
  <AwView :view="view" v-if="view"></AwView>
</template>
<script setup lang="ts">
import { Action, DataType, Layout, View } from "../utils/types";
import AwList from "../components/AwList.vue";
import AwIconToolbar from "../components/AwIconToolbar.vue";
import AwView from "../components/AwView.vue";

const props = defineProps({
  data: {
    type: Object as () => DataType,
    required: true,
  },
  actions: {
    type: Array as () => Action[],
  },
  layouts: {
    type: Array as () => Layout[],
    required: true,
  },
});

const view: View = {
  layouts: props.layouts,
};
</script>
