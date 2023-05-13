<template>
  <div class="row">
    <div
      v-for="layout in view.layouts"
      :key="layout.id"
      :class="`col-lg-${layout.size} ${layout.viewport}`"
    >
      <h4 v-if="layout.heading">{{ layout.heading }}</h4>
      <Component
        :is="component"
        v-for="component in layout.components"
        v-bind="$attrs"
      ></Component>
      <AwDataView v-for="data in layout.data" :data="data"></AwDataView>
      <AwView v-for="view in layout.views" :view="view"></AwView>
    </div>
  </div>
</template>

<script lang="ts">
import AwDataView from "../components/AwDataView.vue";
import { View } from "../utils/types";
import { defineComponent } from "vue";

export default defineComponent({
  name: "AwView",
  components: { AwDataView },
  props: {
    view: {
      required: true,
      type: Object as () => View,
    },
    /*hello: {
      required: true,
      type: String,
    },*/
  },
  mounted() {
    console.log("Attrs: ", this.$attrs);
  },
});
</script>
