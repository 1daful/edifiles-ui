<template>
  <span>Credit Balance: </span>
  <span>{{ balance }}</span>
  <EView :view="view"></EView>
</template>

<script setup lang="ts">
import { QBtn } from "quasar";
import EView from "../components/EView.vue";
import { Action, View } from "../utils/types";
const view: View = new View({
  id: 'billing',
  layout: 'Grid',
  sections: [],
  navType: 'center',
  size: 6
});

const balance = 15
const tools: Action[] = [
  {
    label: "New Project",
    event: "createProject",
  },
];
</script>
