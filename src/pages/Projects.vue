<template>
  <AwIconToolbar :actions="tools"></AwIconToolbar>
  <AwView :view="view"></AwView>
</template>

<script setup lang="ts">
import AwIconToolbar from "../components/AwIconToolbar.vue";
import AwView from "../components/AwView.vue";
import { action, View } from "../utils/types";
const view: View = {
  layouts: [
    {
      type: "List",
      data: projects,
    },
  ],
};

const tools: action[] = [
  {
    label: "New Project",
    event: "createProject",
  },
];
</script>
