<template>
  <span>Credit Balance: </span>
  <span>{{ balance }}</span>
  <AwView :view="view"></AwView>
</template>

<script setup lang="ts">
import { QBtn } from "quasar";
import AwView from "../components/AwView.vue";
import { Action, View } from "../utils/types";
const view: View = {
  layouts: [
    {
      heading: "Payment Methods",
      type: "List",
      data: payments,
      size: 2
    },
    {
      type: "List",
      components: [QBtn],
      size: 2
    },
    {
      heading: "Your Projects",
      type: "List",
      data: projects,
      size: 2
    },
    {
      heading: "Billing Info",
      type: "List",
      data: billings,
      size: 2
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
