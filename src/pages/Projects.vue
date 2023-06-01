<template>
  <AwIconToolbar :actions="tools"></AwIconToolbar>
  <AwView :view="view"></AwView>
</template>

<script setup lang="ts">
import AwIconToolbar from "../components/AwIconToolbar.vue";
import AwView from "../components/AwView.vue";
import { Action, View } from "../utils/types";
const view: View = {
  layouts: [
    {
      type: "List",
      data: projects,
      size: 12
    },
  ],
};

const tools: Action[] = [
  {
    label: "New Project",
    event: "createProject",
  },
];
</script>
