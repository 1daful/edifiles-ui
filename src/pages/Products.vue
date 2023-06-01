<template>
  <AwView :view="view"></AwView>
</template>

<script setup lang="ts">
import AwView from "../components/AwView.vue";
import { Action, View } from "../utils/types";
const view: View = {
  layouts: [
    {
      type: "List",
      component: Overshop,
      size: 12
    },
  ],
};
</script>
