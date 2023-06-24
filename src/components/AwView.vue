<template>
  <div class="row">
    <div
      :key="view.id"
      :class="`col-lg-${view.size} ${view.viewport}`"
    >
      <h4 v-if="view.heading">{{ view.heading }}</h4>
      <Component
        :is="component.content"
        v-for="component in view.components" v-bind="{...component.props, ...$attrs }"
      ></Component>
      <AwDataView v-for="data in view.data" :data="data"></AwDataView>
      <AwView v-for="childView in view.views" :view="childView"></AwView>
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
    dynamicProps: {
      type: null
    }
  },
  mounted() {
    console.log("Attrs: ", this.$attrs);
  },
});
</script>
