<template>
  <div class="q-gutter-md">
    <AwIconToolbar :actions="data.actions"></AwIconToolbar>
    <AwIconToolbar :actions="actions"></AwIconToolbar>
    <AwPanel :data="projects"></AwPanel>
    <AwIconToolbar :actions="create"></AwIconToolbar>
    <h4>Reports</h4>
    <AwList :data="reports"></AwList>

    <h4>Products</h4>
    <AwList :data="products"></AwList>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import AwIconToolbar from "../components/AwIconToolbar.vue";
import AwList from "../components/AwList.vue";
import AwPanel from "../components/AwPanel.vue";

import { DataType } from "../utils/types";
let data: DataType = {
  icon: "schedule",
  meta: {
    title: "The Black Skirt",
    description: "This is about man's fallacy and illusion that leads to infactuation.",
    created: "27-03-34",
    author: "Wonders Ayanfe",
  },
  actions: [
    {
      name: "Create",
      type: "Create",
      label: "Create",
      icon: "whatshot",
      event: "",
    },
    {
      name: "Read",
      type: "Create",
      label: "Create",
      icon: "bluetooth",
      event: "",
    },
  ],
  setHeader: true,
};

export default defineComponent({
  name: "Home",
  data() {
    return {
      data,
      actions: [
        {
          name: "addProject",
          type: "Create",
          label: "Add Project",
          icon: "add",
          event: "addProject",
        },
        {
          name: "upgradePlan",
          type: "Create",
          label: "Upgrade Your Plan",
          icon: "add",
          event: "upgradePlan",
        },
      ],
      create: [
        {
          name: "site",
          type: "Create",
          label: "Site",
          icon: "add",
          event: "createSite",
        },
        {
          name: "domain",
          type: "Create",
          label: "Domain",
          icon: "add",
          event: "addDomain",
        },
        {
          name: "tools",
          type: "Create",
          label: "Tools",
          icon: "add",
          event: "addTools",
        },
        {
          name: "branding",
          type: "Create",
          label: "Branding",
          icon: "add",
          event: "addBranding",
        },
      ],
    };
  },
  components: {
    AwList,
    AwPanel,
    AwIconToolbar,
  },
});
</script>
