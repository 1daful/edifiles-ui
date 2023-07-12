<template>
  <div class="row">
    <div
      :key="view.id"
      :class="`col-lg-${view.size} ${view.viewport}`"
    >
      <h4 v-if="view.heading">{{ view.heading }}</h4>
      <template
          v-for="component in view.sections">
        <Component v-if="util.isType<VComponent>(component)"
          :is="component.content"
          v-bind="{...component.props, ...$attrs }">
        </Component>
      </template>
      <template
        v-for="data in view.sections">
          <AwDataView v-if="util.isType<DataType>(data)" :data="data"></AwDataView>
        </template>
        <template v-for="childView in view.sections">
          <AwView v-if="util.isType<DataType>(childView)" :view="childView"></AwView>
        </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Utility } from '@edifiles/services';
import EDataView from "../components/EDataView.vue";
import { View, VComponent, DataType } from "../utils/types";
import { defineComponent } from "vue";

export default defineComponent({
  name: "EView",
  data() {
    return {
      util: new Utility()
    }
  },
  components: { EDataView },
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
