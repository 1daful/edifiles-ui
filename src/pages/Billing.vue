<template>
  <span>Credit Balance: </span>
  <span>{{ balance }}</span>
  <AwView :view="view"></AwView>
</template>

<script setup lang="ts">
import { QBtn } from "quasar";
import AwView from "../components/AwView.vue";
import { action, View } from "../utils/types";
const view: View = {
  layouts: [
    {
      heading: "Payment Methods",
      type: "List",
      data: payments,
    },
    {
      type: "List",
      component: QBtn,
    },
    {
      heading: "Your Projects",
      type: "List",
      data: projects,
    },
    {
      heading: "Billing Info",
      type: "List",
      data: billings,
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
